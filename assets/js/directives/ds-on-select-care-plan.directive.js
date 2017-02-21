angular
    .module('uitoolkit')
    .directive('dsOnSelectCarePlan', dsOnSelectCarePlanDirective);

/**
 * @param {DsEventService} DsEventService
 * @param EventEnums
 */
function dsOnSelectCarePlanDirective(DsEventService, EventEnums) {
    return {
        link: dsOnSelectCarePlanLink,
        restrict: 'A'
    };

    function dsOnSelectCarePlanLink(scope) {
        scope.$on(EventEnums.ENUMS.SELECT_ATTACHMENT, function (event, data) {
            if (data.itemIndex === 0) {
                DsEventService.sendEvent('protection_default_plan_selected', true);
            }

            DsEventService.sendEvent('protection_care_plan', data.attachment.name);
        });
    }
}
