angular
    .module('uitoolkit')
    .controller('CustomerInfoBarController', CustomerInfoBarController);

function CustomerInfoBarController(StateManagement, UtilityService) {
    var $ctrl = this;
    $ctrl.$onInit = $onInit;

    function $onInit() {
        getDataFromAccount();
    }

    function getDataFromAccount() {
        if (angular.isObject(StateManagement.getAccountData())) {
            $ctrl.account = StateManagement.getAccountData();
            $ctrl.mobileNumber = UtilityService.getByPropertyValue(
                $ctrl.account.preferences.communication,
                'preferenceType',
                'mobile'
            ).preferenceValue;
        }
    }

}

