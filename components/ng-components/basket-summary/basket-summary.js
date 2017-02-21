/**
 * @example
 *  <basket-summary
 *      bs-checkout-button-text="Checkout"
 *      bs-modal-close-icon=""
 *      bs-modal-content-url=""
 *      bs-modal-title-text=""
 *      bs-savings-text="Savings"
 *      bs-title-text="Review"
 *      bs-total-text="Total"
 *      bs-basket-type="summary || summary-advanced"
 *  ></basket-summary>
 */
angular.module('uitoolkit')
    .component('basketSummary', {
        bindings: {
            checkoutButtonText: '@bsCheckoutButtonText',
            modalCloseIcon: '@bsModalCloseIcon',
            modalContentUrl: '@bsModalContentUrl',
            modalSize: '@bsModalSize',
            modalTitleText: '@bsModalTitleText',
            savingsText: '@bsSavingsText',
            titleText: '@bsTitleText',
            totalText: '@bsTotalText',
            advanced: '@bsBasketAdvanced',
            advancedTitle: '@bsBasketAdvancedTitle',
            advancedButtonText: '@bsBasketAdvancedButtonText',
            advancedButtonPath: '@bsBasketAdvancedButtonPath',
            advancedExtraLabel: '@bsBasketAdvancedExtraLabel'
        },
        controller: 'BasketSummaryController',
        template: '<div ng-include="$ctrl.templateUrl"></div>'
    });
