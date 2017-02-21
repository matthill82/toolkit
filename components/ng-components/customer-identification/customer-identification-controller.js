angular
    .module('uitoolkit')
    .controller('CustomerIdentificationController', CustomerIdentificationController);

function CustomerIdentificationController (StateManagement, UtilityService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
        getDataFromAccount();
    };

    function getDataFromAccount () {
        $ctrl.account = StateManagement.getAccountData();
        $ctrl.mobileNumber = UtilityService.getByPropertyValue(
            $ctrl.account.preferences.communication,
            'preferenceType',
            'mobile'
        ).preferenceValue;

    }

}

