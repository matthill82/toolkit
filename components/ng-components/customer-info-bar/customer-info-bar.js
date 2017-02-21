/**
 * @example
 *  <customer-info-bar></customer-info-bar>
 */
angular.module('uitoolkit')
    .component('customerInfoBar', {
        templateUrl: '/components/ng-components/customer-info-bar/customer-info-bar.html',
        controller: 'CustomerInfoBarController',
        bindings: {
            title: '@',
            rightActions: '<?',
            leftActions: '<',
            customerIcon: '@'
        }
    });
