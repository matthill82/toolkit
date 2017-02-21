angular
    .module('uitoolkit')
    .controller('DeviceResultsController', DeviceResultsController);

/**
 *
 * @param $rootScope
 * @param $scope
 * @param $state
 * @param $timeout
 * @param $window
 * @param DeviceService
 * @param EventBroadcastService
 * @param EventEnums
 * @param JrdService
 * @param StateManagement
 * @constructor
 */
function DeviceResultsController(
    $rootScope,
    $scope,
    $state,
    $timeout,
    $window,
    DeviceService,
    EventBroadcastService,
    EventEnums,
    JrdService,
    StateManagement
) {
    var COMPARE_BASKET = 'compareBasket';
    var isPromotedSearch = false;
    var oemMappings;
    var promotedDeviceOffset;
    var wrapper;
    var wrapperRelocateTop = 528;

    $scope.hasSearch=false;
    $scope.loadInitData=true;
    $scope.showDetails = false;
    $scope.goToNextPage = goToNextPage;
    $scope.goTo = goTo;

    $scope.goToSpecifications = goToSpecifications;
    $scope.hideSpecificationItem = hideSpecificationItem;
    $scope.thereAreCompareItems = thereAreCompareItems;
    $scope.getNumberOfCompareItems = getNumberOfCompareItems;

    $scope.carouselIndex = 0;
    $scope.noResults = false;
    $scope.compare = false;
    $scope.loadCompareDevices = loadCompareDevices;
    $scope.loadProductData = loadProductData;
    $scope.setPromotedDeviceConfig = setPromotedDeviceConfig;


    /**
     *
     * @param index
     * @param journey
     */
    function setPromotedDeviceConfig(journey, index) {
        if (angular.isDefined(index)) {
            isPromotedSearch = true;
            promotedDeviceOffset = parseInt(index);
            oemMappings = JrdService.get(journey, 'promoted-devices');
        }
    }

    // $scope.$emit(window.ENUMS.EVENTS.EMIT.ADD_REMOVE_COMPARE, function () {
    //     $rootScope.numberCompareItems = getNumberOfCompareItems();
    // });

    EventBroadcastService.publish(EventEnums.ENUMS.ADD_REMOVE_COMPARE, function () {
        $rootScope.numberCompareItems = getNumberOfCompareItems();
    });

    $scope.$on($window.ENUMS.EVENTS.RECEIVE.RECEIVE_SEARCH_RESULTS, function (event, data) {
        $scope.hasSearch=true;
        clearDevices();
        searchProductData(data);
    });

    EventBroadcastService.subscribe(EventEnums.ENUMS.RECEIVE_SEARCH_RESULTS, function (data) {
        $scope.hasSearch=true;
        clearDevices();
        searchProductData(data);
    });

    // $scope.$on(window.ENUMS.EVENTS.RECEIVE.RECEIVE_SEARCH_RESULTS, function (event,data) {
    //
    //    $scope.hasSearch=true;
    //    clearDevices();
    //    searchProductData(data);
    // });

    // $scope.$on(window.ENUMS.EVENTS.RECEIVE.CONNECT_SEARCH, function (event,data) {
    //    event=null;
    //    clearDevices();
    //    $scope.hasSearch=true;
    //    $scope.loadInitData=(data.initialState==='blank')?false :true;
    //
    // });

    EventBroadcastService.subscribe(EventEnums.ENUMS.CONNECT_SEARCH, function(data) {
        clearDevices();
        $scope.hasSearch = true;
        $scope.loadInitData = (data.initialState==='blank') ? false : true;
    });

    // $scope.$on(window.ENUMS.EVENTS.RECEIVE.CLEAR_DEVICE_RESULTS, function (event) {
    //    event=null;
    //    clearDevices();
    // });

    EventBroadcastService.subscribe(EventEnums.ENUMS.CLEAR_DEVICE_RESULTS, function (data) {
        data = null;
        clearDevices();
    });

    function getNumberOfCompareItems() {
        var getItemsState = StateManagement.getCompareBasketNumberOfItems();

        if (getItemsState === 'undefined') {
            getItemsState = 0;
        }

        return getItemsState;
    }

    function thereAreCompareItems() {
        var compareProducts;
        var itemsExist = false;

        if (isCompareCall()) {
            compareProducts = StateManagement.getCompareBasket(COMPARE_BASKET);

            if (compareProducts !== null) {
                if (compareProducts.length !== 0) {
                    itemsExist = true;
                }
            }
        }

        return itemsExist;
    }

    function hideSpecificationItem(key, categoryItems) {
        var categoryItemsArray = categoryItems.split('||');
        var i;

        for (i = 0; i < categoryItemsArray.length; i++) {
            if (categoryItemsArray[i] === key) {
                return false;
            }
        }

        return true;
    }

    function isCompareCall() {
        var compareDiv = $('#device-compare');

        return compareDiv.length === 1;
    }

    function goToSpecifications() {
        $scope.showDetails = !$scope.showDetails;
        $timeout(animateToDetails, 0);
    }

    function animateToDetails() {
        wrapper.animate({
            scrollTop: wrapperRelocateTop + 1
        }, 500);

        return false;
    }

    function goToNextPage(deviceId, link) {
        StateManagement.setDevice('device', deviceId);
        goTo(link);
    }

    function goTo(link) {
        $state.go(link.replaceHTMLSuffix());
    }

    function loadStickyContent() {
        var dataIndex = $('#slick-index').val();

        if (dataIndex !== 'undefined') {
            $scope.offset = dataIndex;
            $scope.$digest();
        }
    }

    function stickyRelocate() {
        // var stickyAnchor = $('.sticky-anchor');
        //
        // if (stickyAnchor.length) {
        var wrapperScrollTop = wrapper.scrollTop();

        if (wrapperScrollTop >= wrapperRelocateTop) {
            $('.sticky').addClass('stick');
            loadStickyContent();
        } else {
            $('.sticky').removeClass('stick');
            loadStickyContent();
        }
        // }
    }

    function clearDevices() {
        $scope.searchResults = [];
        $scope.noResults = false;
    }

    function applyData(filterDevices, filterFeatures, products) {
        var augmentedSearchResults = [];
        var augmentedSearchResultsIds = [];
        var augmentedSearchResultsIndex = 0;
        var augmentedExtraSearchResultsIds = [];
        var item;
        var lis = filterDevices;
        var matchingMapping;
        var oemPlaceholderItem;
        var oemItemIndexInResults;
        var initialSearchResultsIds = [];

        if (angular.isUndefined(lis)) {
            lis = products;

            if (angular.isUndefined(lis)) {
                lis = filterFeatures;
            }
        }

        if (lis.aggregations.devices.buckets.length === 0) {
            $scope.noResults = true;
            $scope.searchResults = [];

            if (!$scope.hasSearch) {
                loadAllDevicesData();
            }
        } else {
            $scope.noResults = false;

            if (isPromotedSearch) {
                lis.aggregations.devices.buckets.map(function (bucket) {
                    initialSearchResultsIds.push(bucket.item.hits.hits[0]._source.device.id);
                });


                lis.aggregations.devices.buckets.map(function (bucket) {
                    item = bucket.item.hits.hits[0]._source;

                    // Add the item if it's not a duplicate
                    if (augmentedSearchResultsIds.indexOf(item.device.id) === -1) {
                        augmentedSearchResultsIds.push(item.device.id);

                        // Find the next available position to add the item
                        while (angular.isDefined(augmentedSearchResults[augmentedSearchResultsIndex])) {
                            augmentedSearchResultsIndex++;
                        }
                        augmentedSearchResults[augmentedSearchResultsIndex] = bucket;

                        //
                        // Find mappings
                        //
                        matchingMapping = oemMappings.filter(function (mapping) {
                            return mapping.mapToSKU === item.device.id;
                        })[0];

                        if (matchingMapping) {
                            // Add the OEM mapped device if not already in the new list
                            if (augmentedSearchResultsIds.indexOf(matchingMapping.targetSKU) === -1) {
                                // Check if we've got the item ahead in the results
                                oemItemIndexInResults = initialSearchResultsIds.indexOf(matchingMapping.targetSKU);

                                if (oemItemIndexInResults === -1) {
                                    oemPlaceholderItem = {
                                        placeholderFor: matchingMapping.targetSKU
                                    };

                                    augmentedExtraSearchResultsIds.push(matchingMapping.targetSKU);
                                    augmentedSearchResults[augmentedSearchResultsIndex + promotedDeviceOffset] = oemPlaceholderItem;
                                }
                            }
                        }
                    }
                });

                //
                // Remove gaps
                //
                augmentedSearchResults = augmentedSearchResults.filter(function (item) {
                    return angular.isDefined(item);
                });


                if (augmentedExtraSearchResultsIds.length) {
                    DeviceService.findProductsByName(augmentedExtraSearchResultsIds)
                        .then(
                            function (data) {
                                var resolved = false;

                                augmentedSearchResults.map(function (item, key) {
                                    if (item && item.placeholderFor) {
                                        data.aggregations.devices.buckets.map(function (oemItemBucket, oemKey) {
                                            if (oemItemBucket.item.hits.hits[0]._source.device.id === item.placeholderFor) {
                                                augmentedSearchResults[key] = data.aggregations.devices.buckets[oemKey];
                                                resolved = true;
                                            }
                                        });

                                        if (!resolved) {
                                            augmentedSearchResults.splice(key, 1);
                                        }
                                    }
                                });

                                $scope.searchResults = augmentedSearchResults;
                            }
                        );
                }
            } else {
                $scope.searchResults = lis.aggregations.devices.buckets;
            }
        }
    }

    function applyAllData(products) {
        $scope.searchResults = products.aggregations.devices.buckets;
    }

    function applyCompareData(compareBasket) {
        if (compareBasket != null) {
            DeviceService.findProductsByName(compareBasket)
                .then(
                    function (products) {
                        $scope.searchResults = products.aggregations.devices.buckets;

                        if ($scope.searchResults.length === 0) {
                            $scope.noResults = true;
                        }
                    }
                );
        }
    }

    function loadCompareDevices() {
        applyCompareData(StateManagement.getCompareBasket(COMPARE_BASKET));
    }

    function searchProductData(queryData) {
        DeviceService.findSearchProductsFiltered(queryData)
            .then(
                function (products) {
                    clearDevices();
                    applyData(products);
                }
            );
    }

    function loadProductData(deviceCategory, contractType, filterDevices, filterFeatures, useQuestions) {
        var questionsData;

        if(!$scope.loadInitData) {
            return;
        }

        $scope.deviceCategory = {
            deviceCategory:deviceCategory,
            contractType:contractType
        };

        if (useQuestions !== 'false') {
            questionsData = StateManagement.getData('questions');

            DeviceService.findProductsFiltered(questionsData, $scope.deviceCategory)
                .then(
                    function (products) {
                        applyData(filterDevices, filterFeatures, products);
                    }
                );
        } else {
            console.log('use other query');
        }
    }

    function loadAllDevicesData() {
        DeviceService.findAllProducts( $scope.deviceCategory)
            .then(
                function (products) {
                    applyAllData(products);
                }
            );
    }

    angular.element(document).ready(function () {
        wrapper = $('header + .container-fluid');

        wrapper.bind('touchmove', stickyRelocate);
        wrapper.bind('scroll', stickyRelocate);

        stickyRelocate();

        angular.element($window).onload = loadStickyContent;
    });
}
