angular
    .module('uitoolkit')
    .service('BasketService', BasketService);

/**
 * Service to manage a Basket
 *
 * This is the public API to get a Basket that is saved to the StateManagement,
 * never fetch the basket from the StateManagement directly.
 *
 * @link Basket
 * @param {function=Basket} Basket
 * @param {function=BasketAttachment} BasketAttachment
 * @param {function=BasketBundle} BasketBundle
 * @param {function=BasketProposition} BasketProposition
 * @param {StateManagement} StateManagement
 * @constructor
 */
function BasketService(Basket, BasketAttachment, BasketBundle, BasketProposition, StateManagement) {
    var basket;
    var BASKET_NAME = 'basket';

    this.getBasket = getBasket;
    this.resetBasket = resetBasket;

    /**
     * Get a Basket, attached to the service, if there is no basket a new one
     * will be created and will attempt to restore from the StateManagement
     * service.
     *
     * @returns {Basket}
     */
    function getBasket() {
        if (!basket) {
            basket = new Basket();

            _restoreFromStateManager();

            basket.addObserver(_saveBasket);
        }

        return basket;
    }

    /**
     * Reset the Basket which is managed by the service. Returns a new basket
     * instance, any old basket is detached from the service.
     *
     * @returns {Basket}
     */
    function resetBasket() {
        basket = null;

        _clearBasket();

        return getBasket();
    }

    function _clearBasket()
    {
        StateManagement.removeData(BASKET_NAME);
    }

    function _restoreFromStateManager() {
        var attachmentClass;
        var plainBasket = angular.fromJson(StateManagement.getData(BASKET_NAME));

        if (plainBasket) {
            if (plainBasket.attachments) {
                plainBasket.attachments.forEach(function (attachment) {
                    switch (attachment.type) {
                    case 'BasketAttachment':
                        attachmentClass = BasketAttachment;
                        break;

                    case 'BasketBundle':
                        attachmentClass = BasketBundle;
                        break;

                    default:
                        throw new Error('Unsupported basket attachment type.');
                    }

                    basket.addAttachment(new attachmentClass(
                        attachment.data,
                        attachment.displayType,
                        attachment.selectedOfferingId,
                        attachment.saving,
                        attachment.quantity
                    ));
                });
            }

            if (plainBasket.propositions) {
                plainBasket.propositions.forEach(function (proposition) {
                    basket.addProposition(new BasketProposition(
                        proposition.data,
                        proposition.displayType,
                        proposition.selectedOfferingId,
                        proposition.saving,
                        proposition.quantity
                    ));
                });
            }
        }
    }

    function _saveBasket(basket) {
        StateManagement.saveData(BASKET_NAME, basket.serialize());
    }
}
