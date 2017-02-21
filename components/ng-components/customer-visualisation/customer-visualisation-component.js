/**
 * @example
 *  <customer-visualisation
 *  ></customer-visualisation>
 */

angular.module('uitoolkit')
    .component('customerVisualisation', {
        bindings: {
            customer: '<'
        },
        controllerAs: 'model',
        controller: function (StateManagement) {

            var model = this;

            model.$onInit = function () {
                var model = this;
                model.obj = getParsedData('accountData');
            };

            function getParsedData(key) {
                return JSON.parse(StateManagement.getData(key));
            }
        },
        templateUrl: '/components/ng-components/customer-visualisation/customer-visualisation.html'
    });
