angular
    .module('uitoolkit')
    .controller('SpecsSliderButtonsWrapperController', SpecsSliderButtonsWrapperController);

function SpecsSliderButtonsWrapperController(
        $filter,
        $q,
        $scope,
        $window,
        DeviceService,
        EventBroadcastService,
        EventEnums,
        JrdService,
        RecEngineFactory,
        StateManagement) {
            var prerequisites = $q.defer();
            var publishers = [];
            var mapValueToGroup = {}; // Search Attribute||Processor||Intel Core i7 -> 'Ultimate'
            var mapFeatureNameToGroupName = {}; // 'Processor / Type' -> 'Processor'


            //
            // Init
            //
            $scope.init = function (journey, preselectionsForJourneys, selectedKeyFeatures, commercialLever) {

                $scope.deviceCategory = journey;
                $scope.preselectionsForJourneys = preselectionsForJourneys;
                $scope.selectedKeyFeatures = selectedKeyFeatures;
                $scope.commercialLever = commercialLever;
                $scope.mappings = JrdService.get($scope.deviceCategory, 'feature-mappings');


                RecEngineFactory.set({selectedKeyFeatures: selectedKeyFeatures});
                RecEngineFactory.set({lastCallArguments: null});
                RecEngineFactory.set({commercialLever: commercialLever});
                RecEngineFactory.init(journey);

                remap();
                selectionsToDataPoints();

            };


            //
            // Utils
            //
            function remap() {
                var i, item, groupName;
                $scope.mappings = $filter('orderBy')($scope.mappings, 'index');


                for (i = 0; i < $scope.mappings.length; i++) {
                    item = $scope.mappings[i];

                    // 'Processor / Type' -> 'Processor'
                    mapFeatureNameToGroupName[item.featureCategory] = mapFeatureNameToGroupName[item.featureCategory] || {};
                    mapFeatureNameToGroupName[item.featureCategory][item.featureName] = mapFeatureNameToGroupName[item.featureCategory][item.featureName] || item.groupName;
                }

                for (i = 0; i < $scope.mappings.length; i++) {
                    item = $scope.mappings[i];
                    groupName =  mapFeatureNameToGroupName[item.featureCategory][item.featureName];

                    // Search Attribute||Processor||Intel Core i7 -> 'Ultimate'
                    mapValueToGroup[item.featureCategory] = mapValueToGroup[item.featureCategory] || {};
                    mapValueToGroup[item.featureCategory][groupName] = mapValueToGroup[item.featureCategory][groupName] || {};
                    mapValueToGroup[item.featureCategory][groupName][item.featureValue] = item.groupValue;
                }
            }


            function selectionsToDataPoints() {

                // Journey start
                var journeyStart = StateManagement.journeyGetStart();

                // Preselected device
                if ($scope.preselectionsForJourneys.split('||').indexOf(journeyStart) !== -1) {

                    var preselectedDeviceId = StateManagement.getDevice($window.ENUMS.DEVICE_KEYS.PRESELECTED_DEVICE);

                    var queryData = {
                                    query: [{'device.id': preselectedDeviceId}],
                                    size: 1
                                };

                    DeviceService.elasticQuery(queryData)
                        .then(function(data){
                                var groupName;
                                var groupValue;
                                var matchIndex;
                                var key;
                                var val;
                                var i;

                                $scope.selections = {};

                                $scope.preselectedDevice = data.queryResult[0];
                                RecEngineFactory.set({preselectedDevice: $scope.preselectedDevice});


                                //
                                // Selected key features
                                //

                                // Create groups in the selections for the preselected key features
                                for (key in $scope.selectedKeyFeatures) {
                                    $scope.selections[key] = $scope.selections[key] || {};

                                    for (i=0; i<$scope.selectedKeyFeatures[key].length; i++) {
                                        val = $scope.selectedKeyFeatures[key][i];

                                        $scope.selections[key][val] = [];
                                    }
                                }


                                //
                                // Find device key features values
                                //
                                $scope.preselectedDevice.device.features.forEach(function (item) {
                                    var groupCategory = item.category;
                                    var featureCategory = mapFeatureNameToGroupName[groupCategory];

                                    if (featureCategory) {
                                        groupName = featureCategory[item.name];


                                        if ($scope.selections[groupCategory] && $scope.selections[groupCategory][groupName]) {
                                            groupValue = mapValueToGroup[groupCategory][groupName][item.value];
                                            $scope.selections[groupCategory][groupName].push(groupValue);


                                            // Find index of the matched item
                                            matchIndex = $filter('filter')($scope.mappings, {
                                                featureCategory: groupCategory,
                                                groupName: groupName,
                                                groupValue: groupValue
                                            }, true)[0].index;


                                            // Add all values from the same featureCategory higher than the found one
                                            $filter('filter')($scope.mappings, {
                                                featureCategory: groupCategory,
                                                groupName: groupName
                                            }, true).forEach(function (item) {
                                                if (item.index > matchIndex && $scope.selections[groupCategory][groupName].indexOf(item.groupValue) === -1) {
                                                    $scope.selections[groupCategory][groupName].push(item.groupValue);
                                                }
                                            });
                                        }
                                    }
                                });


                                prerequisites.resolve();
                            });

                } else {

                    $scope.preselectedDevice = null;
                    $scope.selections = StateManagement.questionsGetDataPoints($scope.deviceCategory);

                    prerequisites.resolve();

                }

            }


            prerequisites.promise.then(function(){

                    $scope.isActive = function (item) {

                                var fc = $scope.selections[item.featureCategory];

                                if (fc) {
                                    var gn = fc[item.groupName];

                                    if (gn) {
                                        return gn.indexOf(item.groupValue) !== -1;
                                    }
                                }

                                return false;
                        };


                    $scope.toggleActive = function (item, isMultiSelect) {

                            if ($scope.isActive(item)) {
                                //Remove it
                                var i = $scope.selections[item.featureCategory][item.groupName].indexOf(item.groupValue);
                                $scope.selections[item.featureCategory][item.groupName].splice(i, 1);

                                //Remove the whole group if no selections left
                                if (!$scope.selections[item.featureCategory][item.groupName].length) {
                                    delete $scope.selections[item.featureCategory][item.groupName];
                                }
                            } else {
                                //Add it
                                $scope.selections[item.featureCategory] = $scope.selections[item.featureCategory] || {};
                                $scope.selections[item.featureCategory][item.groupName] = $scope.selections[item.featureCategory][item.groupName] || [];
                                if (isMultiSelect) {
                                    $scope.selections[item.featureCategory][item.groupName].push(item.groupValue);
                                } else {
                                    $scope.selections[item.featureCategory][item.groupName] = [item.groupValue];
                                }
                            }

                        };


                    $scope.$watch('selections', function(){

                            publishQueryUpdate();

                        }, true);

                });


            //
            // Listeners
            //
            publishers.push(EventBroadcastService.subscribe(EventEnums.ENUMS.SPECS_SLIDER_RESET, function () {

                        $scope.init($scope.deviceCategory, $scope.preselectionsForJourneys, $scope.selectedKeyFeatures, $scope.commercialLever);

                        prerequisites.promise.then(function(){
                                publishQueryUpdate();
                            });

                    })
                );


            //
            // Helpers
            //
            function publishQueryUpdate() {

                $scope.$root.$broadcast(EventEnums.ENUMS.RECOMMENDATIONS_QUERY_UPDATE, {
                    selections: $scope.selections,
                    mappings: $scope.mappings,
                    deviceCategory: $scope.deviceCategory,
                    preselectedDevice: $scope.preselectedDevice
                });

                publishers.push(EventBroadcastService.publish(EventEnums.ENUMS.RECOMMENDATIONS_QUERY_UPDATE, {
                            selections: $scope.selections,
                            mappings: $scope.mappings,
                            deviceCategory: $scope.deviceCategory,
                            preselectedDevice: $scope.preselectedDevice
                        })
                    );

            }


            //
            // Clean
            //
            $scope.$on('$destroy', function () {
                for (var i=0; i<publishers.length; i++) {
                    if (publishers[i]) {
                        publishers[i].remove();
                    }
                }
                publishers = [];

                // Reset last call arguments when leaving the page.
                RecEngineFactory.set({lastCallArguments: null, preselectedDevice: null});
            });

}
