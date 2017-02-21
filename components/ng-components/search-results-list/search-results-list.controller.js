/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
        .controller('SearchResultsListController', function (DeviceService, $rootScope, $scope, $window, $state, StateManagement, $timeout, EventBroadcastService,EventEnums) {

                var COMPARE_BASKET = 'compareBasket';
                $scope.goToNextPage = goToNextPage;
                $scope.goTo = goTo;
                $scope.addRemoveCompare = addRemoveCompare;
                $scope.removeCompare = removeCompare;
                $scope.getCompare = getCompare;
                $scope.goToSpecifications = goToSpecifications;
                $scope.hideSpecificationItem = hideSpecificationItem;
                $scope.thereAreCompareItems = thereAreCompareItems;
                $scope.getNumberOfCompareItems = getNumberOfCompareItems;
                $scope.loadCompareDevices = loadCompareDevices;
                $scope.loadProductData = loadProductData;
                $scope.getFeatureValue = getFeatureValue;
                $scope.getFeatureImage = getFeatureImage;
                $scope.getGHz = getGHz;
                $scope.carouselIndex = 0;
                $scope.noResults = false;
                $scope.compare = false;
                $scope.hasSearch = false;
                $scope.loadInitData = true;
                $scope.showDetails = false;

//                $scope.$emit(window.ENUMS.EVENTS.EMIT.ADD_REMOVE_COMPARE, function () {
//                    $rootScope.numberCompareItems = getNumberOfCompareItems();
//                });
                EventBroadcastService.publish(EventEnums.ENUMS.ADD_REMOVE_COMPARE, function () {
                    $rootScope.numberCompareItems = getNumberOfCompareItems();
                });

               $scope.$on(window.ENUMS.EVENTS.RECEIVE.RECEIVE_SEARCH_RESULTS, function (event, data) {
                   $scope.hasSearch = true;
                   clearDevices();
                   searchProductData(data);
               });

                EventBroadcastService.subscribe(EventEnums.ENUMS.RECEIVE_SEARCH_RESULTS, function (data) {
                    $scope.hasSearch = true;
                    clearDevices();
                    searchProductData(data);
                });

//                $scope.$on(window.ENUMS.EVENTS.RECEIVE.CONNECT_SEARCH, function (event, data) {
//                    clearDevices();
//                    $scope.hasSearch = true;
//                    $scope.loadInitData = (data.initialState === 'blank') ? false : true;
//                });

                EventBroadcastService.subscribe(EventEnums.ENUMS.CONNECT_SEARCH, function (data) {
                    clearDevices();
                    $scope.hasSearch = true;
                    $scope.loadInitData = (data.initialState === 'blank') ? false : true;
                });


//                $scope.$on(window.ENUMS.EVENTS.RECEIVE.CLEAR_DEVICE_RESULTS, function () {
//                    clearDevices();
//                });

                EventBroadcastService.subscribe(EventEnums.ENUMS.CLEAR_DEVICE_RESULTS, function (data) {
                    data=null;
                    clearDevices();
                });


                function getFeatureImage(prop) {
                    return prop;
                }

                function getGHz(val) {
                    var ret = ''
                    for (var i = 0; i < (val.match(new RegExp('GHz', 'g')) || []).length; i++) {
                        var ghz = val.substring(0, val.indexOf('GHz') + 3)
                        var v = ghz.substring(ghz.substring(0, ghz.lastIndexOf(' ')).lastIndexOf(' '), 999);
                        if (i > 0) {
                            v = ' / ' + v;
                        }
                        ret = ret + v
                    }
                    return ret;
                }

                function getFeatureValue(product, prop_name, prop_category, func) {
                    var val = ''
                    product.device.features.forEach(function (feature) {
                        if (feature.name === prop_name && feature.category === prop_category) {
                            val = feature.value;
                        }
                    });
                    if (func != null) {
                        val = func(val)
                    }
                    return val;
                }

                function getNumberOfCompareItems() {
                    var getItemsState = StateManagement.getCompareBasketNumberOfItems();
                    if (getItemsState === 'undefined') {
                        getItemsState = 0;
                    }
                    return getItemsState;
                }


                function thereAreCompareItems() {
                    var itemsExist = false;
                    var iscompare = isCompareCall();
                    if (iscompare === true) {
                        var compareProducts = StateManagement.getCompareBasket(COMPARE_BASKET);
                        if (compareProducts !== null) {
                            if (compareProducts.length !== 0) {
                                itemsExist = true;
                            }
                        }
                    }
                    return itemsExist;
                }


                function hideSpecificationItem(key, categoryItems) {
                    var flag = true;
                    var categoryItemsArray = categoryItems.split('||')

                    for (var i = 0; i < categoryItemsArray.length; i++) {
                        if (categoryItemsArray[i] === key) {
                            flag = false;
                        }
                    }
                    return flag;
                }



                function isCompareCall() {
                    var cflag = false;
                    var compareDiv = $('#device-compare');
                    if (compareDiv.length === 1) {
                        cflag = true;
                    }
                    return cflag;
                }


                function goToSpecifications() {
                    $scope.showDetails = !$scope.showDetails;
                    $timeout(animateToDetails, 0);
                }

                var _body = $('body');

                _body.css('transition', 'margin-top 1.2s ease');

                function animateToDetails() {

                    var summaryFromTop = $('.device-summary').offset().top;
                    var topPhonesHeight = 150; //var topPhonesHeight = $('.phone-top').height();
                    var scrollPosition = summaryFromTop - topPhonesHeight;

                    _body.css({
                        'margin-top': -scrollPosition,
                        'overflow-y': 'scroll' // This property is posed for fix the blink of the window width change
                    });



                    _body.on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function () {

                        // Remove the transition property
                        _body.css('transition', 'none');
                        _body.css('margin-top', '0');
                        _body.stop().animate({
                            scrollTop: scrollPosition
                        },
                                0);
                    });

                    //$('.summarybox').attr('resize', 'true');
                    return false;
                }

                function getCompare(device) {
                    var containsItem = false;
                    var compare = StateManagement.getData(COMPARE_BASKET);

                    if (compare !== null) {
                        var compareArray = compare.split(',');

                        if (compareArray !== null) {

                            if (compareArray.indexOf(device) > -1) {
                                containsItem = true;
                            }
                        }
                    }
                    return containsItem;
                }


                function removeCompare(index, device, e) {
                    StateManagement.removeCompareBasketItem(COMPARE_BASKET, device.id);

                    e.currentTarget.closest('.slick-slide').remove()

                }


                function addRemoveCompare(device) {
                    var compare = StateManagement.getCompareBasket(COMPARE_BASKET);
                    var isAlreadyInCompare = false;

                    if (device !== null) {
                        if (compare !== null) {
                            for (var i = 0; i < compare.length; i++) {
                                var item = compare[i];
                                if (item.contains(device.id)) {
                                    isAlreadyInCompare = true;
                                    StateManagement.removeCompareBasketItem(COMPARE_BASKET, device.id);
                                    updateCompare(compare.length - 1);
                                }
                            }
                            if (isAlreadyInCompare === false) {
                                StateManagement.setCompareBasketItem(COMPARE_BASKET, device.id);
                                updateCompare(compare.length + 1);
                            }
                        } else {
                            StateManagement.setCompareBasketItem(COMPARE_BASKET, device.id);
                            updateCompare(1);
                        }
                    }
                }

                function updateCompare(compare) {
                    if (compare !== null) {
                        $('.num-compare-items').text(compare);
                    } else {
                        $('.num-compare-items').text(1);
                    }
                }

                function goToNextPage(deviceId, detailsPage) {
                    StateManagement.setDevice('device', deviceId);
                    detailsPage = detailsPage.replaceHTMLSuffix();
                    $state.go(detailsPage);
                }


                function goTo(link) {
                    link = link.replaceHTMLSuffix();
                    $state.go(link);
                }


                function loadStickyContent() {
                    var slickcurrentindex = $('#slick-index');
                    var dataindex = slickcurrentindex.attr('data-index');
                    //$scope.endRangeSlides = 4;
                    //var endOfRange = $scope.endRangeSlides;

                    if (dataindex !== 'undefined') {
                        //var dataIndexInt = parseInt(dataindex);
                        //var numSlicks = $('.slick-slide').length;

                        $scope.offset = dataindex;
                        $scope.$digest();
                    }

                    //var numItems = $('.slick-active').length;
                }


                function sticky_relocate() {
                    var window_top = $(window).scrollTop();
                    var stickyanchor = $('.sticky-anchor');

                    if (stickyanchor.length) {
                        var div_top = stickyanchor.offset().top;
                        if (window_top > div_top) {
                            $('.sticky').addClass('stick');
                            loadStickyContent();
                        } else {
                            $('.sticky').removeClass('stick');
                            loadStickyContent();
                        }
                    }
                }


                angular.element(document).ready(function () {

                    angular.element($window).bind('touchmove', sticky_relocate);
                    angular.element($window).bind('scroll', sticky_relocate);

                    sticky_relocate();

                    angular.element($window).onload = loadStickyContent;

                });


                function clearDevices() {
                    $scope.searchResults = [];
                    $scope.noResults = false;

                }



                function applyData(filterDevices, filterFeatures, products) {
                    var lis = filterDevices;
                    if (typeof (lis) === 'undefined') {
                        lis = products;
                        if (typeof (lis) === 'undefined') {
                            lis = filterFeatures;

                        }
                    }
                    var deviceList = lis.aggregations.devices.buckets;
                    $scope.searchResults = deviceList;
                    if (deviceList.length === 0 && !$scope.hasSearch) {
                        $scope.noResults = true;
                        loadAllDevicesData();
                    } else if (deviceList.length === 0 && $scope.hasSearch) {
                        $scope.noResults = true;
                    } else {
                        $scope.noResults = false;
                    }
                }


                function applyAllData(products) {
                    var deviceList = products.aggregations.devices.buckets;
                    $scope.searchResults = deviceList;
                }



                function applyCompareData(compareBasket) {
                    if (compareBasket != null) {
                        var products = DeviceService.findProductsByName(compareBasket).then(// jshint ignore:line
                                function (products) {
                                    var deviceList = products.aggregations.devices.buckets;
                                    $scope.searchResults = deviceList;

                                    if (deviceList.length === 0) {
                                        $scope.noResults = true;
                                    }
                                } //jshint ignore:line
                        ); //jshint ignore:line
                    }
                }


                function loadCompareDevices() {

                    var compareProducts = StateManagement.getCompareBasket(COMPARE_BASKET);
                    applyCompareData(compareProducts);
                }


                function searchProductData(data_query) {
                    DeviceService.findSearchProductsFiltered(data_query)
                            .then(
                                    function (products) {
                                        clearDevices();
                                        applyData(products);
                                    }
                            );
                }

                function loadProductData(deviceCategory, contractType, filterDevices, filterFeatures, useQuestions) {

                    if (!$scope.loadInitData) {
                        return;
                    }

                    $scope.deviceCategory = {
                        deviceCategory: deviceCategory,
                        contractType: contractType
                    };

                    if (useQuestions !== 'false') {
                        var questionsData = StateManagement.getData('questions');
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
                    DeviceService.findAllProducts($scope.deviceCategory)
                            .then(
                                    function (products) {
                                        applyAllData(products);
                                    }
                            );
                }

            });
