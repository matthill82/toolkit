/**
 * Not an AEM component, for nested use only!
 */
angular
    .module('uitoolkit')
    .component('deviceBenefits', {
        bindings: {
            featuresArray: '<',
            product: '<'
        },
        controller: function ($filter) {
            var $ctrl = this;
            var categoryMatches;

            $ctrl.benefits = [];
            $ctrl.benefitsLimit = 4;

            angular.forEach($ctrl.featuresArray, function (feature) {
                categoryMatches = $filter('filter')($ctrl.product.device.features, {
                    name: feature.value,
                    category: feature.category
                });

                if (categoryMatches.length) {
                    $ctrl.benefits.push(categoryMatches);
                }
            });
        },
        templateUrl: '/components/ng-components/device-benefits/device-benefits.html'
    });
