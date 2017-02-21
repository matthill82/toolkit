/**
 * Listens for specified event(s), triggers corresponding DS event on receiving
 * the event sending TRUE and limiting to once per instance. It is important to
 * note that the listener only exists while the element is is attached to
 * exists.
 *
 * @example
 *  <ANY
 *      ds-on-events-once="INTERNAL_EVENT::ds_event||OTHER_INTERNAL_EVENT::other_ds_event"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsOnEventsOnce', dsOnEventsOnceDirective);

/**
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsOnEventsOnceDirective(DsEventService, UtilityService) {
    return {
        link: dsOnEventsOnceLink,
        restrict: 'A'
    };

    function dsOnEventsOnceLink(scope, iElement, iAttrs) {
        var config = UtilityService.aemKvMapString(iAttrs.dsOnEventsOnce);
        var event;
        var fired = {};

        for (event in config) {
            if (config.hasOwnProperty(event)) {
                fired[event] = false;
                (function (event) {
                    scope.$on(event, function () {
                        if (!fired[event]) {
                            fired[event] = true;
                            DsEventService.sendEvent(config[event], true);
                        }
                    });
                }(event));
            }
        }
    }
}
