angular
    .module('uitoolkit')
    .directive('dsOnSelectEssential', dsOnSelectEssentialDirective);

/**
 * @param {DsEventService} DsEventService
 * @param EventEnums
 * @param {UtilityService} UtilityService
 */
function dsOnSelectEssentialDirective(DsEventService, EventEnums, UtilityService) {
    return {
        restrict: 'A',
        link: dsOnSelectEssentialLink
    };

    function dsOnSelectEssentialLink(scope, iElement, iAttrs) {
        var config = UtilityService.aemKvMapString(iAttrs.dsOnSelectEssential);

        scope.$on(EventEnums.ENUMS.SELECT_ATTACHMENT, function (event, data) {
            if (angular.isDefined(config[data.filterCategory])) {
                DsEventService.sendEvent(config[data.filterCategory], data.itemIndex);
            }
        });
    }
}
