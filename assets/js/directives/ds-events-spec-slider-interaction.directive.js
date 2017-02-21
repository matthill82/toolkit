/**
 * @example
 *  <specs-slider-buttons-group
 *      ds-events-spec-slider-interaction="selectEvent::spec_thing_selected||valueEvent::spen_thing_value"
 *  ></specs-slider-buttons-group>
 */
angular
    .module('uitoolkit')
    .directive('dsEventsSpecSliderInteraction', dsEventsSpecSliderInteractionDirective);

/**
 * @param {DsEventService} DsEventService
 * @param {UtilityService} UtilityService
 */
function dsEventsSpecSliderInteractionDirective(DsEventService, UtilityService) {
    return {
        link: dsEventsSpecSliderInteractionLink,
        restrict: 'A'
    };

    function dsEventsSpecSliderInteractionLink(scope, iElement, iAttrs) {
        var config = UtilityService.aemKvMapString(iAttrs.dsEventsSpecSliderInteraction);

        scope.$watch(function () {
            return scope.$parent.selections &&
                scope.$parent.selections[scope.featurePointMapping[0]] &&
                scope.$parent.selections[scope.featurePointMapping[0]][scope.featurePointMapping[1]]
                ? scope.$parent.selections[scope.featurePointMapping[0]][scope.featurePointMapping[1]].length
                : 0;
        }, function (newVal, oldVal) {
            if (newVal !== oldVal) {
                if (config.selectEvent) {
                    DsEventService.sendEvent(config.selectEvent, newVal > 0);
                }

                if (config.valueEvent) {
                    DsEventService.sendEvent(
                        config.valueEvent,
                        newVal
                            ? scope.$parent.selections[scope.featurePointMapping[0]][scope.featurePointMapping[1]]
                                .sort()
                                .join('|')
                            : ''
                    );
                }

            }
        });
    }
}
