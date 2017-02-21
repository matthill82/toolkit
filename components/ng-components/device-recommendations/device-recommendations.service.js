angular.module('uitoolkit')
    .service('DeviceRecommendationsService', DeviceRecommendationsService);

/**
 * DeviceRecommendationsService lets rock-n-roll
 *
 * @param {function=BasketProposition} BasketProposition
 * @param {BasketService} BasketService
 * @constructor
 */
function DeviceRecommendationsService(
    BasketProposition,
    BasketService
) {
    var OFFERING_FULL = 'fullPrice';

    this.addToBasket = addToBasket;

    /**
     * Adding a proposition object to the basket
     *
     * @param proposition
     */
    function addToBasket(proposition) {
        var basket;
        var offering;
        var saving = 0;

        proposition.propositionType = 'device';

        offering = proposition.offering.find(function (offering) {
            return offering.offeringType === OFFERING_FULL;
        });

        if (offering && offering.previousUpfrontPrice && offering.upfrontPrice) {
            saving = offering.previousUpfrontPrice.net.value - offering.upfrontPrice.net.value;
        }

        // Basket is cleared when choosing a new proposition as attachments may
        // not be compatible.
        basket = BasketService.resetBasket();

        basket.addProposition(new BasketProposition(
            proposition,
            proposition.device.category1,
            offering.id,
            saving,
            1
        ));
    }

}
