/**
 * @param {$filter} $filter
 * @param $q
 * @param {$rootScope.Scope} $scope
 * @param $timeout
 * @param {DeviceRecommendationsService} DeviceRecommendationsService
 * @param {EventEnums} EventEnums
 * @param JrdService
 * @param RecEngineFactory
 * @param StateManagement
 * @constructor
 */

angular.module('uitoolkit')
    .controller('DeviceRecommendationsController', DeviceRecommendationsController);
function DeviceRecommendationsController(
    $filter,
    $q,
    $scope,
    $timeout,
    DeviceRecommendationsService,
    EventEnums,
    JrdService,
    RecEngineFactory,
    StateManagement
) {
    var $ctrl = this;
    var directionKeys = StateManagement.journeyGetDirectionKeys();
    var upsellMappings = JrdService.get($ctrl.journeyType, 'recommendations-upsell');
    var featureMappings = JrdService.get($ctrl.journeyType, 'feature-mappings');
    var featureNameToGroupName = {};
    var featureValueToGroupValue = {};
    var upsellFeatureMappings = {};
    var featureCategory = $ctrl.upsellFeatureCategory;
    var i;
    var item;
    var groupName;
    var loadingPromise;
    var loadingTimer;

    $ctrl.addToBasket = addToBasket;

    $ctrl.upsellMessages = {'b12':{}, 'b23': {}};


    for (i=0; i <featureMappings.length; i++) {
        item = featureMappings[i];

        featureNameToGroupName[item.featureCategory] = featureNameToGroupName[item.featureCategory] || {};
        featureNameToGroupName[item.featureCategory][item.featureName] = featureNameToGroupName[item.featureCategory][item.featureName] || item.groupName;
    }

    for (i=0; i<featureMappings.length; i++) {
        item = featureMappings[i];
        groupName =  featureNameToGroupName[item.featureCategory][item.featureName];

        featureValueToGroupValue[item.featureCategory] = featureValueToGroupValue[item.featureCategory] || {};
        featureValueToGroupValue[item.featureCategory][groupName] = featureValueToGroupValue[item.featureCategory][groupName] || {};
        featureValueToGroupValue[item.featureCategory][groupName][item.featureValue] = item.groupValue;
    }

    for (i=0; i<upsellMappings.length; i++) {
        item = upsellMappings[i];

        upsellFeatureMappings[item.groupName] = upsellFeatureMappings[item.groupName] || {};
        upsellFeatureMappings[item.groupName][item.groupValueFrom] = upsellFeatureMappings[item.groupName][item.groupValueFrom] || [];
        upsellFeatureMappings[item.groupName][item.groupValueFrom].push(item);
    }


    $ctrl.$onInit = function DeviceRecommendationsService$onInit() {
        var currentJourneyStart = StateManagement.journeyGetStart();
        var journeyBackPaths = $ctrl.journeyBackPaths;

        $ctrl.animationEnabled = $ctrl.animationEnabledString === 'true';
        $ctrl.loadingDelay = $ctrl.loadingDelay ? parseInt($ctrl.loadingDelay) : 0;

        RecEngineFactory.set({'cutOff': this.cutOff});

        journeyBackPaths = journeyBackPaths.replace(/\\x22/g,'"');
        //journeyBackPaths = journeyBackPaths.replace(/\//g, '');
        journeyBackPaths = journeyBackPaths.replace(/\\x26#45;/g, '-');
        journeyBackPaths = angular.fromJson(journeyBackPaths);

        if (currentJourneyStart) {

            $scope.$root.$broadcast(EventEnums.ENUMS.CTA_BUTTON_UPDATE, { direction: directionKeys.BACK, link: journeyBackPaths[currentJourneyStart] });

        }



        //
        // Upsell messages
        //
        var recommendations;


        var br1rec;
        var br2rec;
        var br3rec;


        //
        // Listeners
        //
        $scope.$on(EventEnums.ENUMS.SPECS_SLIDER_CTA, function (event, data) {
            $ctrl.upsellMessages = {'b12':{}, 'b23': {}}; // Upsel messages between brackets 1-2 and 2-3
            recommendations = data.brackets;

            br2rec = null; //Bracket 2 recommendation
            br3rec = null; //Bracket 3 recommendation

            if (recommendations) {
                if (recommendations[1] && recommendations[1].length) {
                    br2rec = recommendations[1][0];
                }

                if (recommendations[2] && recommendations[2].length) {
                    br3rec = recommendations[2][0];
                }
            }
        });

        $scope.$on(EventEnums.ENUMS.SWIPER_SLIDE_CHANGE, function (event, data) {
            updateUpsellMessages(data.activeIndex);
        });


        function updateUpsellMessages(activeIndex) {
            if (recommendations) {
                activeIndex = activeIndex < recommendations[0].length ? activeIndex : recommendations[0].length - 1;

                br1rec = recommendations[0][activeIndex];

                if (br2rec) {
                    //compare 1 and 2
                    $ctrl.upsellMessages.b12 = compareDevices(br1rec, br2rec);

                    if (br3rec) {
                        //compare 1 and 3
                        $ctrl.upsellMessages.b23 = compareDevices(br1rec, br3rec);
                    }
                }
            }
        }
    };

    $scope.$on(EventEnums.ENUMS.RECOMMENDATIONS_ANIMATION_SHOW, function () {
        $ctrl.showAnimation = true;

        addLoadingDelay();
    });

    $scope.$on(EventEnums.ENUMS.RECOMMENDATIONS_ANIMATION_HIDE, function () {
        loadingPromise.promise.then(function () {
            $ctrl.showAnimation = false;
        });
    });

    function compareDevices(d1, d2) {
        var priceDelta = d2.offering[0].upfrontPrice.net.value - d1.offering[0].upfrontPrice.net.value;
        var message;
        var messageId = Number.MAX_VALUE;
        var d1Feature;
        var d2Feature;

        for (i=0; i<d1.device.features.length; i++) {
            d1Feature = d1.device.features[i];

            if (d1Feature.category === featureCategory) {
                // only Search Attribute

                var featureGroupName = featureNameToGroupName[featureCategory][d1Feature.name];

                if (featureGroupName &&
                    featureValueToGroupValue[featureCategory] &&
                    featureValueToGroupValue[featureCategory][featureGroupName]) {
                    // Processor / Type -> Processor

                    var d1FeatureGroupValue = featureValueToGroupValue[featureCategory][featureGroupName][d1Feature.value];


                    if (upsellFeatureMappings[featureGroupName] && upsellFeatureMappings[featureGroupName][d1FeatureGroupValue]) {
                        // Upsell messages for feature from d1
                        var upsellFeatureGroup = upsellFeatureMappings[featureGroupName][d1FeatureGroupValue];


                        d2Feature = $filter('filter')(d2.device.features, {category: d1Feature.category, name: d1Feature.name});
                        d2Feature = d2Feature.length ? d2Feature[0] : d2Feature;

                        if (d2Feature) {
                            var d2FeatureGroupValue = featureValueToGroupValue[featureCategory][featureGroupName][d2Feature.value];
                            var foundUpsellMessages = $filter('filter')(upsellFeatureGroup, {groupValueFrom: d1FeatureGroupValue, groupValueTo: d2FeatureGroupValue}, true);

                            if (foundUpsellMessages.length) {
                                var foundMessage = foundUpsellMessages[0];

                                if (foundMessage.valueRule !== 'skip' && foundMessage.index < messageId) {
                                    messageId = foundMessage.index;
                                    message = foundMessage.displayText;
                                }
                            }
                        }
                    }
                }
            }
        }


        return {
            priceDelta: priceDelta,
            message: message
        };
    }

    function addToBasket(proposition) {
        StateManagement.journeySetDirection(directionKeys.NEXT);
        DeviceRecommendationsService.addToBasket(proposition);
    }

    function addLoadingDelay() {
        console.log('start timer (new promise)');
        loadingPromise = $q.defer();

        if (loadingTimer) {
            $timeout.cancel(loadingTimer);
        }

        loadingTimer = $timeout(function () {
            console.log('resolve promise');

            loadingPromise.resolve();
        }, $ctrl.loadingDelay);
    }
}
