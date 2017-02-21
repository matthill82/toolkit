/**
 * Sends specified events with watched figures.
 *
 * @example
 *  <basket-sumamry
 *      ds-events-basket-review="countEvent::review_basket_item_count||countAttachmentsEvent::review_basket_attached_product_count||savingEvent::review_basket_savings||totalEvent::review_basket_price"
 *  ></basket-sumamry>
 */
angular
    .module('uitoolkit')
    .directive('dsEventsBasketReview', dsEventsBasketReviewDirective);

/**
 * @param {BasketService} BasketService
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsEventsBasketReviewDirective(BasketService, DsEventService, UtilityService) {
    return {
        link: dsEventsBasketReviewLink,
        restrict: 'A'
    };

    /**
     * @param {$rootScope.Scope} scope
     * @param iElement
     * @param iAttrs
     */
    function dsEventsBasketReviewLink(scope, iElement, iAttrs) {
        var basket = BasketService.getBasket();
        var config = UtilityService.aemKvMapString(iAttrs.dsEventsBasketReview);
        var initialEvents = {
            count: true,
            countAttachments: true,
            total: true,
            saving: true
        };

        if (config.countEvent) {
            scope.$watch(function () {
                return basket.propositions.length + basket.attachments.length;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal || initialEvents.count) {
                    initialEvents.count = false;
                    DsEventService.sendEvent(config.countEvent, newVal);
                }
            });
        }

        if (config.countAttachmentsEvent) {
            scope.$watch(function () {
                return basket.attachments.length;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal || initialEvents.countAttachments) {
                    initialEvents.countAttachments = false;
                    DsEventService.sendEvent(config.countAttachmentsEvent, newVal);
                }
            });
        }

        if (config.totalEvent) {
            scope.$watch(function () {
                return basket.total;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal || initialEvents.total) {
                    initialEvents.total = false;
                    DsEventService.sendEvent(config.totalEvent, newVal);
                }
            });
        }

        if (config.savingEvent) {
            scope.$watch(function () {
                return basket.saving;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal || initialEvents.saving) {
                    initialEvents.saving = false;
                    DsEventService.sendEvent(config.savingEvent, newVal);
                }
            });
        }
    }
}
