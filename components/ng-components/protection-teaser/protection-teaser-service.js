angular.module('uitoolkit')
    .service('ProtectionTeaserService', ProtectionTeaserService);

/**
 * @param {$sce} $sce
 * @param {JrdService} JrdService
 * @constructor
 */
function ProtectionTeaserService(
    $sce,
    JrdService
) {
    this.getPrice = getPrice;
    this.getTextParts = getTextParts;

    /**
     * @param {number} productPrice
     * @param {string} journeyType
     * @param selectedTerm
     * @returns {?string}
     */
    function getPrice(productPrice, journeyType, selectedTerm) {
        var PROPERTY_JSON = 'care-plans';
        var fromPrice;
        var i;
        var protectionPlans;
        var toPrice;
        var term;
        var fullPrice;
        var monthlyPriceStr;
        var planPrice;

        protectionPlans = JrdService.get(journeyType, PROPERTY_JSON);

        if (!angular.isArray(protectionPlans) || !protectionPlans.length) {
            return;
        }

        for (i = 0; i < protectionPlans.length; i++) {
            fromPrice = parseInt(protectionPlans[i].fromPrice);
            toPrice = parseInt(protectionPlans[i].toPrice);
            term = protectionPlans[i].protectionTerm;
            fullPrice = protectionPlans[i].protectionPrice;
            monthlyPriceStr = protectionPlans[i].monthlyPrice;

            if (selectedTerm.indexOf(term) > -1) {
                if (productPrice > fromPrice && productPrice < toPrice) {
                    planPrice = fullPrice;

                    if (fullPrice.indexOf('-') > -1) {
                        planPrice = parseFloat(monthlyPriceStr);
                    }

                    return planPrice;
                }
            }
        }
    }

    /**
     * @param {string} text
     * @returns {{before: *, after: *}}
     */
    function getTextParts(text) {
        var textParts = text.split('{0}');

        return {
            before: $sce.trustAsHtml(textParts[0].trim()),
            after: textParts[1] ? $sce.trustAsHtml(textParts[1].trim()) : ''
        };
    }
}
