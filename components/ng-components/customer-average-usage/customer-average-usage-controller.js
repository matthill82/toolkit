angular
    .module('uitoolkit')
    .controller('CustomerAverageUsageController', CustomerAverageUsageController);

function CustomerAverageUsageController(StateManagement, UtilityService, AverageUsageService, ConfigService) {

    var $ctrl = this;
    var PROPOSITION_TYPE_KEY = 'propositionType';

    $ctrl.$onInit = $onInit;

    function $onInit() {
        $ctrl.offering = getAccountData(StateManagement.getAccountData(), $ctrl.propositions);
        if ($ctrl.offering) offeringExists();
    }

    function offeringExists() {
        var planDetails = ConfigService.get('data-points');
        $ctrl.averageUsageList = AverageUsageService.getAverageUsage(
            $ctrl.offering.usageHistory,
            $ctrl.averageUsageWindow,
            planDetails);
    }

    function getAccountData(accountData, propositions) {
        var offering = UtilityService.getByPropertyValue(accountData.propositions, PROPOSITION_TYPE_KEY, propositions);
        return offering && offering.offering ? offering.offering[0] : undefined;
    }

}
