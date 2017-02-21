// input id and something to identify the image
angular
    .module('uitoolkit')
    .component('productImageCta', {
        bindings: {
            colourIndex: '@',
            ctaPath: '@',
            deviceId: '@',
            imageIndex: '@'
        },
        controller: 'ProductImageCtaController',
        template: '\
            <div class="productImageCta" ng-click="$ctrl.onClick()">\
                <product-image\
                    colour-index="{{ $ctrl.colourIndex }}"\
                    device-id="{{ $ctrl.deviceId }}"\
                    image-index="{{ $ctrl.imageIndex }}"\
                ></product-image>\
            </div>'
    });
