/**
 * Sets the start of a journey
 *
 * @todo This should be renamed to "journey-type", existing "journey-type" usage should be something more like "device-category"
 * @example
 *  <ANY
 *      journey-start="THING"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('journeyStart', journeyStart);

/**
 * @param {DsEventService} DsEventService
 * @param {StateManagement} StateManagement
 */
function journeyStart(DsEventService, StateManagement) {
    return {
        link: journeyStartLink,
        restrict: 'A'
    };

    function journeyStartLink(scope, iElement, iAttrs) {
        StateManagement.journeySetStart(iAttrs.journeyStart);

        // Note, while this directive is called "journeyStart" in the context
        // of DS this is simply setting the journey type. Journey start means
        // something different to DS.
        DsEventService.setJourneyType(iAttrs.journeyStart);
    }
}
