angular
    .module('uitoolkit')
    .controller('FeaturedProductController', FeaturedProductController);

/**
 * @param {FeaturedProductService} FeaturedProductService
 * @constructor
 */
function FeaturedProductController(FeaturedProductService) {
    var $ctrl = this;

    $ctrl.$onInit =$onInit;
    $ctrl.isSelected = isSelected;
    $ctrl.select = select;

    function $onInit() {
        $ctrl.displayPrice = $ctrl.price;

        FeaturedProductService.findById($ctrl.deviceId).then(function (product) {
            $ctrl.product = product;

            $ctrl.displayPrice = $ctrl.displayPrice || $ctrl.product.offering[0].upfrontPrice.net.value;
        });
    }

    /**
     * @returns {boolean}
     */
    function isSelected() {
        return $ctrl.product ? FeaturedProductService.isSelected($ctrl.product) : false;
    }

    function select() {
        FeaturedProductService.select($ctrl.product);
    }
}
