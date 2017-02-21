angular.module('uitoolkit')
    .service('PlanService', PlanService);

/**
 *
 * @param $http
 * @param $q
 * @param {DeviceService} DeviceService
 * @param {ToastService} ToastService
 * @returns {{calculateTotalDataUsagePerMonth: calculateTotalDataUsagePerMonth, totalDataUsagePerMonth: totalDataUsagePerMonth, findRecommendedPlans: findRecommendedPlans, getAllPlans: getAllPlans, getPlansByCarrier: getPlansByCarrier}}
 * @constructor
 */
function PlanService($http, $q, DeviceService, ToastService) {

        //----
        // Just a stub service - should be replaced with real code that calls honeyBee Product Search Micro Service
        //-----
        var SEPARATOR = '||';
        var sliderValues = [];
        var totalDataUsage = 0;
        var c;

        // Return public API.
        return ({
            calculateTotalDataUsagePerMonth: calculateTotalDataUsagePerMonth,
            totalDataUsagePerMonth: totalDataUsagePerMonth,
            findRecommendedPlans: findRecommendedPlans,
            getAllPlans: getAllPlans,
            getPlansByCarrier: getPlansByCarrier
        });

        // Legacy function for plans-recommendations/tabbed-plans-recommendations
        function findRecommendedPlans() {
            var $recommendedplans = $('div.recommendedplans-js');
            var dataurl = $recommendedplans.attr('dataurl') || '';
            var response = $http({
                method: 'get',
                url: dataurl,
                params: {
                    action: 'get'
                }
            });

            return (response.then(_handleSuccess, _handleError));
        }

        //TODO: Move logic that combines plan-service and device service data together
        function getAllPlans(dataUrl) {
            _getAEMRecommendedPlans(dataUrl).then(
                function(response) {

                }
            )
        }

        function getPlansByCarrier(dataUrl) {
            _getAEMRecommendedPlans(dataUrl).then(
                function(response) {

                }
            )
        }
        //TODO: END
        function calculateTotalDataUsagePerMonth(value, id) {
            if (sliderValues.length === 0) {
                sliderValues.push(id + SEPARATOR + value);
            } else {
                for (c = 0; c < sliderValues.length; c++) {

                    if (sliderValues[c].indexOf(id) === -1) {
                        sliderValues.push(id + SEPARATOR + value);
                    } else {
                        sliderValues.splice(c, 1);
                        sliderValues.push(id + SEPARATOR + value);
                    }
                }
            }
        }

        function totalDataUsagePerMonth() {
            totalDataUsage = 0;
            for (c = 0; c < sliderValues.length; c++) {
                var sliderValue = sliderValues[c].split(SEPARATOR);

                if (sliderValue.length === 2) {
                    var usageNum = parseFloat(sliderValue[1]);
                    totalDataUsage = totalDataUsage + usageNum;
                }
            }
            return totalDataUsage;
        }

        // ---
        // PRIVATE METHODS.
        // ---
        function _handleError(response) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                !angular.isObject(response.data) || !response.data.message
            ) {
                ToastService.error('Plan Service Error', 'An unknown error occurred.', {timeOut: 2000});

                return ( $q.reject('An unknown error occurred.') );
            }
            // Otherwise, use expected error message.
            ToastService.error('Plan Service Error', response.data.message, {timeOut: 2000});

            return ( $q.reject(response.data.message) );
        }

        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function _handleSuccess(response) {
            return (response.data);
        }

        // Copy of above function for private use within service
        function _getAEMRecommendedPlans(dataUrl) {
            var response = $http({
                method: 'get',
                url: dataUrl,
                params: {
                    action: 'get'
                }
            });
            return (response.then(_handleSuccess, _handleError));
        }

        function _loadProductData(tariffCodes, deviceId, deviceColour, tariffsContent) {
            DeviceService.getUniquePlansForDevice(tariffCodes, deviceId, deviceColour)
                .then(
                    function (response) {
                        return (response.then(_handleSuccess, _handleError));
                    }
                );
        }
}
