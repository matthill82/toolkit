/**
 * Configuration:
 *  - more-text: More CTA text Only applies when show-offering is true
 *  - offering-types: offeringType to Human readable map
 *  - offering: Array of offerings
 *  - on-select: Local select function
 *  - show-offering: "true" to show the first/default offering details up front
 *
 * @example
 * <uit-ways-to-buy
 *     more-text="View more options"
 *     offering-types="{"type": "Human readable"}"
 *     offering="[{}]"
 *     on-select="$ctrl.select(offering)"
 *     other-ways-text="View other ways to buy"
 *     select-text="Select"
 *     show-offering="true"
 *     term-text="Months"
 * ></uit-ways-to-buy>
 */
angular
    .module('uitoolkit')
    .component('uitWaysToBuy', {
        bindings: {
            moreText: '@',
            offeringTypes: '<',
            offering: '<',
            onSelect: '&',
            otherWaysText: '@',
            selectText: '@',
            showOffering: '@',
            termText: '@'
        },
        controller: 'UitWaysToBuyController',
        templateUrl: '/components/uit-components/ways-to-buy/ways-to-buy.html'
    });
