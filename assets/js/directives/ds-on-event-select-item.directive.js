/**
 * @example
 *  <ANY
 *      ds-on-event-select-item="nameEvent::||skuEvent::"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsOnEventSelectItem', dsOnEventSelectItemDirective);

/**
 * @param {DsEventService} DsEventService
 * @param EventEnums
 * @param {UtilityService} UtilityService
 */
function dsOnEventSelectItemDirective(DsEventService, EventEnums, UtilityService) {
    return {
        link: dsOnEventSelectItemLink,
        restrict: 'A'
    };

    function dsOnEventSelectItemLink(scope, iElement, iAttrs) {
        var config = UtilityService.aemKvMapString(iAttrs.dsOnEventSelectItem);

        scope.$on(EventEnums.ENUMS.SELECT_ITEM, function (event, data) {
            if (config.nameEvent) {
                DsEventService.sendEvent(config.nameEvent, data.name);
            }

            if (config.skuEvent) {
                DsEventService.sendEvent(config.skuEvent, data.id);
            }
        });
    }
}
