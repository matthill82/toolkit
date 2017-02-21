angular
    .module('uitoolkit')
    .factory('BasketProposition', basketPropositionFactory);

/**
 * @param {function=BasketItem} BasketItem
 * @returns {function}
 */
function basketPropositionFactory(BasketItem) {
    /**
     * @constructor
     * @extends BasketItem
     */
    function BasketProposition() {
        BasketItem.apply(this, arguments);
    }

    BasketProposition.prototype = Object.create(BasketItem.prototype);
    BasketProposition.prototype.constructor = BasketProposition;

    BasketProposition.prototype._requiredProperties = ['id', 'offering', 'propositionType'];

    return BasketProposition;
}
