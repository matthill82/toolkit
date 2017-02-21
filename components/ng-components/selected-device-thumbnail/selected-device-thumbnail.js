/**
 * @example
 *  <selected-device-thumbnail
 *      image-sie="small" //optional, used by ImageService
 *  ></selected-device-thumbnail>
 */
angular
    .module('uitoolkit')
    .component('selectedDeviceThumbnail',{
        bindings: {
            imageSize: '@'
        },
        controller: 'SelectedDeviceThumbnailController',
        templateUrl: '/components/ng-components/selected-device-thumbnail/selected-device-thumbnail.html'
    });
