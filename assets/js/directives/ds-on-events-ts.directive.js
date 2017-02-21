/**
 * Listens for specified event(s), triggers corresponding DS event on receiving
 * the event and sending the current time stamp. It is important to note that
 * the listener only exists while the element is is attached to exists.
 *
 * @example
 *  <ANY
 *      ds-on-events-ts="INTERNAL_EVENT::ds_event||OTHER_INTERNAL_EVENT::other_ds_event"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsOnEventsTs', dsOnEventsTsDirective);

/**
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsOnEventsTsDirective(DsEventService, UtilityService) {
    return {
        link: dsOnEventsTsLink,
        restrict: 'A'
    };

    function dsOnEventsTsLink(scope, iElement, iAttrs) {
        var config = UtilityService.aemKvMapString(iAttrs.dsOnEventsTs);
        var event;

        for (event in config) {
            if (config.hasOwnProperty(event)) {
                scope.$on(event, DsEventService.sendTimeEvent(config[event]));
            }
        }
    }
}
