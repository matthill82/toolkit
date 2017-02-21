/**
 * @example
 *  <health-checks
 *      application-error-status-text="Application Error"
 *      button-scan-text="Rescan"
 *      header-name-text="Service Name"
 *      header-response-text="Response Code"
 *      header-response-time-text="Response Time"
 *      header-time-text="Date and Time"
 *  >
 *      [checks]
 *  </health-checks>
 */
angular
    .module('uitoolkit')
    .component('healthChecks', {
        bindings: {
            applicationErrorStatusText: '@',
            buttonScanText: '@',
            headerNameText: '@',
            headerResponseText: '@',
            headerResponseTimeText: '@',
            headerTimeText: '@'
        },
        controller: 'HealthChecksController',
        templateUrl: '/components/ng-components/health-checks/health-checks.html',
        transclude: true
    });
