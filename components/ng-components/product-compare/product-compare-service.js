angular
    .module('uitoolkit')
    .service('ProductCompareService', ProductCompareService);

/**
 * @param {DeviceCompareService} DeviceCompareService
 * @constructor
 */
function ProductCompareService(DeviceCompareService) {
    var _products;

    this.load = load;
    this.removeCompare = removeCompare;

    /**
     * @returns {Promise<Array>}
     */
    function load() {
        return DeviceCompareService.getCompareDevices().then(function (products) {
            _products = products;

            return _products;
        });
    }

    /**
     * @param {object} product
     * @param slick
     */
    function removeCompare(product, slick) {
        var index = -1;

        // $slides is a jQuery collection so we can't just use indexOf().
        // Ignored for coverage till a testable, non-jquery scroller is
        // implemented.
        /* istanbul ignore next */
        slick && slick.slick('getSlick').$slides.each(function (thisindex) {
            if (angular.element(this).controller('productItem').product === product) {
                index = thisindex;
            }
        });

        /* istanbul ignore next */
        if (index > -1) {
            slick.slick('slickRemove', index);
        }

        DeviceCompareService.removeCompare(product.device.id);

        // If we remove an item from the array as below it currently causes
        // slick to flicker wildly, likely as its redrawn and may not be
        // possible to fix it. Not sure if this can be fixed. Slick should be
        // replaced with a pure angular component either way.
        // index = _products.indexOf(product);
        //
        // if (index > -1) {
        //     _products.splice(index, 1);
        // }
    }
}
