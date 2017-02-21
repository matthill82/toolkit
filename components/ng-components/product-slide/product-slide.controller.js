angular
    .module('uitoolkit')
    .controller('ProductSlideController', ProductSlideController);

/**
 * @param {$rootScope.Scope} $scope
 * @param $state
 * @param $timeout
 * @param $window
 * @param {function=BasketAttachment} BasketAttachment
 * @param {BasketService} BasketService
 * @param {object} EventEnums
 * @param {StateManagement} StateManagement
 * @constructor
 */
function ProductSlideController(
    $scope,
    $state,
    $timeout,
    $window,
    BasketAttachment,
    BasketService,
    EventEnums,
    StateManagement
) {
    var $ctrl = this;
    var PAGE_TYPE_DEAL = 'deals';
    var PAGE_TYPE_SKU = 'sku-mapper';
    var OFFERINGTYPE = 'fullPrice';
    var KEY_DEVICE = $window.ENUMS.DEVICE_KEYS.DEVICE;//'device';

    $ctrl.broadcastProduct = broadcastProduct;
    $ctrl.selectProduct = selectProduct;
    $ctrl.isProductSelected = isProductSelected;

    /**
     * @param {object} product
     */
    function broadcastProduct(product) {
        $timeout(function () {
            $scope.$broadcast(EventEnums.ENUMS.SELECTED_DEVICE, product.device);
            if (angular.isDefined(product.offering)) {
                $scope.$broadcast(EventEnums.ENUMS.PRODUCT_OFFERINGS, product.offering[0]);
            }
        }, 0);
    }

    /**
     * @param {object} product
     * @param {string} pageType
     * @param {string} link
     */
    function selectProduct(product, pageType, link) {
        $scope.$root.$broadcast(EventEnums.ENUMS.SELECT_ITEM, product);

        if (pageType.indexOf(PAGE_TYPE_DEAL) > -1) {
            StateManagement.setDevice(KEY_DEVICE, product.id);

            link = link.replaceHTMLSuffix();
            $state.go(link);
        } else if (pageType.indexOf(PAGE_TYPE_SKU) > -1) {
            _selectProductToggleBasket(product);
        }
    }

    /**
     * @param {string} productId
     * @returns {boolean}
     */
    function isProductSelected(productId) {
        return !!BasketService.getBasket().findAttachmentById(productId.toString());
    }

    /**
     * @param {object} product
     * @param {string} displayType
     * @private
     */
    function _constructBasketAttachment(product, displayType) {
        var offering;
        var saving = 0;

        offering = product.offering.find(function (offering) {
            return offering.offeringType === OFFERINGTYPE;
        });

        if (offering && offering.previousUpfrontPrice && offering.upfrontPrice) {
            saving = offering.previousUpfrontPrice.net.value - offering.upfrontPrice.net.value;
        }

        return new BasketAttachment(
            product,
            displayType,
            offering.id,
            saving,
            1
        );
    }

    /**
     * @param {object} product
     * @private
     */
    function _selectProductToggleBasket(product) {
        var attachment;
        var basket = BasketService.getBasket();

        attachment = basket.findAttachmentById(product.id.toString());

        if (angular.isUndefined(attachment)) {
            basket.addAttachment(_constructBasketAttachment(product, $scope.displayType));
        } else {
            basket.removeAttachment(attachment);
        }
    }
}
