/**
 * @example
 *  <basket-advanced
 *      ba-remove-icon="cwsicon cwsicon-circle-close-thick"
 *      ba-code-text="Product code:"
 *      ba-monthly-payment-text="Monthly cost"
 *      ba-order-config="protection||sku-mapper||deals||essentials||setup||e-learning"
 *  ></basket-advanced>
 */
angular.module('uitoolkit')
    .component('basketAdvanced', {
        bindings: {
            removeIcon: '@baRemoveIcon',
            codeText: '@baCodeText',
            monthlyPaymentText: '@baMonthlyPaymentText',
            orderConfig: '@baOrderConfig'
        },
        controller: function BasketAdvancedController(BasketService) {
            var $ctrl = this;
            var order;

            $ctrl.$onInit = BasketAdvancedController$onInit;
            $ctrl.orderFunc = orderFunc;

            function BasketAdvancedController$onInit() {
                order = $ctrl.orderConfig && $ctrl.orderConfig.split('||');

                $ctrl.basket = BasketService.getBasket();
                $ctrl.removeAttachment = $ctrl.basket.removeAttachment.bind($ctrl.basket);
            }

            function orderFunc(attachment) {
                return order.indexOf(attachment.displayType) > -1 ? order.indexOf(attachment.displayType) : Infinity;
            }
        },
        templateUrl: '/components/ng-components/basket-advanced/basket-advanced.html'
    });
