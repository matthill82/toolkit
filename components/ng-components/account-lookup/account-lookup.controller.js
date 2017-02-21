angular.module('uitoolkit')
    .controller('AccountLookupController', AccountLookupController);


/**
 * @param {StateManagement} StateManagement
 * @constructor
 */
function AccountLookupController(StateManagement) {
    var $ctrl = this;

    $ctrl.$onInit = function AccountLookUp$onInit() {
        // this is where the service will hook in from
        $ctrl.loadSavedUser();
    };

    $ctrl.loadSavedUser = function() {
        var user = StateManagement.getUser();
        console.log(user);
    }
}
