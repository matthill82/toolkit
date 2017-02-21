/**
 * @example
 *  <protection-teaser
 *      pt-journey-type=""
 *      pt-logo-url=""
 *      pt-price-format=""
 *      pt-term=""
 *      pt-text=""
 *      pt-title=""
 *  ></protection-teaser>
 */
angular.module('uitoolkit')
    .component('protectionTeaser', {
        bindings: {
            journeyType: '@ptJourneyType',
            logoUrl: '@ptLogoUrl',
            term: '@ptTerm',
            text: '@ptText',
            title: '@ptTitle'
        },
        controller: 'ProtectionTeaserController',
        templateUrl: '/components/ng-components/protection-teaser/protection-teaser.html'
    });
