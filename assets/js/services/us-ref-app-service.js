angular.module('uitoolkit')
    .service('USRefAppService', USRefAppService);

function USRefAppService($http, $q) {

    var getRefAppData = {};

    Object.defineProperties(getRefAppData, {
        // This code is incomplete and non functional. I expect it wasn't
        // supposed to have made its way into the code base
        // getAppData: {
        //     value: findTheData()
        // },
        // setAppData: {
        //     value: $http.post(url).then(fn),
        //     writable: true
        // },
        // findTheData: {
        //     value: function (url) {
        //         $http.get(url).then(function (response) {
        //             var deferred = $q.defer();
        //             if (response) {
        //                 data = response;
        //                 return deferred.promise;
        //             } else {
        //                 return $q.reject('value is not satisfied');
        //             }
        //         }, function (error) {
        //             console.log('My first promise failed', error);
        //             throw new Error('there is no data');
        //         })
        //     }
        // }
    });

    return getRefAppData;
}
