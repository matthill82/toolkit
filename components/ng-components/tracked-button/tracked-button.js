/**
 * @example
 *  <tracked-button
 *      tracked-button-key="2345678" // product id from AEM
 *      tracked-button-text="next"       // [String] from AEM
 *      tracked-label-text="I have read this" // [String] from AEM
 *      tracked-button-url="Next"           // product from AEM
 *      tracked-button-service-url="Next"           // product from AEM
 *  ></tracked-button>
 */
angular
    .module('uitoolkit')
    .component('trackedButton', {
        bindings: {
            labelText: '@trackedLabelText',
            trackingId: '@trackedButtonTrackingId',
            application: '@trackedButtonApplication',
            alignment: '@trackedButtonAlignment',
            buttonText: '@trackedButtonText',
            nextPageUrl: '@trackedButtonNextUrl',
            apiPostUrl: '@trackedButtonApiPostUrl',
            apiGetUrl: '@trackedButtonApiGetUrl'
        },
        controller: 'TrackedButtonController',
        templateUrl: '/components/ng-components/tracked-button/tracked-button.html'
    });
