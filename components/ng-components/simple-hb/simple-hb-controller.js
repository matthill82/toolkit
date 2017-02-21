angular
    .module('uitoolkit')
    .controller('SimpleHbController', SimpleHbController);

/**
 * @param $filter
 * @param {$rootScope.Scope} $scope
 * @param $state
 * @param $timeout
 * @param {UtilityService} UtilityService
 * @param {hbNodeTemplate} hbNodeTemplate
 */
function SimpleHbController($filter, $scope, $state, $timeout, UtilityService, hbNodeTemplate) {
    var $ctrl = this;
    var relativeUrl = $filter('relativeUrl');

    $ctrl.show = true;
    $ctrl.testMode = false;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        if ($ctrl.doneRedirectPath) {
            $scope.$on('hbFlowDone', function () {
                $state.go($ctrl.doneRedirectPath.replaceHTMLSuffix());
            });
        }
    }

    UtilityService
        .aemMapListValuesString($ctrl.templateMapping, ['format', 'path'])
        .forEach(function (template) {
            hbNodeTemplate.addTemplate(relativeUrl(template.path), 'object', template.format);
        });

    $ctrl.toggleTestMode = function () {
        $ctrl.testMode = !$ctrl.testMode;
        $ctrl.show = false;

        $timeout(function () {
            $ctrl.show = true;
        }, 1);
    };
}
