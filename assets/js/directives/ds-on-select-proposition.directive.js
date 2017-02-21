/**
 * These events are too complicated to be easily configurable through AEM.
 */
angular
    .module('uitoolkit')
    .directive('dsOnSelectProposition', dsOnSelectPropositionDirective);

/**
 * @param {DsEventService} DsEventService
 * @param EventEnums
 */
function dsOnSelectPropositionDirective(DsEventService, EventEnums) {
    return {
        link: dsOnSelectPropositionLink,
        restrict: 'A'
    };

    function dsOnSelectPropositionLink(scope) {
        scope.$on(EventEnums.ENUMS.SELECT_PROPOSITION, function (event, data) {
            if (data.bracket > 1) {
                // Upsell chosen
                // Upsell 1 is bracket 2, while 2 is bracket 3.
                DsEventService.sendEvents({
                    recommendations_upsell_product_position: data.bracket,
                    recommendations_upsell_product_sku: data.proposition.id,
                    recommendations_upsell_product_price: data.proposition.offering[0].upfrontPrice.net.value,
                    recommendations_upsell_product_brand: data.proposition.device.manufacturer,
                    recommendations_upsell_product_description: data.proposition.description,
                    recommendations_best_match_position: data.bracket
                });
            } else if (data.itemIndex > 0) {
                // Best match other than the first selected (does not apply to deal/search journey)
                DsEventService.sendEvents({
                    recommendations_alternate_product_sku: data.proposition.id,
                    recommendations_best_match_position: 1
                });
            } else {
                // Best match chosen (any journey)
                DsEventService.sendEvents({
                    recommendations_best_match_chosen: true,
                    recommendations_best_match_position: 0,
                    recommendations_chosen_product_sku: data.proposition.id
                });
            }
        });
    }
}
