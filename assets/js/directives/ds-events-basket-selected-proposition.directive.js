/**
 * @example
 *  <ANY
 *      ds-event-basket-selected-proposition="manufacturerEvent::||nameEvent::||priceEvent::||skuEvent::"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsEventsBasketSelectedProposition', dsEventsBasketSelectedPropositionDirective);

/**
 * @param {BasketService} BasketService
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsEventsBasketSelectedPropositionDirective(BasketService, DsEventService, UtilityService) {
    return {
        link: dsEventsBasketSelectedPropositionLink,
        restrict: 'A'
    };

    function dsEventsBasketSelectedPropositionLink(scope, iElement, iAttrs) {
        var config = UtilityService.aemKvMapString(iAttrs.dsEventsBasketSelectedProposition);
        /** @var {BasketProposition} proposition */
        var proposition = BasketService.getBasket().propositions[0];

        if (proposition) {
            if (config.manufacturerEvent) {
                DsEventService.sendEvent(config.manufacturerEvent, proposition.data.device.manufacturer);
            }

            if (config.nameEvent) {
                DsEventService.sendEvent(config.nameEvent, proposition.name);
            }

            if (config.priceEvent) {
                DsEventService.sendEvent(config.priceEvent, proposition.price);
            }

            if (config.skuEvent) {
                DsEventService.sendEvent(config.skuEvent, proposition.id);
            }
        }
    }
}
