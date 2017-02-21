angular
    .module('uitoolkit')
    .controller('CustomerCheckoutCtaController', CustomerCheckoutCtaController);

function CustomerCheckoutCtaController(BasketService) {
    var $ctrl = this;

    //TODO change this as more specs are available
    $ctrl.$onInit = function () {
        $ctrl.getDataFromBasket();
        $ctrl.ctaEnabled = $ctrl.propositions.length > 0;
    };

    $ctrl.getDataFromBasket = function () {
        $ctrl.basket = BasketService.getBasket();
        $ctrl.propositions = $ctrl.basket.propositions || [];
    };
}
