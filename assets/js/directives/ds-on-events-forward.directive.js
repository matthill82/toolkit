/**
 * Forward event data directly to DS.
 *
 * @example
 *  <ANY
 *      ds-on-events-forward="SPECS_SLIDER_RECOMMENDATION_COUNT::recommendations_recommended_best_matches_count"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsOnEventsForward', dsOnEventsForwardDirective);

/**
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsOnEventsForwardDirective(DsEventService, UtilityService) {
    return {
        link: dsOnEventsForwardLink,
        restrict: 'A'
    };

    function dsOnEventsForwardLink(scope, iElement, iAttrs) {
        var config = UtilityService.aemKvMapString(iAttrs.dsOnEventsForward);
        var eventName;

        for (eventName in config) {
            if (config.hasOwnProperty(eventName)) {
                (function (eventName) {
                    scope.$on(eventName, function (event, data) {
                        DsEventService.sendEvent(config[eventName], data);
                    });
                }(eventName));
            }
        }

    }
}
