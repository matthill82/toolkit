/**
 * Send TRUE on SELECT_ATTACHMENT, FALSE on UNSELECT_ATTACHMENT events.
 *
 * @example
 *  <ANY
 *      ds-on-event-select-unselect-attachment="MICROSOFT Office::essentials_recommended_office_product"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsOnEventSelectUnselectAttachment', dsOnEventSelectUnselectAttachmentDirective);

/**
 * @param {DsEventService} DsEventService
 * @param {object} EventEnums
 * @param {UtilityService} UtilityService
 */
function dsOnEventSelectUnselectAttachmentDirective(DsEventService, EventEnums, UtilityService) {
    return {
        restrict: 'A',
        link: dsOnEventSelectUnselectAttachmentLink
    };

    /**
     * @param {$rootScope.Scope} scope
     * @param iElement
     * @param {object} iAttrs
     */
    function dsOnEventSelectUnselectAttachmentLink(scope, iElement, iAttrs) {
        var config = UtilityService.aemKvMapString(iAttrs.dsOnEventSelectUnselectAttachment);

        scope.$on(EventEnums.ENUMS.SELECT_ATTACHMENT, function (event, data) {
            if (angular.isDefined(config[data.filterCategory])) {
                DsEventService.sendEvent(config[data.filterCategory], true);
            }
        });

        scope.$on(EventEnums.ENUMS.UNSELECT_ATTACHMENT, function (event, data) {
            if (angular.isDefined(config[data.filterCategory])) {
                DsEventService.sendEvent(config[data.filterCategory], false);
            }
        });
    }
}
