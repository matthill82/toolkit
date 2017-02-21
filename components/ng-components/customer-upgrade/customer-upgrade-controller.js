angular
    .module('uitoolkit')
    .controller('CustomerUpgradeController', CustomerUpgradeController);

function CustomerUpgradeController (StateManagement, EligibleUpgradeService, UtilityService) {

    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.goToRoute = UtilityService.goToRoute;

    var OFFER_TYPE_KEY = 'offerType';

    function $onInit () {
        getAccountData();
        displayUpgradeInfo(calculateEligibility());
    }

    function getAccountData () {
        $ctrl.proposition = UtilityService.getProposition(
            StateManagement.getAccountData().propositions, $ctrl.propositions);
    }

    function calculateEligibility () {
        var eligibleDate = new Date(UtilityService.getByPropertyValue(
            $ctrl.proposition.tariff.offers, OFFER_TYPE_KEY, 'upgrade').startDate);
        return EligibleUpgradeService.getEligibility(eligibleDate, new Date(), $ctrl.upgradeWindow);
    }

    function displayUpgradeInfo (eligibleForUpgrade) {
        var consolidateStatuses = eligibleForUpgrade.status === 'window' ? 'early' : eligibleForUpgrade.status;
        $ctrl.upgradeInfo = UtilityService.getByPropertyValue($ctrl.upgradeMessages, 'type', consolidateStatuses);
    }

}
