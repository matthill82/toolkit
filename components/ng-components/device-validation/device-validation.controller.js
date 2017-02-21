angular.module('uitoolkit')
    .controller('DeviceValidationController', DeviceValidationController);


/**
 * @param {StateManagement} StateManagement
 * @constructor
 */
function DeviceValidationController(StateManagement) {
    var $ctrl = this;

    $ctrl.$onInit = function DeviceValidation$onInit() {
        // this is where the service will hook in from
        $ctrl.loadSavedUser();
    };

    // TODO What is this for?
    $ctrl.loadSavedUser = function () {
        var user = StateManagement.getUser();
        console.log(user);
    };
}
