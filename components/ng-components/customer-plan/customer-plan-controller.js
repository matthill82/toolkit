angular
    .module('uitoolkit')
    .controller('CustomerPlanController', CustomerPlanController);

function CustomerPlanController(StateManagement,
                                UtilityService,
                                JrdService,
                                $log,
                                ConfigService,
                                DeviceUsageService) {

    var $ctrl = this;
    var PROPOSITION_TYPE_KEY = 'propositionType';

    $ctrl.$onInit = $onInit;

    function $onInit() {
        getAccountData();
    }

    function getAccountData() {
        var proposition = UtilityService.getByPropertyValue(
            StateManagement.getAccountData().propositions, PROPOSITION_TYPE_KEY, $ctrl.propositions);

        if (proposition) {
            propositionExists(proposition);
        }
    }

    function propositionExists(proposition) {
        setLabels();
        $ctrl.tariff = proposition.tariff;
        $ctrl.offering = proposition.offering[0];
        $ctrl.offeringTypeMapping = getOfferingType($ctrl.offering.offeringType);
        $ctrl.planDetails = ConfigService.get('data-points');
        $ctrl.deviceDataList = getDeviceDataList();
        $ctrl.dataPerMonthLabel = $ctrl.planDetails['data'].txAllowancePerMonthLabel;
        $ctrl.featureList = getFeatureList();
    }

    function getDeviceDataList() {
        return DeviceUsageService.getDeviceDataList($ctrl.planDetails, $ctrl.tariff, ['text', 'talk']);
    }

    function getFeatureList() {
        var features = [];
        $ctrl.tariff.features.forEach(function (feature, i) {
            if (i < 2) features.push({icon: $ctrl.featuresIcon, text: feature.value});
        });
        return features;
    }

    function setLabels() {
        $ctrl.perMonthDataLabel = ConfigService.get('data-points').data.txAllowancePerMonthLabel;
        $ctrl.unlimitedDataLabel = ConfigService.get('data-points').data.txAllowanceUnlimitedText;
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
