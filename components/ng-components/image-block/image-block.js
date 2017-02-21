/**
 * @example
 *  <image-block
 *      image-src=""
 *  ></image-block>
 */
angular
    .module('uitoolkit')
    .component('imageBlock', {
        bindings: {
            imageSrc: '@'
        },
        template: '\
            <div class="imageBlock">\
                <img class="imageBlock__image" ng-src="{{ $ctrl.imageSrc | relativeUrl }}">\
            </div>'
    });
