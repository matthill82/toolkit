/**
 * @example
 *  <grid-product
 *      sw-select-text="Select"
 *      sw-features='[{"value":"Operating system", "category":"OVERVIEW"},{"value":"Storage", //"category":"SPECIFICATION"},{"value":"Resolution", "category":"SCREEN"}]'
 *      sw-currency-config=""
 *      sw-products="146868,141647,147529,146583,146586,147020" products to display (if device)
 *      sw-layout-type="details"
 *      sw-redirect-url="build/laptop/pdp"
 *      sw-page-type="" set if using journey json, should be item mapped to (sku-mapper)
 *      sw-journey-type="WINDOWS DESKTOPS" journey/device
 *  ></grid-product>
 */
angular
    .module('uitoolkit')
    .component('gridProduct', {
        bindings: {
            currencyConfig: '@swCurrencyConfig',
            displayType: '@psDisplayType',
            featuresArray: '@swFeatures ',
            journeyType: '@swJourneyType',
            layoutType: '@swLayoutType',
            pageType: '@swPageType',
            productIds: '@swProducts',
            redirectUrl: '@swRedirectUrl',
            selectedText: '@swSelectedText',
            selectText: '@swSelectText',
            removeImageLink: '@swRemoveImageLink'
        },
        controller: 'GridProductController',
        templateUrl: '/components/ng-components/grid-product/grid-product.html'
    });
