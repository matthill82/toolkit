/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .controller('TabbedPlansRecommendationsController', TabbedPlansRecommendationsController);

function TabbedPlansRecommendationsController($filter, $sce, $scope, $state, $window, DeviceService, PlanService, StateManagement) {

        var GRAPH_MAX_NUMBER = 6;
        var UNITS_OF_MB_IN_GB = 1024;
        var KEY_DEVICE = $window.ENUMS.DEVICE_KEYS.DEVICE;//'device';
        var KEY_COLOUR = $window.ENUMS.DEVICE_KEYS.DEVICE_COLOUR;//'deviceColour';

        var PLAN = $window.ENUMS.DEVICE_KEYS.PLAN;//'plan';
        var KEY_DATA = $window.ENUMS.DEVICE_KEYS.DATA_MB;//'dataMB';
        var DATA_GB = $window.ENUMS.DEVICE_KEYS.GB;//'GB';
        var DATA_MB = $window.ENUMS.DEVICE_KEYS.MB;//'MB';
        var DOUBLE_QUOTE_REGEX = /^"?(.+?)"?$/;
        var vm = this;

        vm.goTo = goTo;
        vm.proposition = null;
        vm.contentPropositions = null;
        vm.initialize = initialize;
        vm.sanitize = sanitize;
        vm.areTherePropositions = true;
        vm.getAllowanceValue = getAllowanceValue;
        vm.getAllowanceGraphPosition = getAllowanceGraphPosition;
        vm.getDifferenceText = getDifferenceText;
        vm.getBenefitsText = getBenefitsText;
        vm.getRewardTier = getRewardTier;
        vm.hideDifferenceText = hideDifferenceText;
        vm.getPlanName = getPlanName;
        vm.getCarrierClass = getCarrierClass;

        initialize();

        function initialize() {
            var deviceId = StateManagement.getDevice(KEY_DEVICE);
            var deviceColour = StateManagement.getData(KEY_COLOUR);

            deviceId = deviceId.replace(DOUBLE_QUOTE_REGEX, '$1');
            deviceColour = deviceColour.replace(DOUBLE_QUOTE_REGEX, '$1');

            PlanService.findRecommendedPlans()
                .then(
                    function (response) {
                        applyPlanData(response, deviceId, deviceColour);
                    }
                );
        }

        vm.tabs = [];
        vm.deviceTileShown = true;
        vm.selectedTab = '';
        vm.propositionItems = [];

        vm.tabSelected = function (id) {
            vm.selectedTab = '';
            angular.forEach(vm.tabs, function (tab) {
                if (tab.id === id) {
                    tab.active = !tab.active;
                    vm.selectedTab = tab.active ? id : '';
                }
                else {
                    tab.active = false;
                }
            });
            filterPropositions();
        };

        vm.getShownLength = function () {
            var shownItemCount = 0;

            angular.forEach(vm.propositionItems, function(item){
                if(item.itemIsVisible) {
                    shownItemCount ++;
                }
            });

            return shownItemCount;
        };

        function setTabs(tabPropositions) {
            var loopCount = 0;

            tabPropositions = tabPropositions.slice(vm.startOffset, vm.endOffset);
            vm.propositionItems = tabPropositions;

            angular.forEach(vm.propositionItems, function (item) {
                var propositionsObj = item;
                var found = false;
                var continueLoop = true;

                angular.forEach(vm.tabs, function (tab) {
                    if(continueLoop) {
                        if (tab.id === propositionsObj.serviceProvider) {
                            found = true;
                            continueLoop = false;
                        }
                    }
                });
                if (!found) {
                    vm.tabs.push({
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

        function filterPropositions() {
            var loopCount = 1;

            angular.forEach(vm.propositionItems, function (item) {
                if (vm.selectedTab !== '' && item.serviceProvider !== vm.selectedTab) {
                    //prop[x].pop();
                    item.itemIsVisible = false;
                    item.itemIndex = 0;
                }
                else {
                    item.itemIsVisible = true;
                    item.itemIndex = loopCount;
                    item.itemIsFirst = false;
                    item.itemIsLast = false;
                    if (loopCount === 1) {
                        item.itemIsFirst = true;
                    }
                    loopCount ++;
                }
            });
            vm.propositionItems[vm.propositionItems.length - 1].itemIsLast = true;
        }

        function sanitize(text) {
            return $sce.trustAsHtml(text);
        }

        function getAllowanceValue(value, unit, isUnlimited, unlimitedText) {
            if (typeof value !== undefined) {
                if (isUnlimited === true) {
                    return unlimitedText;
                } else {
                    if ((unit.contains(DATA_MB)) && (value >= UNITS_OF_MB_IN_GB)) {
                        value = value / UNITS_OF_MB_IN_GB;
                        unit = DATA_GB;
                    }
                    return value + ' ' + unit;
                }
            }
        }

        function getAllowanceGraphPosition(value, unit, unlimited, range) {
            if (unlimited === true) {
                return GRAPH_MAX_NUMBER;
            } else {
                if (typeof range !== undefined) {
                    var rangeItem = range.split(',');
                    for (var i = 0; i < rangeItem.length; i++) {
                        var valueConvertedToSameUnit = value;

                        if (unit.contains(DATA_MB)) {
                            valueConvertedToSameUnit = value / UNITS_OF_MB_IN_GB;
                        }

                        if (rangeItem[i] >= valueConvertedToSameUnit) {
                            return i + 1;
                        }
                    }
                }
            }
        }

        function getDifferenceText(tariffcode) {
            var value = '';
            var contentProp = vm.contentPropositions;

            for (var i = 0; i < contentProp.length; i++) {
                var contentTariffCode = contentProp[i].tariffCode;
                if (contentTariffCode === tariffcode) {
                    value = contentProp[i].differenceText;
                }
            }
            return value;
        }

        function getPlanName(tariffcode) {
            var value = '';
            var contentProp = vm.contentPropositions;
            var dataProp = vm.propositions;

            for (var i = 0; i < contentProp.length; i++) {
                var contentTariffCode = contentProp[i].tariffCode;
                if (contentTariffCode === tariffcode) {
                    value = contentProp[i].planName;
                    if (value === undefined) {
                        for (var c = 0; c < dataProp.length; c++) {
                            var dataTariffCode = dataProp[c].offering[0].id;
                            if (dataTariffCode === tariffcode) {
                                value = dataProp[c].tariff.name;

                                value = $filter('htmlEntities')(value);
                            }
                        }
                    }
                }
            }
            return value;
        }

        function getRewardTier(tariffcode) {
            var value = '';
            var contentProp = vm.contentPropositions;

            for (var i = 0; i < contentProp.length; i++) {
                var contentTariffCode = contentProp[i].tariffCode;
                if (contentTariffCode === tariffcode) {
                    value = contentProp[i].rewardTier;
                }
            }
            return value;
        }

        function getBenefitsText(tariffcode) {
            var value = '';
            var contentProp = vm.contentPropositions;
            var dataProp = vm.propositions;

            for (var i = 0; i < contentProp.length; i++) {
                var contentTariffCode = contentProp[i].tariffCode;
                if (contentTariffCode === tariffcode) {
                    value = contentProp[i].benefits;
                    if (value[0] === undefined) {
                        for (var c = 0; c < dataProp.length; c++) {
                            var dataTariffCode = dataProp[c].offering[0].id;
                            if (dataTariffCode === tariffcode) {
                                var features = dataProp[c].tariff.features;
                                for (var t = 0; t < features.length; t++) {
                                    var valueStr = features[t].name + '- ' + features[t].value;
                                    valueStr = $filter('htmlEntities')(valueStr);
                                    value.push(valueStr);
                                }
                            }
                        }
                    }
                }
            }
            return value;
        }

        function getCarrierClass(network) {
            var networkClass = 'disabled';

            if (typeof network !== 'undefined') {
                networkClass = network.toLowerCase();
            }

            return networkClass;
        }

        function hideDifferenceText(index) {
            var flag = false;
            var plansAndTwo = vm.totalNumberOfPlans + 2;
            var plansAndOne = vm.totalNumberOfPlans + 1;

            if (plansAndOne === vm.endOffset) {
                if (index === 0) {
                    flag = false;
                } else {
                    flag = true;
                }
            } else if (plansAndTwo === vm.endOffset) {
                flag = true;
            } else {
                flag = false;
            }

            return flag;
        }

        function applyData(product, tariffsContent) {
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


        function removeUnmatchedContentItems(tariffsContent, unmatchedItems) {
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


        function getMatchedElasticObject(elasticData, contentTariffCode) {
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

        function setDisplay(propositionContentArray, propositionDataArray) {
            var selectedDataAsMB = 0;
            var selectedDataAsMBStr = StateManagement.getData(KEY_DATA);
            var regexp = /^"?(.+?)"?$/;

            selectedDataAsMBStr = selectedDataAsMBStr.replace(regexp, '$1');

            if (selectedDataAsMBStr) {
                selectedDataAsMB = parseInt(selectedDataAsMBStr);
            }
            var selectedDataAsGB = Math.round(selectedDataAsMB / UNITS_OF_MB_IN_GB);
            console.log(selectedDataAsMB + ' - inGB: ' + selectedDataAsGB);

            propositionContentArray.join();
            propositionDataArray.join();

            var dataJson = JSON.stringify(propositionDataArray);
            var parsedDataJson = JSON.parse(dataJson);

            var contentJson = JSON.stringify(propositionContentArray);
            var parsedContentJson = JSON.parse(contentJson);

            vm.propositions = null;
            vm.contentPropositions = null;
            if (typeof parsedDataJson !== undefined) {
                if (parsedDataJson.length > 0) {
                    vm.propositions = parsedDataJson;
                    //console.log($scope.data);
                    $scope.data = parsedDataJson;
                    vm.contentPropositions = parsedContentJson;
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
                                                vm.areTherePropositions = true;
                                                bestMatchFoundFlag = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (vm.propositions === null) {
                        vm.areTherePropositions = false;
                    }

                    var endOffset = selectedBestMatchIndex + 1;
                    var startOffset = selectedBestMatchIndex;
                    var selectedBestMatch = 0;
                    var recommendedPlan = 0;
                    var downsellPlan = -1;
                    var upsellPlan1 = 1;
                    var upsellPlan2 = 2;

                    if (bestMatchFoundFlag === false) {
                        vm.areTherePropositions = true;
                        selectedBestMatchIndex = parsedDataJson.length;
                        endOffset = selectedBestMatchIndex;
                        startOffset = selectedBestMatchIndex;
                        selectedBestMatch = 0;
                        recommendedPlan = 0;
                        downsellPlan = 0;
                        upsellPlan1 = 0;
                        upsellPlan2 = 0;
                    } else {
                        endOffset = selectedBestMatchIndex + 1;
                        startOffset = selectedBestMatchIndex;
                        selectedBestMatch = 0;
                        recommendedPlan = 0;
                        downsellPlan = -1;
                        upsellPlan1 = 1;
                        upsellPlan2 = 2;
                    }


                    if (selectedBestMatchIndex === 0) {
                        endOffset = selectedBestMatchIndex + 3;
                        startOffset = selectedBestMatchIndex;
                        selectedBestMatch = 0;
                        recommendedPlan = 0;
                        downsellPlan = -1;
                        upsellPlan1 = 1;
                        upsellPlan2 = 2;
                    }

                    if (selectedBestMatchIndex > 0) {
                        startOffset = selectedBestMatchIndex - 1;
                        endOffset = selectedBestMatchIndex + 2;
                        selectedBestMatch = 1;
                        recommendedPlan = 1;
                        downsellPlan = 0;
                        upsellPlan1 = 2;
                        upsellPlan2 = 3;
                    }

                    vm.selectedBestMatchIndex = selectedBestMatchIndex;
                    vm.selectedBestMatch = selectedBestMatch;
                    vm.startOffset = startOffset;
                    vm.endOffset = endOffset;
                    vm.upsell1 = upsellPlan1;
                    vm.upsell2 = upsellPlan2;
                    vm.downsellPlan = downsellPlan;
                    vm.recommendedPlan = recommendedPlan;
                    vm.totalNumberOfPlans = parsedDataJson.length;

                    setTabs(vm.propositions);

                    //console.log('endoffset=' + endOffset);
                    //console.log('startoffset=' + startOffset);
                    //console.log('selectedBestMatch=' + selectedBestMatch);

                    //console.log('downsellPlan=' + downsellPlan);
                    //console.log('recommendedPlan=' + recommendedPlan);
                    ///console.log('upsellPlan1=' + upsellPlan1);
                    //console.log('upsellPlan2=' + upsellPlan2);
                } else {
                    vm.areTherePropositions = false;
                }
            } else {
                vm.areTherePropositions = false;
            }
        }

        function applyPlanData(product, deviceId, deviceColour) {
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
                            vm.areTherePropositions = false;
                        }
                    }
                } else {
                    vm.areTherePropositions = false;
                }
            }
        }

        function goTo(url, prop) {
            // todo investigate, authormode seems to be unused
            var authormode = $('body').data('authormode') || '';

            authormode = authormode.replace('\"', '');
            authormode = authormode.replace('\"', '');

            StateManagement.setPlan(PLAN, prop);

            url = url.replaceHTMLSuffix();
            $state.go(url);

        }

        function loadProductData(tariffCodes, deviceId, deviceColour, tariffsContent) {
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
