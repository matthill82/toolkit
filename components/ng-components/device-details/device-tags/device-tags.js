/**
 * @desc tags directive that can be used anywhere across the app
 * @example
 *  <device-tags pt-journey-type="WINDOWS LAPTOPS & CONVERTIBLES"></device-tags>
 */
angular
    .module('uitoolkit')
    .component('deviceTags', {
        bindings: {
            journeyType: '@ptJourneyType'
        },
        controller : 'DeviceTagsController',
        templateUrl: '/components/ng-components/device-details/device-tags/device-tags.html'
    });
