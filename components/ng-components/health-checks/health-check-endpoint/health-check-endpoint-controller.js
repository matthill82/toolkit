angular
    .module('uitoolkit')
    .controller('HealthCheckEndpointController', HealthCheckEndpointController);

/**
 * @param {function=$http} $http
 * @param {UtilityService} UtilityService
 * @constructor
 */
function HealthCheckEndpointController($http, UtilityService) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.getResponseTimeType = getResponseTimeType;
    $ctrl.reset = reset;
    $ctrl.run = run;

    function $onInit() {
        $ctrl.HealthChecksController.addCheck($ctrl);
    }

    /**
     * @returns {string}
     */
    function getResponseTimeType() {
        if ($ctrl.status !== 200 || $ctrl.responseTime > $ctrl.thresholdRedTime) {
            return 'danger';
        } else if ($ctrl.responseTime > $ctrl.thresholdYellowTime) {
            return 'warn';
        } else if ($ctrl.responseTime > -1) {
            return 'fine';
        }

        return '';
    }

    function reset() {
        $ctrl.responseTime = null;
        $ctrl.requestTime = null;
        $ctrl.status = null;
        $ctrl.statusText = null;
    }

    function run() {
        $ctrl.requestTime =  new Date();

        return $http({
            data: $ctrl.data,
            headers: UtilityService.aemKvMapString($ctrl.headers),
            method: $ctrl.method,
            params: UtilityService.aemKvMapString($ctrl.params),
            url: $ctrl.url
        }).then(function (response) {
            $ctrl.status = response.status;
            $ctrl.statusText = response.statusText;
        }, function (response) {
            $ctrl.status = response.status;
            $ctrl.statusText = response.statusText;
        }).finally(function () {
            $ctrl.responseTime = new Date() - $ctrl.requestTime;
        });
    }
}
