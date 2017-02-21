angular.module('uitoolkit').controller('ContractReviewController', ContractReviewController);

function ContractReviewController(BasketService) {
    var $ctrl = this;

    //TODO change this as more specs are available
    $ctrl.$onInit = function () {
        $ctrl.getDataFromBasket();
        $ctrl.contractTypes = $ctrl.propositions.length > 0 ? ['phone', 'plan'] : [];
    };

    $ctrl.getDataFromBasket = function () {
        $ctrl.basket = BasketService.getBasket();
        $ctrl.propositions = $ctrl.basket.propositions || [];
    };
}
