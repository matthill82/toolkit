/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .controller('PropositionController', function(StateManagement, $state, $scope) {
        var vm = this;
        var PLAN_KEY='plan';

        vm.goToPropositionCta = goToPropositionCta;
        vm.getManufacturerClass = getManufacturerClass;
        vm.getFeatureValue = getFeatureValue;

        function getManufacturerClass(manufacturer) {
            var manufacturerClass = 'disabled';
            if (typeof manufacturer !== 'undefined') {
                manufacturerClass = manufacturer.toLowerCase();
            }
            return manufacturerClass;
        }

        function goToPropositionCta(planId) {
            StateManagement.setPlan(PLAN_KEY, planId);

            var path = $scope.planCtaPath.replaceHTMLSuffix();
            $state.go(path);
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
    });
