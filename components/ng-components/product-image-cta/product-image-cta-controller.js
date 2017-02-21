angular
    .module('uitoolkit')
    .controller('ProductImageCtaController', ProductImageCtaController);

/**
 *
 * @param $state
 * @param {StateManagement} StateManagement
 * @constructor
 */
function ProductImageCtaController($state, StateManagement) {
    var $ctrl = this;

    $ctrl.onClick = onClick;

    function onClick() {
        StateManagement.setDevice('device', $ctrl.deviceId);
        $state.go($ctrl.ctaPath.replaceHTMLSuffix());
    }
}
