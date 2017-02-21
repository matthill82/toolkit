/**
 * Sends specified event with the specified value when the element is
 * destroyed.
 *
 * There are two special values;
 * - TRUE: sends boolean TRUE
 * - TS: sends the current timestamp
 * - (No value): for empty strings and no value defaults to send the current timestamp
 *
 * @example
 *  <ANY
 *      ds-event-exit="welcome_end"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsEventExit', dsEventExitDirective);

/**
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsEventExitDirective(DsEventService, UtilityService) {
    return {
        bindToController: {
            dsEventExit: '@'
        },
        controllerAs: '$ctrl',
        controller: function () {
            var $ctrl = this;

            this.$onDestroy = function () {
                var config = UtilityService.aemKvMapString($ctrl.dsEventExit);
                var dsEvent;

                for (dsEvent in config) {
                    if (config.hasOwnProperty(dsEvent)) {
                        DsEventService.sendDetectEvent(dsEvent, config[dsEvent]);
                    }
                }
            };
        },
        restrict: 'A'
    };
}
