angular.module('uitoolkit')
    .controller('PlanController', PlanController);

function PlanController($scope, $state, StateManagement) {
        var vm = this;
        var PLAN_KEY = 'plan';
        var FEATURE_CONN = 'Connectivity';
        var FEATURE_CONN_3G = '3G';
        var FEATURE_CONN_4G = '4G';
        var DATA_GB = 'GB';
        var DATA_MB = 'MB';

        vm.getAllowanceValue = getAllowanceValue;
        vm.getAllowanceGraphPosition = getAllowanceGraphPosition;
        vm.getGeneration = getGeneration;
        vm.getCarrierClass = getCarrierClass;
        vm.getFeatureValue = getFeatureValue;
        vm.goToPlanCta = goToPlanCta;

        function getCarrierClass(network) {
            var networkClass = 'disabled';
            if (typeof network !== 'undefined') {
                networkClass = network.toLowerCase();
            }
            return networkClass;
        }

        function getGeneration(features) {
            var generation = FEATURE_CONN_3G;
            if (typeof features !== undefined){
                for (var i = 0; i < features.length; i++) {
                    var feature = features[i];
                    var cat = feature.category;
                    var name = feature.name;
                    if (cat.contains(FEATURE_CONN)) {
                        if (name.contains(FEATURE_CONN_4G)) {
                            generation = FEATURE_CONN_4G;
                        }
                    }
                }
            }
            return generation;
        }

        function getAllowanceValue(value, unit, isUnlimited, unlimitedText) {
            if (typeof value !== undefined) {
                if (isUnlimited === true) {
                    return unlimitedText;
                } else {
                    if ((unit.contains(DATA_MB)) && (value >= 1024)) {
                        value = value / 1024;
                        unit = DATA_GB;
                    }
                    return value + ' ' + unit;
                }
            }
        }

        function getAllowanceGraphPosition(value, unit, unlimited, range) {
            if (value !== undefined) {
                if (unlimited === true) {
                    return 6;
                } else {
                    if (range !== undefined) {
                        var rangeItem = range.split(',');
                        for (var i = 0; i < rangeItem.length; i++) {
                            var valueConvertedToSameUnit = value;

                            if (unit.contains(DATA_MB)) {
                                valueConvertedToSameUnit = value / 1024;
                            }

                            if (rangeItem[i] >= valueConvertedToSameUnit) {
                                return i + 1;
                            }
                        }
                    }
                }
            }
        }

        function getFeatureValue(features, needle) {
            var needleAsArray = needle.split(' || ');
            var featureCategory = needleAsArray[0];
            var featureName = needleAsArray[1];

            for (var i=0; i<features.length; i++) {
                if (features[i].category === featureCategory && features[i].name === featureName) {
                    return features[i].value + features[i].unit;
                }
            }
        }

        function goToPlanCta(planId) {
            StateManagement.setPlan(PLAN_KEY, planId);

            var path = $scope.planCtaPath.replaceHTMLSuffix();
            $state.go(path);
        }
}
