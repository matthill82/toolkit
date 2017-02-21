angular
    .module('uitoolkit')
    .service('TrackingService', TrackingService);

function TrackingService($http, $q, ToastService) {


    // Private methods
    function _handleError(response) {
        if (!angular.isObject(response) || !response.data) {
            ToastService.error('Error loading tracking data ', 'An unknown error occurred.', {timeOut: 2000});
            return ($q.reject('An unknown error occurred.'));
        }

        ToastService.error('Error loading tracking data ', 'Data could not be loaded', {timeOut: 5000});
        return ($q.reject(response));
    }

    function _handleSuccess(response) {
        return ($q.resolve(response));
    }


    // Public methods
    function setTrackingData(api, dataObj) {
        if(angular.isDefined(dataObj)) {
            return $http.post(api, dataObj)
                .then(_handleSuccess, _handleError);
        }
    }

    function getTrackingData(api, username, application, trackingId) {
        if(angular.isDefined(api) && angular.isDefined(username) && angular.isDefined(application) && angular.isDefined(trackingId)) {
            return $http.get(api + username + '/pref/app/' + application + '/contentread/' + trackingId)
                .then(_handleSuccess, _handleError);
        }
    }

    function getUser(api, username) {
        if (angular.isDefined(api) && angular.isDefined(username)) {
            return $http.get(api + username)
                .then(_handleSuccess, _handleError);
        }
    }

    return {
        getTrackingData: getTrackingData,
        setTrackingData: setTrackingData,
        getUser: getUser
    }
}
