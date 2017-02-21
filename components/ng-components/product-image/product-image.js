/**
 * @example
 *  <product-image
 *      colour-index="0"
 *      device-id="MY_DEVICE"
 *      image-index="0"
 *  ></product-image>
 */
angular
    .module('uitoolkit')
    .component('productImage', {
        bindings: {
            colourIndex: '@',
            deviceId: '@',
            imageIndex: '@'
        },
        controller: 'ProductImageController',
        template: '<image-block image-src="{{ :: $ctrl.image.url }}"></image-block>'
    });
