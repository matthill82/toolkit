/**
 * @example
 *  <account-lookup
 *  al-profile="object from server"
 *  al-cta-redirect="{{}}"
 *  ></account-lookup>
 */

angular.module('uitoolkit')
    .component('accountLookup', {
        bindings: {
            profile: '<alProfile',
            ctaRedirect: '@alCtaRedirect'
        },
        controller: 'AccountLookupController',
        templateUrl: '/components/ng-components/account-lookup/account-lookup.html'
    });
