/**
 * Watches basket to see if attachments of displayType are added or removed.
 *
 * Reports a specified percentage for the specified item ID. This must only be
 * used for items where only one of the specified displayType is allowed in the
 * basket at any one time.
 *
 * Supplied SKUs must match the used SKUs exactly.
 *
 * Ensure this is only used per display type once on the page otherwise it will
 * duplicate the events.
 *
 * Percent is output as supplied, though converted to an integer.
 *
 * It is expected that this would be placed on the page where the items are
 * added however it might also go on the basket page or anywhere else where the
 * items may be removed.
 *
 * @example
 *  <ANY
 *      ds-event-basket-selected-attachment-percent-map="displayType::setup||SKU123::33||SKU456::67||SKU789::100||percentEvent::set_up_product_basket_percentage||selectedEvent::set_up_product_selected"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsEventBasketSelectedAttachmentPercentMap', dsEventBasketSelectedAttachmentPercentMapDirective);

/**
 * @param {BasketService} BasketService
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsEventBasketSelectedAttachmentPercentMapDirective(BasketService, DsEventService, UtilityService) {
    return {
        link: dsEventBasketSelectedAttachmentPercentMapLink,
        restrict: 'A'
    };

    function dsEventBasketSelectedAttachmentPercentMapLink(scope, iElement, iAttrs) {
        var basket = BasketService.getBasket();
        var config = UtilityService.aemKvMapString(iAttrs.dsEventBasketSelectedAttachmentPercentMap);

        scope.$watch(function () {
            var attachments = basket.findAttachmentsByDisplayType(config.displayType);

            return attachments.length ? attachments[0].id : null;
        }, function (newVal, oldVal) {
            // Note, only want to record changes (adds/removes) and not initial
            // state. In DS initial state is 0 and FALSE.
            if (newVal !== oldVal) {
                DsEventService.sendEvent(config.percentEvent, newVal ? parseInt(config[newVal]) : 0);
                DsEventService.sendEvent(config.selectedEvent, !!newVal);
            }
        });
    }
}
