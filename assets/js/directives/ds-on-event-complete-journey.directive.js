/**
 * Listens for specified event, triggers journey complete on receiving the
 * event. The event must happen in the context of this directive existing.
 *
 * Complete journey is a more complex interaction than simply sending an event
 * so it is important that it only happens when a journey is to be completed
 * and the event name which is sent to DS is not configurable.
 *
 * @example
 *  <basket-sumamry
 *      ds-on-event-complete-journey="BASKET_SUMMARY_MODAL_OPEN"
 *  ></basket-sumamry>
 */
angular
    .module('uitoolkit')
    .directive('dsOnEventCompleteJourney', dsOnEventCompleteJourneyDirective);

/**
 * @param {DsEventService} DsEventService
 */
function dsOnEventCompleteJourneyDirective(DsEventService) {
    return {
        link: dsOnEventCompleteJourney,
        restrict: 'A'
    };

    function dsOnEventCompleteJourney(scope, iElement, iAttrs) {
        scope.$on(iAttrs.dsOnEventCompleteJourney, DsEventService.completeJourney);
    }
}
