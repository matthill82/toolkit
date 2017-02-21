/**
 * Sends specified events (with TRUE/FALSE) if attachments of specified display
 * types are found. Watches contents of the basket to record if all items of
 * type are removed.
 *
 * Configure via a map of displayType -> dsEventName
 *
 * @example
 *  <basket-sumamry
 *      ds-events-basket-content="protection::review_basket_care_plan||essentials::review_basket_essentials"
 *  ></basket-sumamry>
 */
angular
    .module('uitoolkit')
    .directive('dsEventsBasketContent', dsEventsBasketContentDirective);

/**
 * @param {BasketService} BasketService
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsEventsBasketContentDirective(BasketService, DsEventService, UtilityService) {
    return {
        link: dsEventsBasketContentLink,
        restrict: 'A'
    };

    /**
     * @param {$rootScope.Scope} scope
     * @param iElement
     * @param iAttrs
     */
    function dsEventsBasketContentLink(scope, iElement, iAttrs) {
        var basket = BasketService.getBasket();
        var config = UtilityService.aemKvMapString(iAttrs.dsEventsBasketContent);
        var count;
        var displayType;

        for (displayType in config) {
            if (config.hasOwnProperty(displayType)) {
                count = basket.findAttachmentsByDisplayType(displayType).length;

                // If the basket contains items of type we will watch to see if
                // they are all removed we can send a new FALSE event.
                if (count) {
                    (function (displayType) {
                        scope.$watch(function () {
                            return basket.findAttachmentsByDisplayType(displayType).length;
                        }, function (newVal, oldVal) {
                            if (newVal !== oldVal && !newVal) {
                                // Last item of type removed.
                                DsEventService.sendEvent(config[displayType], false);
                            }
                        });
                    }(displayType));
                }

                DsEventService.sendEvent(
                    config[displayType],
                    count > 0
                );
            }
        }
    }
}
