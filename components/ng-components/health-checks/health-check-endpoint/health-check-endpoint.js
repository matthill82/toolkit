/**
 * Single endpoint health check.
 *
 * Must be nested inside a <health-checks>.
 *
 * @example
 *  <health-checks>
 *      <health-check-endpoint
 *          data='{json: true}'
 *          headers="header::value||heder::value"
 *          method="GET"
 *          name="Test Endpoint"
 *          params="param::value"
 *          threshold-red-time="500"
 *          threshold-yellow-time="200"
 *          url="http://example.com"
 *      ></health-check-endpoint>
 *  </health-checks>
 */
angular
    .module('uitoolkit')
    .component('healthCheckEndpoint', {
        bindings: {
            data: '@',
            headers: '@',
            method: '@',
            name: '@',
            params: '@',
            thresholdRedTime: '@',
            thresholdYellowTime: '@',
            url: '@'
        },
        controller: 'HealthCheckEndpointController',
        require: {
            HealthChecksController: '^healthChecks'
        },
        templateUrl: '/components/ng-components/health-checks/health-check-endpoint/health-check-endpoint.html'
    });
