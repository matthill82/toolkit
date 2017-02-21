angular
    .module('uitoolkit')
    .controller('CustomerDeviceController', CustomerDeviceController);

function CustomerDeviceController(StateManagement, EligibleUpgradeService, UtilityService, JrdService, $log, ConfigService, $filter) {

    var $ctrl = this;
    var OFFER_TYPE_KEY = 'offerType';

    $ctrl.$onInit = $onInit;

    var DAYS_PLACEHOLDER = '{DAYS}';
    var DATE_PLACEHOLDER = '{DATE}';

    function $onInit() {
        getAccountData();
        displayUpgradeInfo(calculateEligibility());
    }

    function getAccountData() {
        $ctrl.proposition = UtilityService.getProposition(
            StateManagement.getAccountData().propositions, $ctrl.propositions);
        $ctrl.offering = $ctrl.proposition.offering[0];
        $ctrl.offeringTypeMapping = getOfferingType($ctrl.offering.offeringType);
    }

    function calculateEligibility() {
        var eligibleDate = new Date(UtilityService.getByPropertyValue(
            $ctrl.proposition.device.offers, OFFER_TYPE_KEY, 'upgrade').startDate);
        return EligibleUpgradeService.getEligibility(eligibleDate, new Date(), $ctrl.upgradeWindow);
    }

    function displayUpgradeInfo(eligibleForUpgrade) {
        var eligibilityViewData = UtilityService.getByPropertyValue($ctrl.upgradeMessages, 'type', eligibleForUpgrade.status);
        $ctrl.upgradeMessage = formatUpgradeMessage(eligibleForUpgrade, eligibilityViewData);
        $ctrl.upgradeIcon = eligibilityViewData.icon;
    }

    function formatUpgradeMessage(eligibleForUpgrade, eligibilityViewData) {
        var dateFormat = ConfigService.get('pricing').dateFormat;
        var formattedDate = $filter('date')(eligibleForUpgrade.eligibleDate, dateFormat);
        var message = eligibilityViewData.message + ' ';
        if (eligibleForUpgrade.status === EligibleUpgradeService.STATUS_WINDOW) message = message.replace(DAYS_PLACEHOLDER, eligibleForUpgrade.days);
        if (eligibleForUpgrade.status === EligibleUpgradeService.STATUS_EARLY) message = message.replace(DATE_PLACEHOLDER, formattedDate);
        return message;
    }

    function getOfferingType(offeringType) {
        try {
            var offeringTypes = UtilityService.getByPropertyValue(JrdService.get('PHONES', 'offering-types'), 'offeringType', offeringType).groupValue;
        } catch (e) {
            $log.error('offering-types is not defined within the JRD');
        }
        return offeringTypes;
    }

}
