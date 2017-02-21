angular
    .module('uitoolkit')
    .service('AccessoriesCrossSellItemService', AccessoriesCrossSellItemService);

/**
 * @param {Function=BasketAttachment} BasketAttachment
 * @param {BasketService} BasketService
 * @param {DeviceService} DeviceService
 * @constructor
 */
function AccessoriesCrossSellItemService(BasketAttachment, BasketService, DeviceService) {
    this.findById = findById;
    this.isSelected = isSelected;
    this.select = select;

    /**
     * @param {string} productId
     */
    function findById(productId) {
        return DeviceService.getProductDetailsCached(productId).then(function (results) {
            return results[0];
        });
    }

    /**
     * @param {object} product
     * @returns {boolean}
     */
    function isSelected(product) {
        return !!BasketService.getBasket().findAttachmentById(product.id.toString());
    }

    /**
     * @param {object} product
     */
    function select(product) {
        var attachment;
        var basket = BasketService.getBasket();

        attachment = basket.findAttachmentById(product.id.toString());

        if (angular.isUndefined(attachment)) {
            basket.addAttachment(new BasketAttachment(
                product
            ));
        } else {
            basket.removeAttachment(attachment);
        }
    }
}
