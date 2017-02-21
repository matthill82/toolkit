/**
 * @example
 *  <device-compare
 *      dc-compare-active="cwsicon-circle-heart-sel" Selected icon class
 *      dc-compare-inactive="cwsicon-circle-heart" Unselected icon class
 *      dc-compare-hidden="false" Set to 'true' to hide the component. (todo, Appears to be an unecessary private use case only for when the component is nested inside a device-image, can we remove this?)
 *      dc-is-compare="false" Set to 'true' if this is the compare screen Private use case for device-carousel in compare screen mode, do not expose to AEM. (todo, Ideally move this functionallity)
 *      dc-remove-icon="cwsicon-circle-close" Private use case for device compare screen (when dc-is-compare=true), do not expose to AEM.
 *      device="[optional device object]"
 *  ></device-compare>
 */
angular.module('uitoolkit')
    .component('deviceCompare', {
        bindings: {
            compareActive: '@dcCompareActive',
            compareInactive: '@dcCompareInactive',
            compareIsHidden: '@dcCompareHidden',
            device: '<?',
            isCompare: '@dcIsCompare',
            removeFromCompareIcon: '@dcRemoveIcon'
        },
        controller: 'DeviceCompareController',
        templateUrl: '/components/ng-components/device-details/device-compare/device-compare.html'
    });
