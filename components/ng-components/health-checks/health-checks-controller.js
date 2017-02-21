angular
    .module('uitoolkit')
    .controller('HealthChecksController', HealthChecksController);

/**
 * @param {$rootScope.Scope} $scope
 * @constructor
 */
function HealthChecksController($scope) {
    var $ctrl = this;

    /** @var {HealthCheckEndpointController[]} */
    $ctrl.checks = [];
    $ctrl.loaded = false;

    $ctrl.addCheck = addCheck;
    $ctrl.scan = scan;

    /**
     * @param {HealthCheckEndpointController} check
     */
    function addCheck(check) {
        $ctrl.checks.push(check);

        // Now that it's known that the children have loaded it's possible to
        // ready the auto scan.
        if (!$ctrl.loaded) {
            $ctrl.loaded = true;
            $scope.$evalAsync(function () {
                scan();
            });
        }
    }

    function scan() {
        $ctrl.checks.forEach(function (endpoint) {
            endpoint.reset();
        });

        _scanCheck($ctrl.checks[0], true);
    }

    /**
     * @param {HealthCheckEndpointController} check
     * @param {boolean=false} andContinue
     * @private
     */
    function _scanCheck(check, andContinue) {
        $ctrl.scanning = true;

        check.run().finally(function () {
            if (andContinue && $ctrl.checks.indexOf(check) < $ctrl.checks.length - 1) {
                _scanCheck($ctrl.checks[$ctrl.checks.indexOf(check) + 1], andContinue);
            } else {
                $ctrl.scanning = false;
            }
        });
    }
}
