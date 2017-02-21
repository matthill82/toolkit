angular
    .module('uitoolkit')
    .controller('TrackedButtonController', TrackedButtonController);

/**
 * @param {$state} $state
 * @param {StateManagement} StateManagement
 * @param {TrackedButtonFactory} TrackedButtonFactory
 * @param {TrackingService} TrackingService
 * @constructor
 */
function TrackedButtonController($state, StateManagement, TrackedButtonFactory, TrackingService) {

    var $ctrl = this;
    var username = angular.fromJson(StateManagement.getUser());
    var firstName = getFormattedName(username);

    $ctrl.$onInit = $onInit;
    $ctrl.$onDestroy = $onDestroy;
    $ctrl.setTrackingData = setTrackingData;

    function $onInit() {
        retrieveTrackingData();
    }

    function $onDestroy() {
        $ctrl.status = 'not-checked'
    }

    function getFormattedName(username) {
        if (angular.isObject(username) && username !== null) {
            return username.meta.formattedName;
        }
    }

    function retrieveTrackingData() {
        TrackingService.getTrackingData($ctrl.apiGetUrl, firstName, $ctrl.application, $ctrl.trackingId).then(function (response) {
            if (response.data.status === true && $ctrl.nextPageUrl) {
                $state.go($ctrl.nextPageUrl.replaceHTMLSuffix());
            }
        });
    }

    function setTrackingData() {
        var buttonData = angular.toJson(new TrackedButtonFactory(firstName, $ctrl.application, $ctrl.trackingId));
        console.log(buttonData);
        TrackingService.setTrackingData($ctrl.apiPostUrl, buttonData).then(function (response) {
            if (response.data && $ctrl.nextPageUrl) {
                $state.go($ctrl.nextPageUrl.replaceHTMLSuffix());
            }
        });
    }
}
