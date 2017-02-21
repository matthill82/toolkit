angular.module('uitoolkit').controller('BillingDetailsController', BillingDetailsController);

function BillingDetailsController(StateManagement) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
        $ctrl.getDataFromAccount();
    };

    $ctrl.getDataFromAccount = function () {
        $ctrl.account = StateManagement.getAccountData().customer;
    };
}
