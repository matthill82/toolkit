/**
 * @example
 *  <customer-details
        cd-profile-icon=""
        cd-full-name=""
        cd-mobile=""
        cd-previous-route=""
 *  >
 *  </customer-details>
 */
angular.module('uitoolkit')
    .component('customerDetails', {
        bindings: {
            customerIcon: '<cdCustomerIcon'
        },
        templateUrl: '/components/ng-components/customer-info-bar/customer-details/customer-details.html',
        controller: function ($state) {
            var $ctrl = this;
            $ctrl.goTo = goTo;

            function goTo(route) {
                $state.go(route.replaceHTMLSuffix());
            }
        }
    });
