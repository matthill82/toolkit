angular
    .module('uitoolkit')
    .controller('RecommendedPlanController', RecommendedPlanController);

function RecommendedPlanController (
    $state,
    $filter,
    $window,
    StateManagement
) {
    var $ctrl = this;

    var GRAPH_MAX_NUMBER = 6;
    var UNITS_OF_MB_IN_GB = 1024;
    var DATA_MB = $window.ENUMS.DEVICE_KEYS.MB;//'MB';
    var DATA_GB = $window.ENUMS.DEVICE_KEYS.GB;//'GB';
    var PLAN = $window.ENUMS.DEVICE_KEYS.PLAN;//'plan';

    $ctrl.getRewardTier = getRewardTier;
    $ctrl.getPlanName = getPlanName;
    $ctrl.getBenefitsText = getBenefitsText;
    $ctrl.getCarrierClass = getCarrierClass;
    $ctrl.getAllowanceGraphPosition = getAllowanceGraphPosition;
    $ctrl.getAllowanceValue = getAllowanceValue;
    $ctrl.goTo = goTo;

    //TODO pass from above
    function getCarrierClass (network) {
        var networkClass = 'disabled';
        if (typeof network !== 'undefined') {
            networkClass = network.toLowerCase();
        }
        return networkClass;
    }


    function getRewardTier (tariffcode) {
        var value = '';
        var contentProp = $ctrl.contentPropositions;
        for (var i = 0; i < contentProp.length; i++) {
            var contentTariffCode = contentProp[i].tariffCode;
            if (contentTariffCode === tariffcode) {
                value = contentProp[i].rewardTier;
            }
        }
        return value;
    }

    function getPlanName (tariffcode) {
        var value = '';
        var contentProp = $ctrl.contentPropositions;
        var dataProp = $ctrl.propositions;
        for (var i = 0; i < contentProp.length; i++) {
            var contentTariffCode = contentProp[i].tariffCode;
            if (contentTariffCode === tariffcode) {
                value = contentProp[i].planName;
                if (value === undefined) {
                    for (var c = 0; c < dataProp.length; c++) {
                        var dataTariffCode = dataProp[c].offering[0].id;
                        if (dataTariffCode === tariffcode) {
                            value = dataProp[c].tariff.name;
                            value = $filter('htmlEntities')(value);
                        }

                    }
                }
            }
        }
        return value;
    }

    function getBenefitsText (tariffcode) {
        var value = '';
        var contentProp = $ctrl.contentPropositions;
        var dataProp = $ctrl.propositions;
        for (var i = 0; i < contentProp.length; i++) {
            var contentTariffCode = contentProp[i].tariffCode;
            if (contentTariffCode === tariffcode) {
                value = contentProp[i].benefits;
                if (value[0] === undefined) {
                    for (var c = 0; c < dataProp.length; c++) {
                        var dataTariffCode = dataProp[c].offering[0].id;
                        if (dataTariffCode === tariffcode) {
                            var features = dataProp[c].tariff.features;
                            for (var t = 0; t < features.length; t++) {
                                var valueStr = features[t].name + '- ' + features[t].value;
                                valueStr = $filter('htmlEntities')(valueStr);

                                value.push(valueStr);
                            }
                        }
                    }
                }
            }
        }
        return value;
    }

    function getAllowanceGraphPosition(value, unit, unlimited, range) {

        if (unlimited === true) {
            return GRAPH_MAX_NUMBER;
        } else {
            if (typeof range !== undefined) {
                var rangeItem = range.split(',');
                for (var i = 0; i < rangeItem.length; i++) {
                    var valueConvertedToSameUnit = value;

                    if (unit.contains(DATA_MB)) {
                        valueConvertedToSameUnit = value / UNITS_OF_MB_IN_GB;
                    }

                    if (rangeItem[i] >= valueConvertedToSameUnit) {
                        return i + 1;
                    }
                }
            }
        }
    }

    function goTo(url, prop) {
        var authormode = $('body').data('authormode') || '';
        authormode = authormode.replace('\"', '');
        authormode = authormode.replace('\"', '');

        StateManagement.setPlan(PLAN, prop);

        url = url.replaceHTMLSuffix();
        $state.go(url);

    }

    function getAllowanceValue (value, unit, isUnlimited, unlimitedText) {
        if (typeof value !== undefined) {
            if (isUnlimited === true) {
                return unlimitedText;
            } else {
                if ((unit.contains(DATA_MB)) && (value >= UNITS_OF_MB_IN_GB)) {
                    value = value / UNITS_OF_MB_IN_GB;
                    unit = DATA_GB;
                }
                return value + ' ' + unit;
            }
        }
    }
}
