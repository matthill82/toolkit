angular.module('uitoolkit')
    .service('ProtectionTilesService', ProtectionTilesService);

/**
 * @param {$rootScope.Scope} $rootScope
 * @param {function=BasketAttachment} BasketAttachment
 * @param {BasketService} BasketService
 * @param {object} EventEnums
 * @param JrdService
 * @constructor
 */
function ProtectionTilesService(
    $rootScope,
    BasketAttachment,
    BasketService,
    EventEnums,
    JrdService
) {
    var PIPE_SEPARATOR = '||';
    var FLOAT_REGEX = /^[0-9.]+$/;
    var OFFERING_FULL = 'fullPrice';
    var OFFERING_MONTH = 'monthlyContract';

    this.getCarePlans = getCarePlans;
    this.addOrRemoveFromBasket = addOrRemoveFromBasket;
    this.isPlanSelected = isPlanSelected;
    this.getCorrectPriceForPlan = getCorrectPriceForPlan;

    /**
     * @param {number} productPrice
     * @param {string} journeyType
     * @param {string} dataType
     * @param terms
     * @returns {?string}
     */
    function getCarePlans(productPrice, journeyType, dataType, terms) {
        var fromPrice;
        var i;
        var planArrayTerm;
        var plansArray = [];
        var protectionPlans = JrdService.get(journeyType, dataType);
        var t;
        var term;
        var termsArray;
        var toPrice;

        if (protectionPlans) {
            termsArray = terms;

            if (terms.indexOf(PIPE_SEPARATOR) > -1) {
                termsArray = terms.split(PIPE_SEPARATOR);
            }

            for (t = 0; t < termsArray.length; t++) {
                planArrayTerm = termsArray[t];

                for (i = 0; i < protectionPlans.length; i++) {
                    fromPrice = parseInt(protectionPlans[i].fromPrice);
                    toPrice = parseInt(protectionPlans[i].toPrice);
                    term = protectionPlans[i].protectionTerm;

                    if (planArrayTerm.indexOf(term) > -1) {
                        if (productPrice > fromPrice && productPrice < toPrice) {
                            plansArray.push(protectionPlans[i]);
                        }
                    }
                }
            }
        }

        return plansArray;
    }

    function isPlanSelected(productId) {
        return !!BasketService.getBasket().findAttachmentById(productId);
    }

    /**
     *
     * @param upfrontPrice
     * @param monthlyPrice
     * @returns {number}
     */
    function getCorrectPriceForPlan(upfrontPrice, monthlyPrice) {
        var price = 0;

        if (FLOAT_REGEX.test(upfrontPrice)) {
            price = upfrontPrice;
        } else if (FLOAT_REGEX.test(monthlyPrice)) {
            price = monthlyPrice;
        }

        return price;
    }

    /**
     *
     * @param upfrontPrice
     * @param monthlyPrice
     * @returns {string}
     */
    function _getOfferingTypeForPlan(upfrontPrice, monthlyPrice) {
        var offeringType = OFFERING_MONTH;

        if (FLOAT_REGEX.test(upfrontPrice)) {
            offeringType = OFFERING_FULL;
        } else if (FLOAT_REGEX.test(monthlyPrice)) {
            offeringType = OFFERING_MONTH;
        }

        return offeringType;
    }

    /**
     * @param selectedPlan
     * @param displayType
     * @param image
     * @param itemIndex
     * @param basketText
     */
    function addOrRemoveFromBasket(selectedPlan, displayType, image, itemIndex, basketText) {
        /** @var {Basket} basket */
        var basket = BasketService.getBasket();
        var attachment;
        var price = getCorrectPriceForPlan(selectedPlan.protectionPrice, selectedPlan.monthlyPrice);
        var offeringType = _getOfferingTypeForPlan(selectedPlan.protectionPrice, selectedPlan.monthlyPrice);

        attachment = basket.findAttachmentById(selectedPlan.thirdPartyId);

        if (angular.isUndefined(attachment)) {
            attachment = constructBasketAttachment(selectedPlan, displayType, price, offeringType, image, basketText);
console.log(selectedPlan, attachment);
            $rootScope.$broadcast(EventEnums.ENUMS.SELECT_ATTACHMENT, {
                itemIndex: itemIndex,
                attachment: attachment
            });

            // Remove other
            basket.findAttachmentsByDisplayType(displayType).forEach(function (attachment) {
                basket.removeAttachment(attachment);
            });

            basket.addAttachment(attachment);
        } else {
            basket.removeAttachment(attachment);
        }
    }

    /**
     * @param {string} selectedPlan
     * @param {string} displayType
     * @param {number} price
     * @param {string} offeringType
     * @param {string} image
     * @param {string} basketText
     * @returns {BasketAttachment}
     */
    function constructBasketAttachment(selectedPlan, displayType, price, offeringType, image, basketText) {
        if (offeringType.indexOf(OFFERING_FULL) > -1) {
            return new BasketAttachment(
                {
                    id: selectedPlan.thirdPartyId,
                    name: basketText + ' ' + selectedPlan.protectionTerm,
                    offering: [
                        {
                            id: offeringType,
                            offeringType: offeringType,
                            upfrontPrice: {
                                net: {
                                    value: price
                                }
                            }
                        }
                    ],
                    device: {
                        imagery: [
                            {
                                url: image
                            }
                        ]
                    }
                }, displayType, offeringType, 0, 1);
        }

        return new BasketAttachment(
            {
                id: selectedPlan.thirdPartyId,
                name: basketText + ' ' + selectedPlan.protectionTerm,
                offering: [
                    {
                        id: offeringType,
                        offeringType: offeringType,
                        regularInstallmentAmount: {
                            net: {
                                value: price
                            }
                        }
                    }
                ],
                device: {
                    imagery: [
                        {
                            url: image
                        }
                    ]
                }
            }, displayType, offeringType, 0, 1);
    }
}
