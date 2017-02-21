angular
    .module('uitoolkit')
    .controller('RecommendationsTabsCarouselController', RecommendationsTabsCarouselController);

// TODO This is a beast, move the business logic into a service and whatever else can be done to make it more comprehensible.
function RecommendationsTabsCarouselController ($sce,
                                                $scope,
                                                $state,
                                                $window,
                                                DeviceService,
                                                PlanService,
                                                StateManagement) {
    //TODO move to recommended plan <---
    var KEY_DEVICE = $window.ENUMS.DEVICE_KEYS.DEVICE;//'device';
    var KEY_COLOUR = $window.ENUMS.DEVICE_KEYS.DEVICE_COLOUR;//'deviceColour';
    var KEY_DATA = $window.ENUMS.DEVICE_KEYS.DATA_MB;//'dataMB';
    var DATA_MB = $window.ENUMS.DEVICE_KEYS.MB;//'MB';
    var DOUBLE_QUOTE_REGEX = /^"?(.+?)"?$/;
    var selectedDataAsMBStr = 0;
    var $ctrl = this;

    $ctrl.proposition = null;
    $ctrl.contentPropositions = null;
    $ctrl.sanitize = sanitize;
    $ctrl.areTherePropositions = true;
    $ctrl.hideDifferenceText = hideDifferenceText;
    $ctrl.getCarrierClass = getCarrierClass;
    $ctrl.goToNoResultsButtonPath = goToNoResultsButtonPath;
    $ctrl.getDifferenceText = getDifferenceText;

    $ctrl.$onInit = $onInit;

    function $onInit () {
        $ctrl.tabs = [];
        $ctrl.deviceTileShown = true;
        $ctrl.selectedTab = '';
        $ctrl.propositionItems = [];

        var deviceId = StateManagement.getDevice(KEY_DEVICE);
        var deviceColour = StateManagement.getData(KEY_COLOUR);
        deviceId = deviceId.replace(DOUBLE_QUOTE_REGEX, '$1');
        deviceColour = deviceColour.replace(DOUBLE_QUOTE_REGEX, '$1');

        $ctrl.messagePosition = $ctrl.messagePosition || 'bottom';

        $ctrl.sellText = [
            $ctrl.sellTextDownsellText,
            $ctrl.sellTextBestMatchText,
            $ctrl.sellTextUpsell1Text,
            $ctrl.sellTextUpsell2Text,
            $ctrl.sellTextUpsellOtherText];

        PlanService.findRecommendedPlans()
            .then(
                function (response) {
                    applyPlanData(response, deviceId, deviceColour);
                }
            );
    }

    function goToNoResultsButtonPath () {
        $state.go($ctrl.noResultsButtonPath);
    }



    $ctrl.tabSelected = function (id) {
        $ctrl.selectedTab = '';
        angular.forEach($ctrl.tabs, function (tab) {
            if (tab.id === id) {
                tab.active = !tab.active;
                $ctrl.selectedTab = tab.active ? id : '';
            }
            else {
                tab.active = false;
            }
        });
        filterPropositions();
    };

    $ctrl.getShownLength = function () {
        var shownItemCount = 0;
        angular.forEach($ctrl.propositionItems, function (item) {
            if (item.itemIsVisible) {
                shownItemCount++;
            }
        });
        return shownItemCount;
    };

    function setTabs (tabPropositions) {
        $ctrl.propositionItems = tabPropositions;
        var loopCount = 0;
        //tabPropositions = tabPropositions.slice($ctrl.startOffset, $ctrl.endOffset);
        angular.forEach($ctrl.propositionItems, function (item) {
            var propositionsObj = item;
            var found = false;
            var continueLoop = true;
            angular.forEach($ctrl.tabs, function (tab) {
                if (continueLoop) {
                    if (tab.id === propositionsObj.serviceProvider) {
                        found = true;
                        continueLoop = false;
                    }
                }
            });
            if (!found) {
                $ctrl.tabs.push({
                    id: propositionsObj.serviceProvider,
                    class: getCarrierClass(propositionsObj.serviceProvider),
                    active: false
                });
            }
            item.itemIndex = loopCount++;
            item.itemIsFirst = false;
            item.itemIsLast = false;
            item.itemIsVisible = false;
        });

        filterPropositions();
    }

    function filterPropositions () {
        var loopCount = 1;
        var downSellPropositions = [];
        angular.forEach($ctrl.propositionItems, function (item) {
            if ($ctrl.selectedTab !== '' && item.serviceProvider !== $ctrl.selectedTab) {
                //prop[x].pop();
                item.itemIsVisible = false;
                item.itemIndex = 0;
            }
            else if (parseInt(item.tariff.dataAllowance.number) < parseInt(selectedDataAsMBStr)) {
                item.itemIsVisible = false;
                item.itemIndex = 0;
                downSellPropositions.push(item);
                downSellPropositions.sort(function (a, b) {
                    return parseInt(a.tariff.dataAllowance.number) - parseInt(b.tariff.dataAllowance.number);
                });
            }
            else {
                item.itemIsVisible = true;
                item.itemIndex = loopCount;
                item.itemIsFirst = false;
                item.itemIsLast = false;
                // if (loopCount === 1) {
                //     item.itemIsFirst = true;
                // }
                loopCount++;
            }
        });
        $ctrl.propositionItems[$ctrl.propositionItems.length - 1].itemIsLast = true;
        if (downSellPropositions.length > 0) {
            angular.forEach($ctrl.propositionItems, function (item) {
                if (item.id === downSellPropositions[downSellPropositions.length - 1].id) {
                    item.itemIsVisible = true;
                    item.itemIsFirst = true;
                }
            });
        }
    }

    function sanitize (text) {
        return $sce.trustAsHtml(text);
    }

    function getDifferenceText (tariffcode) {
        var value = '';
        var contentProp = $ctrl.contentPropositions;
        for (var i = 0; i < contentProp.length; i++) {
            var contentTariffCode = contentProp[i].tariffCode;
            if (contentTariffCode === tariffcode) {
                value = contentProp[i].differenceText;
            }
        }
        return value;
    }

    //TODO move to recommended plan <---

    function getCarrierClass (network) {
        var networkClass = 'disabled';
        if (typeof network !== 'undefined') {
            networkClass = network.toLowerCase();
        }
        return networkClass;
    }


    function hideDifferenceText (index) {
        var flag = false;
        var plansAndTwo = $ctrl.totalNumberOfPlans + 2;
        var plansAndOne = $ctrl.totalNumberOfPlans + 1;
        if (plansAndOne === $ctrl.endOffset) {
            if (index === 0) {
                flag = false;
            } else {
                flag = true;
            }
        } else if (plansAndTwo === $ctrl.endOffset) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    }


    function applyData (product, tariffsContent) {
        var propositionDataArray = [];
        var elasticData = product.queryResult;
        var unmatchedItems = [];

        if (product || tariffsContent) {
            for (var i = 0; i < tariffsContent.length; i++) {
                var contentTariffCode = tariffsContent[i].tariffCode;
                var dataObject = getMatchedElasticObject(elasticData, contentTariffCode);

                if (dataObject !== null) {
                    propositionDataArray.push(dataObject);
                } else {
                    unmatchedItems.push(i);
                }
            }

            removeUnmatchedContentItems(tariffsContent, unmatchedItems);
            //testAllArrayItems(tariffsContent, propositionDataArray);
            setDisplay(tariffsContent, propositionDataArray);
        }
    }


    function removeUnmatchedContentItems (tariffsContent, unmatchedItems) {
        if (unmatchedItems.length > 0) {
            for (var i = 0; i < unmatchedItems.length; i++) {
                var unmatchedItem = unmatchedItems[i];
                tariffsContent.splice(unmatchedItem, 1); // item not found so remove from content array
            }
        }

    }


    //Tester method so we ensure that both arrays have the same IDs in them in the right order
    /*function testAllArrayItems(tariffsContent, propositionDataArray) {
     for (var i = 0; i < propositionDataArray.length; i++) {
     var dataTariffCode = propositionDataArray[i].offering[0].id;
     console.log('dataTariffCode' + dataTariffCode) ;
     }

     for (var d = 0; d < tariffsContent.length; d++) {
     var tariffsCode = tariffsContent[d].tariffCode;
     console.log('tariffsCode' + tariffsCode) ;
     }
     }*/


    function getMatchedElasticObject (elasticData, contentTariffCode) {
        var object = null;
        for (var d = 0; d < elasticData.length; d++) {
            var dataTariffCode = elasticData[d].offering[0].id;
            if (dataTariffCode === contentTariffCode) {
                object = elasticData[d];
                break;
            }
        }
        return object;
    }


    function setDisplay (propositionContentArray, propositionDataArray) {
        var selectedDataAsMB = 0;
        var regexp = /^"?(.+?)"?$/;

        selectedDataAsMBStr = StateManagement.getData(KEY_DATA).replace(regexp, '$1');

        if (selectedDataAsMBStr) {
            selectedDataAsMB = parseInt(selectedDataAsMBStr);
        }
        //var selectedDataAsGB = Math.round(selectedDataAsMB / UNITS_OF_MB_IN_GB);
        //console.log(selectedDataAsMB + ' - inGB: ' + selectedDataAsGB);

        propositionContentArray.join();
        propositionDataArray.join();

        var dataJson = JSON.stringify(propositionDataArray);
        var parsedDataJson = JSON.parse(dataJson);

        var contentJson = JSON.stringify(propositionContentArray);
        var parsedContentJson = JSON.parse(contentJson);

        $ctrl.propositions = null;
        $ctrl.contentPropositions = null;
        if (typeof parsedDataJson !== undefined) {
            if (parsedDataJson.length > 0) {
                $ctrl.propositions = parsedDataJson;

                $scope.data = parsedDataJson;
                $ctrl.contentPropositions = parsedContentJson;
                
                var bestMatchFoundFlag = false;
                var selectedBestMatchIndex = 0;

                for (var i = 0; i < parsedDataJson.length; i++) {
                    var propositionsObj = parsedDataJson[i]; //always first one in case multiple returned
                    if (bestMatchFoundFlag === false) {
                        if (typeof propositionsObj.tariff !== undefined) {
                            var tariffObj = propositionsObj.tariff;
                            if (typeof tariffObj.dataAllowance !== undefined) {
                                var dataAllowanceObj = tariffObj.dataAllowance;

                                if (typeof dataAllowanceObj.number !== undefined) {
                                    var dataAllowAmount = dataAllowanceObj.number;
                                    var unit = dataAllowanceObj.units;

                                    dataAllowAmount = dataAllowanceObj.number;

                                    if (unit.contains(DATA_MB)) {
                                        if (dataAllowAmount >= selectedDataAsMB || dataAllowAmount === selectedDataAsMB) {
                                            selectedBestMatchIndex = i;
                                            $ctrl.areTherePropositions = true;
                                            bestMatchFoundFlag = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if ($ctrl.propositions === null) {
                    $ctrl.areTherePropositions = false;
                }

                var endOffset = selectedBestMatchIndex + 1;
                var startOffset = selectedBestMatchIndex;
                var selectedBestMatch = 1;
                var recommendedPlan = 1;
                var downsellPlan = 0;
                var upsellPlan1 = 2;
                var upsellPlan2 = 3;
                var upsellPlanOther = 4;

                if (bestMatchFoundFlag === false) {
                    $ctrl.areTherePropositions = true;
                    selectedBestMatchIndex = parsedDataJson.length;
                    endOffset = selectedBestMatchIndex;
                    startOffset = selectedBestMatchIndex;
                    selectedBestMatch = 0;
                    recommendedPlan = 0;
                    downsellPlan = 0;
                    upsellPlan1 = 0;
                    upsellPlan2 = 0;
                    upsellPlanOther = 0;
                } else {
                    endOffset = selectedBestMatchIndex + 1;
                    startOffset = selectedBestMatchIndex;
                    selectedBestMatch = 0;
                    recommendedPlan = 0;
                    downsellPlan = -1;
                    upsellPlan1 = 1;
                    upsellPlan2 = 2;
                    upsellPlanOther = 3;
                }

                if (selectedBestMatchIndex === 0) {
                    endOffset = selectedBestMatchIndex + 3;
                    startOffset = selectedBestMatchIndex;
                    selectedBestMatch = 1;
                    recommendedPlan = 1;
                    downsellPlan = 0;
                    upsellPlan1 = 2;
                    upsellPlan2 = 3;
                    upsellPlanOther = 4;
                }

                if (selectedBestMatchIndex > 0) {
                    startOffset = selectedBestMatchIndex - 1;
                    endOffset = selectedBestMatchIndex + 2;
                    selectedBestMatch = 1;
                    recommendedPlan = 1;
                    downsellPlan = 0;
                    upsellPlan1 = 2;
                    upsellPlan2 = 3;
                    upsellPlanOther = 4;
                }

                $ctrl.selectedBestMatchIndex = selectedBestMatchIndex;
                $ctrl.selectedBestMatch = selectedBestMatch;
                $ctrl.startOffset = startOffset;
                $ctrl.endOffset = endOffset;
                $ctrl.upsell1 = upsellPlan1;
                $ctrl.upsell2 = upsellPlan2;
                $ctrl.upsellOther = upsellPlanOther;
                $ctrl.downsellPlan = downsellPlan;
                $ctrl.recommendedPlan = recommendedPlan;
                $ctrl.totalNumberOfPlans = parsedDataJson.length;

                setTabs($ctrl.propositions);

                //console.log('endoffset=' + endOffset);
                //console.log('startoffset=' + startOffset);
                //console.log('selectedBestMatch=' + selectedBestMatch);

                //console.log('downsellPlan=' + downsellPlan);
                //console.log('recommendedPlan=' + recommendedPlan);
                ///console.log('upsellPlan1=' + upsellPlan1);
                //console.log('upsellPlan2=' + upsellPlan2);
            } else {
                $ctrl.areTherePropositions = false;
            }
        } else {
            $ctrl.areTherePropositions = false;
        }
    }


    function applyPlanData (product, deviceId, deviceColour) {
        if (typeof product.devices !== undefined) {
            var devicesObj = product.devices;
            if (devicesObj.length > 0) {
                for (var d = 0; d < devicesObj.length; d++) {
                    var devicesObjId = devicesObj[d].deviceId;

                    if (devicesObjId.contains(deviceId)) {
                        var tariffsObj = devicesObj[d].carriers[0].tariffs;
                        var tariffCodesArray = [];
                        if (typeof tariffsObj !== undefined) {
                            for (var t = 0; t < tariffsObj.length; t++) {
                                var tariffObjCode = tariffsObj[t].tariffCode;
                                tariffCodesArray.push(tariffObjCode);
                            }

                            loadProductData(tariffCodesArray, deviceId, deviceColour, tariffsObj);
                        }
                    } else {
                        $ctrl.areTherePropositions = false;
                    }
                }
            } else {
                $ctrl.areTherePropositions = false;
            }
        }
    }


    function loadProductData (tariffCodes, deviceId, deviceColour, tariffsContent) {
        DeviceService.getUniquePlansForDevice(tariffCodes, deviceId, deviceColour)
            .then(
                function (response) {
                    var results = response;
                    if (results.queryResult.length > 0) {
                        applyData(results, tariffsContent);
                    } else {
                        console.log('error');
                    }
                }
            );
    }

}
