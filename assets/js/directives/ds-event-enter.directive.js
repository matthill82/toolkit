/**
 * Sends specified event with the specified value when the element is created.
 *
 * There are two special values;
 * - TRUE: sends boolean TRUE
 * - TS: sends the current timestamp
 * - (No value): for empty strings and no value defaults to send the current timestamp
 *
 * @example
 *  <ANY
 *      ds-event-enter="build_pdp_accessed::TRUE||pdp_start::TS||something_else::an_arbitrary_string"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsEventEnter', dsEventEnterDirective);

/**
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsEventEnterDirective(DsEventService, UtilityService) {
    return {
        link: dsEventEnterLink,
        restrict: 'A'
    };

    function dsEventEnterLink(scope, iElement, iAttrs) {
        var config = UtilityService.aemKvMapString(iAttrs.dsEventEnter);
        var dsEvent;

        for (dsEvent in config) {
            if (config.hasOwnProperty(dsEvent)) {
                DsEventService.sendDetectEvent(dsEvent, config[dsEvent]);
            }
        }
    }
}
