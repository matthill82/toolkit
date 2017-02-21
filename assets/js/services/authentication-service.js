angular.module('uitoolkit')
    .service('AuthenticationService', AuthenticationService);

/**
 * @param {$http} $http
 * @param {$q} $q
 * @param {ToastService} ToastService
 * @constructor
 */
function AuthenticationService($http, $q, ToastService) {
    this.getUserDetails = getUserDetails;

    function getUserDetails(profileUrl) {
        return $http({
            method: 'get',
            url: profileUrl,
            params: {
                action: 'get'
            }
        }).then(handleSuccess, handleError);
    }

    // TODO These are copy pasted in a few places.
    function handleError(response) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject(response.data) ||
            ! response.data.message
            ) {
            ToastService.error('Authentication Service Error', 'An unknown error occurred.', {timeOut: 2000});

            return( $q.reject('An unknown error occurred.') );
        }

        ToastService.error('Authentication Service Error', response.data.message, {timeOut: 5000});

        // Otherwise, use expected error message.
        return( $q.reject(response.data.message) );
    }

    function handleSuccess(response) {
        return(response.data);
    }
}
