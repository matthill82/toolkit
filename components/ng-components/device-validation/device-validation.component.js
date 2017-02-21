/**
 * @example
 *  <device-validation
 *  al-profile="object from server"
 *  al-cta-redirect="{{}}"
 *  ></device-validation>
 */

angular.module('uitoolkit')
    .component('deviceValidation', {
        bindings: {
            profile: '<alProfile',
            ctaRedirect: '@alCtaRedirect'
        },
        controller: 'DeviceValidationController',
        templateUrl: '/components/ng-components/device-validation/device-validation.html'
    });
