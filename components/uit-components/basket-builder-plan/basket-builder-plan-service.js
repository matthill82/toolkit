angular
    .module('uitoolkit')
    .service('BasketBuilderPlanService', BasketBuilderPlanService);

function BasketBuilderPlanService($log, UtilityService, JrdService) {

    this.getOfferingType = getOfferingType;

    /**
     *
     * @param {string} offeringType
     * @param {string} journeyType
     * @returns {string}
     */
    function getOfferingType(offeringType, journeyType) {
        try {
            var offeringTypes = UtilityService.getByPropertyValue(JrdService.get(journeyType, 'offering-types'), 'offeringType', offeringType).groupValue;
        } catch (e) {
            $log.error('offering-types is not defined within the JRD');
        }
        return offeringTypes;
    }
}
