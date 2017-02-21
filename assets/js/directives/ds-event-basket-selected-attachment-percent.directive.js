/**
 * Watches basket to see if attachments of displayType are added or removed.
 *
 * Reports what percentage of a set of items of a specified displayType and
 * length have been added to the basket.
 *
 * Ensure this is only used per display type once on the page otherwise it will
 * duplicate the events.
 *
 * Percent is output as a whole number from 0 to 100.
 *
 * It is expected that this would be placed on the page where the items are
 * added however it might also go on the basket page or anywhere else where the
 * items may be removed.
 *
 * @example
 *  <ANY
 *      ds-event-basket-selected-attachment-percent="totalItems::2||displayType::e-learning||percentEvent::set_up_elearning_product_basket_percentage||selectedEvent::set_up_elearning_product_selected"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsEventBasketSelectedAttachmentPercent', dsEventBasketSelectedAttachmentPercentDirective);

/**
 * @param {BasketService} BasketService
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsEventBasketSelectedAttachmentPercentDirective(BasketService, DsEventService, UtilityService) {
    return {
        link: dsEventBasketSelectedAttachmentPercentLink,
        restrict: 'A'
    };

    function dsEventBasketSelectedAttachmentPercentLink(scope, iElement, iAttrs) {
        var basket = BasketService.getBasket();
        var config = UtilityService.aemKvMapString(iAttrs.dsEventBasketSelectedAttachmentPercent);

        scope.$watch(function () {
            return basket.findAttachmentsByDisplayType(config.displayType).length;
        }, function (newVal, oldVal) {
            // Note, only want to record changes (adds/removes) and not initial
            // state. In DS initial state is 0 and FALSE.
            if (newVal !== oldVal) {
                DsEventService.sendEvent(config.percentEvent, Math.round(newVal * (100 / config.totalItems)));
                DsEventService.sendEvent(config.selectedEvent, newVal > 0);
            }
        });
    }
}
