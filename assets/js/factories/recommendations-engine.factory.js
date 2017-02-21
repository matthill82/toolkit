/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */
angular.module('uitoolkit')
    .factory('RecEngineFactory', RecEngineFactory);

/**
 *
 * @param $filter
 * @param $q
 * @param {$rootScope.Scope} $rootScope
 * @param $timeout
 * @param {DeviceService} DeviceService
 * @param {EventBroadcastService} EventBroadcastService
 * @param {EventEnums} EventEnums
 * @param {JrdService} JrdService
 * @param {StateManagement} StateManagement
 * @param {StockService} StockService
 * @param {ToastService} ToastService
 * @param {UserService} UserService
 * @returns {{init: init, set: set}}
 * @constructor
 */
function RecEngineFactory(
    $filter,
    $q,
    $rootScope,
    $timeout,
    DeviceService,
    EventBroadcastService,
    EventEnums,
    JrdService,
    StateManagement,
    StockService,
    ToastService,
    UserService
) {
    var debugInfo = false;

    var requestsQueue;
    var settings = {
        lastCallArguments: null,
        cutOff: '80%',
        preselectedDevice: null,
        commercialLever: null // ['Commercial lever feature boosting', 'Retail Price', 'Commercial scoring']
    };
    var locationId;
    var commercialLevers;
    var wideBands;
    var narrowBands;
    var i;
    var j;
    var k;
    var l;
    var emptyResponse = { brackets: [[], [], []], range: { min_price: 0, max_price: 0 } };


    function init(journey) {
        // Store location
        locationId = UserService.getLocation();

        // Wide bands
        wideBands = JrdService.get('global', 'arp-banding-wide');


        // Commercial levers
        commercialLevers = JrdService.get(journey, 'commercial-lever-feature-boosting');


        // Narrow bands
        narrowBands = JrdService.get('global', 'arp-banding-narrow');


        //
        // Watchers
        //
        EventBroadcastService.subscribe(EventEnums.ENUMS.RECOMMENDATIONS_QUERY_UPDATE,
            function (data) {
                $timeout.cancel(requestsQueue);
                requestsQueue = $timeout(function () {
                    calculateRecommendations(data);
                }, 0);
            });


        $rootScope.$on(EventEnums.ENUMS.STOCK_TOGGLE,
            function () {
                $timeout.cancel(requestsQueue);
                requestsQueue = $timeout(function () {
                    calculateRecommendations().then(function (data) {
                        $rootScope.$broadcast(EventEnums.ENUMS.SPECS_SLIDER_CTA, data);
                    });
                }, 0);
            });
    }


    function set(userSettings) {
        var key;

        for (key in userSettings) {
            settings[key] = userSettings[key];
        }
    }


    function calculateRecommendations(queryOptions) {
        var callType;
        var selections;
        var mappings;
        var remappings;
        var featureGroupMappings;
        var emptyPromise;
        var start;
        var steps;

        var recommendations = [];
        var range = {};
        var wideBandsItems = [];
        var selectedWideBandItems = [];
        var narrowBandsItems = [];
        var brackets = [[], [], []];
        var theChosenOne = {};

        var calculateRecommendationsPromise = $q.defer();
        var showInStore = StateManagement.getData('showInStore') === 'true';

        var wideBandsItemsMinIndex = wideBands.length;
        var narrowBandsItemsMinIndex = narrowBands.length;

        // Save factory call arguments for Stock toggle change
        if (!queryOptions) {
            // Toggle call
            callType = 'toggle';

            if (settings.lastCallArguments) {
                queryOptions = settings.lastCallArguments;
            } else {
                emptyPromise = new $q.defer();
                emptyPromise.resolve(emptyResponse);

                return emptyPromise.promise;
            }


            debugInfo && console.log('// Toggle call');
        }
        else if (queryOptions && !settings.lastCallArguments) {
            // First or Reset call
            callType = 'first or reset';
            settings.lastCallArguments = queryOptions;


            debugInfo && console.log('// First or Reset call');
        } else {
            // Sliders change
            callType = 'sliders change';
            settings.lastCallArguments = queryOptions;

            // Remove the preselectedDevice
            settings.preselectedDevice = null;


            debugInfo && console.log('// Sliders change');
        }


        // Slider Selections
        selections = queryOptions.selections;
        mappings = queryOptions.mappings;


        // Create fast query mappings object
        if (mappings instanceof Array) {
            remappings = {}; // { Search Attribute: { Processor: { BA00002522BV00149800: {...}, BA00002522BV00149801: {...} } } }
            featureGroupMappings = {}; // { Processor: "Processor / Type" }

            mappings.forEach(function (item) {
                remappings[item.featureCategory] = remappings[item.featureCategory] || {};
                remappings[item.featureCategory][item.groupName] = remappings[item.featureCategory][item.groupName] || {};
                remappings[item.featureCategory][item.groupName][item.featureId] = item;

                featureGroupMappings[item.groupName] = item.featureName;
            });

            queryOptions.mappings = remappings;
            queryOptions.featureGroupMappings = featureGroupMappings;
        } else {
            // Stock toggle call
            remappings = queryOptions.mappings;
        }


        //Let's time this bad boy
        start = new Date().getTime();

        $rootScope.$broadcast(EventEnums.ENUMS.RECOMMENDATIONS_ANIMATION_SHOW);

        steps = {
            s1: $q.defer(),
            s2: $q.defer(),
            s3: $q.defer(),
            s4: $q.defer(),
            s5: $q.defer(),
            s6: $q.defer(),
            s7: $q.defer(),
            s8: $q.defer(),
            s9: $q.defer()
        };

        //
        // START
        //
        debugInfo && console.log('>>> START <<<');

        //
        // Step 1 - get all results based on the specs slider selection
        //
        DeviceService.getRecommendations(queryOptions)
            .then(function (data) {
                var productIds;


                debugInfo && console.log('>>> Step 1');


                recommendations = data.queryResult;


                //
                // Step 1.1 - get stock for these results if stock toggled to on
                //
                if (showInStore) {
                    productIds = [];

                    for (i = 0; i < recommendations.length; i++) {
                        productIds.push(recommendations[i].id.toString());
                    }

                    // Check if user properly logged in
                    if (!locationId) {
                        steps.s1.reject(rejectPromise());

                        ToastService.error('No branch selected', 'Please log in first');


                        //###
                        debugInfo && console.log('   <<< in Store recommendations, no locationId: 0', emptyResponse);
                        //###

                        return calculateRecommendationsPromise.reject();
                    }

                    StockService.getStockForLocationAndIds(locationId, productIds)
                        .then(
                            //success
                            function successGetStockForLocationAndIds (data) {
                                console.log('recommendations-engine', data);
                                var availableInStoreProductIds = {};
                                var storeOnlyRecommendations;

                                for (i = 0; i < data.queryResult.length; i++) {
                                    availableInStoreProductIds[data.queryResult[i].device.id] = true;
                                }

                                if (Object.keys(availableInStoreProductIds).length === 0) {
                                    steps.s1.reject(rejectPromise());

                                    ToastService.warn('No matches for branch ' + locationId, 'Please change your filters or change stock toggle');


                                    //###
                                    debugInfo && console.log('   <<< in Store recommendations: 0', emptyResponse);
                                    //###


                                    return calculateRecommendationsPromise.reject();
                                }
                                else {
                                    storeOnlyRecommendations = [];

                                    if (settings.preselectedDevice && !availableInStoreProductIds[settings.preselectedDevice.device.id]) {
                                        steps.s1.reject(rejectPromise());

                                        ToastService.warn('Unavailable in branch ' + locationId, 'Selected device not available in this branch');


                                        //###
                                        debugInfo && console.log('   <<< Deal/Search item not available in store', emptyResponse);
                                        //###
                                    }

                                    //Remove non matching products
                                    for (i = 0; i < recommendations.length; i++) {
                                        if (availableInStoreProductIds[recommendations[i].id]) {
                                            storeOnlyRecommendations.push(recommendations[i]);
                                        }
                                    }

                                    recommendations = storeOnlyRecommendations;


                                    //###
                                    debugInfo && console.log('   <<< in Store recommendations:', recommendations.length, recommendations);
                                    //###
                                }

                                steps.s1.resolve();
                            },
                            //error
                            function errorGetStockForLocationAndIds (err) {
                                console.log('error StockService.getStockForLocationAndIds', err);
                                steps.s1.resolve();
                            });
                } else {
                    if (recommendations.length === 0) {
                        steps.s1.reject(rejectPromise());

                        ToastService.warn('No matches', 'Please change your filters');


                        //###
                        debugInfo && console.log('   <<< Full range recommendations: 0', emptyResponse);
                        //###


                        return calculateRecommendationsPromise.reject();
                    } else {
                        //###
                        debugInfo && console.log('   <<< Full range recommendations:', recommendations.length, recommendations);
                        //###


                        steps.s1.resolve();
                    }
                }
            });


        // Step 2
        steps.s1.promise.then(function () {
            console.log('step2')
            //
            // Feature boosting (a.k.a. Soft filters)
            //
            var item;
            var feature;
            var minFeatureBoost;
            var maxFeatureBoost = 0;
            var cutOff = parseInt(settings.cutOff) / 100;


            debugInfo && console.log('>>> Step 2');


            recommendations.forEach(function (item) {
                item._augmentation = {};
                item._augmentation.featureBoost = 0;

                item.device.features.forEach(function (feature) {
                    if (remappings[feature.category] &&
                        remappings[feature.category][feature.name] &&
                        remappings[feature.category][feature.name][feature.id] &&
                        selections[feature.category] &&
                        selections[feature.category][feature.name] &&
                        selections[feature.category][feature.name].indexOf(remappings[feature.category][feature.name][feature.id].groupValue) !== -1) {
                        if (remappings[feature.category][feature.name][feature.id].boost) {
                            item._augmentation.featureBoost += parseInt(remappings[feature.category][feature.name][feature.id].boost);
                        }
                    }
                });

                if (item._augmentation.featureBoost > maxFeatureBoost) {
                    maxFeatureBoost = item._augmentation.featureBoost;
                }
            });


            //
            // 2.2 Remove recommendations under boost threshold
            //
            minFeatureBoost = maxFeatureBoost * cutOff;

            i = 0;
            while (i < recommendations.length) {
                //###
                debugInfo && console.log('   <<< Min boost cut-off', minFeatureBoost, '?', recommendations[i]._augmentation.featureBoost);
                //###


                if (recommendations[i]._augmentation.featureBoost < minFeatureBoost) {
                    recommendations.splice(i, 1);
                } else {
                    i++;
                }
            }


            //###
            debugInfo && console.log('   <<< recommendations after cut-off', recommendations.length, recommendations);
            //###

            steps.s2.resolve();
        });


        // Step 3
        steps.s2.promise.then(function () {
            var price;

            debugInfo && console.log('>>> Step 3');

            //
            // Wide banding
            //
            for (i = 0; i < recommendations.length; i++) {
                price = recommendations[i].offering[0].upfrontPrice.net.value;

                j = 0;
                while (j < wideBands.length && !(wideBands[j].lowValue <= price && price <= wideBands[j].highValue)) {
                    j++;
                }
                if (j < wideBands.length) {
                    wideBandsItems[j] = wideBandsItems[j] || [];
                    wideBandsItems[j].push(recommendations[i]);

                    //###
                    debugInfo && console.log('   <<<', wideBands[j].lowValue, '<', price, '<', wideBands[j].highValue, i, j);
                    //###
                }

                //
                // Step 4 - lowest wide band with items
                //
                if (wideBandsItemsMinIndex > j) {
                    wideBandsItemsMinIndex = j;
                }
            }


            steps.s3.resolve();
        });

        // Step 4
        steps.s3.promise.then(function () {
            debugInfo && console.log('>>> Step 4');

            //
            // Lowest priced wide band group with items
            //
            selectedWideBandItems = wideBandsItems[wideBandsItemsMinIndex];


            //###
            debugInfo && console.log('   <<< Lowest priced wide band group with items:', wideBandsItemsMinIndex, selectedWideBandItems);
            //###


            steps.s4.resolve();
        });

        // Step 5
        steps.s4.promise.then(function () {
            debugInfo && console.log('>>> Step 5');

            //
            // Apply commercial levers to the lowest priced wide band group
            //
            selectedWideBandItems = applyCommercialLevers(selectedWideBandItems);

            theChosenOne = selectedWideBandItems[0];


            //###
            debugInfo && console.log('   <<< The chosen one:', theChosenOne);
            //###


            steps.s5.resolve();
        });

        // Step 6
        steps.s5.promise.then(function () {
            debugInfo && console.log('>>> Step 6');

            //
            // Move "the chosen one" to the top if not already there - we will do this in Step 9 for all brackets
            //

            //###
            debugInfo && console.log('   <<< SKIPPED');
            //###

            steps.s6.resolve();
        });

        // Step 7
        steps.s6.promise.then(function () {
            debugInfo && console.log('>>> Step 7');


            //
            // Narrow banding
            //
            for (i = 0; i < recommendations.length; i++) {
                var price = recommendations[i].offering[0].upfrontPrice.net.value;

                j = 0;
                while (j < narrowBands.length && !(narrowBands[j].minimumValue <= price && price <= narrowBands[j].maximumValue)) {
                    j++;
                }
                if (j < narrowBands.length) {
                    narrowBandsItems[j] = narrowBandsItems[j] || [];
                    narrowBandsItems[j].push(recommendations[i]);
                }


                //
                // Step 8 - the narrow band with the chosen one
                //
                if (theChosenOne.id === recommendations[i].id) {
                    narrowBandsItemsMinIndex = j
                }
            }


            //###
            debugInfo && console.log('   <<< Narrow Banding', narrowBandsItems, narrowBandsItems[narrowBandsItemsMinIndex]);
            //###

            steps.s7.resolve();
        });

        // Step 8
        steps.s7.promise.then(function () {
            debugInfo && console.log('>>> Step 8');

            //
            // Get the first 3 narrow bands with items starting from the one with the chosen one
            //

            if (settings.preselectedDevice) {
                var price = settings.preselectedDevice.offering[0].upfrontPrice.net.value;

                j = 0;
                while (j < narrowBands.length && !(narrowBands[j].minimumValue <= price && price <= narrowBands[j].maximumValue)) {
                    j++;
                }
                i = j;
            } else {
                i = narrowBandsItemsMinIndex;
            }


            j = 0;
            while (i < narrowBandsItems.length && j < 3) {
                if (narrowBandsItems[i] && narrowBandsItems[i].length) {
                    brackets[j] = narrowBandsItems[i];
                    j++;
                }
                i++;
            }


            steps.s8.resolve();
        });

        // Step 9
        steps.s8.promise.then(function () {
            debugInfo && console.log('>>> Step 9');

            var df;
            var clf;


            //
            // Apply Commercial Levers to brackets
            //
            for (l = 0; l < brackets.length; l++) {
                brackets[l] = applyCommercialLevers(brackets[l]);
            }


            //
            // Add the preselected device to the first bracket
            //
            if (settings.preselectedDevice) {
                brackets[0] = [settings.preselectedDevice];
            }


            //
            // Leave only the top device in bracket 2 & 3
            //
            if (brackets[1].length) {
                brackets[1] = [brackets[1][0]];

                if (brackets[2].length) {
                    brackets[2] = [brackets[2][0]];
                }
            }


            //
            // Calculate price range
            //
            range = calculatePriceRange(brackets);

            debugInfo && console.log('   <<< brackets:', brackets);


            steps.s9.resolve();
        });

        // FINISH
        steps.s9.promise.then(function () {
            debugInfo && console.log('>>> FINISH <<<');

            EventBroadcastService.publish(EventEnums.ENUMS.RECOMMENDATIONS_RESULTS_UPDATE, {
                brackets: brackets,
                range: range
            });
            $rootScope.$broadcast(EventEnums.ENUMS.RECOMMENDATIONS_ANIMATION_HIDE);

            calculateRecommendationsPromise.resolve({ brackets: brackets, range: range });

            // Send initial price range
            if (!settings.preselectedDevice && callType === 'first or reset') {
                $rootScope.$broadcast(EventEnums.ENUMS.RECOMMENDATIONS_TOP_RESULT_SKU, brackets[0][0].id);
                $rootScope.$broadcast(
                    EventEnums.ENUMS.RECOMMENDATIONS_RESULTS_INITIAL_RANGE,
                    range.min_price + '-' + range.max_price
                );
            }

            if (callType === 'first or reset') {
                $rootScope.$broadcast(EventEnums.ENUMS.SPECS_SLIDER_CTA, { brackets: brackets, range: range });
            }

            //
            var end = new Date().getTime();
            var time = end - start;
            debugInfo && console.log('Recommendations Time take: ' + time + 'ms');
        });

        return calculateRecommendationsPromise.promise;
    }


    function rejectPromise() {
        EventBroadcastService.publish(EventEnums.ENUMS.RECOMMENDATIONS_RESULTS_UPDATE, emptyResponse);
        $rootScope.$broadcast(EventEnums.ENUMS.SPECS_SLIDER_CTA, emptyResponse);
        $rootScope.$broadcast(EventEnums.ENUMS.RECOMMENDATIONS_ANIMATION_HIDE);
    }


    function applyCommercialLevers(collection) {
        var df;
        var clf;
        var item;

        if (settings.commercialLever === 'Commercial lever feature boosting') {
            // Calculate commercial lever feature boosting
            for (i = 0; i < collection.length; i++) {
                item = collection[i];

                item._augmentation.commercialLeversBoost = 0;

                for (j = 0; j < item.device.features.length; j++) {
                    df = item.device.features[j];

                    for (k = 0; k < commercialLevers.length; k++) {
                        clf = commercialLevers[k];

                        if (df.category === clf.featureCategory && df.name === clf.featureName) {
                            item._augmentation.commercialLeversBoost += clf.boost;
                        }
                    }
                }


                //###
                debugInfo && console.log('   <<< Commercial Levers Boost:', i, item._augmentation.commercialLeversBoost);
                //###
            }

            collection = $filter('orderBy')(collection, ['-_augmentation.commercialLeversBoost']);

        } else if (settings.commercialLever === 'Retail Price') {
            collection = $filter('orderBy')(collection, ['-offering[0].upfrontPrice.net.value']);

        } else if (settings.commercialLever === 'Commercial scoring') {
            collection = $filter('orderBy')(collection, ['-commercialRating']);
        }

        return collection;
    }


    function calculatePriceRange(brackets) {
        var min;
        var max;
        var bracket;

        if (brackets.length && brackets[0].length) {
            min = brackets[0][0].offering[0].upfrontPrice.net.value;
            max = brackets[0][0].offering[0].upfrontPrice.net.value;
        } else {
            min = 0;
            max = 0;
        }

        for (i = 0; i < brackets.length; i++) {
            bracket = brackets[i];

            for (j = 0; j < bracket.length; j++) {
                min = Math.min(min, bracket[j].offering[0].upfrontPrice.net.value);
                max = Math.max(max, bracket[j].offering[0].upfrontPrice.net.value);
            }
        }


        return {
            min_price: min,
            max_price: max
        };
    }


    return {
        init: init,
        set: set
    };
}
