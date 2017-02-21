/**
 * @example
 *  <product-compare
 *      dif-features="Search Attribute::Processor / Type||Search Attribute::Touchscreen||Search Attribute::Storage capacity||Search Attribute::Memory||Search Attribute::Storage type||Search Attribute::Battery life"
 *      dif-display="2"
 *
 *      pc-button-left-icon="cwsicon cwsicon-arrow-left"
 *      pc-button-right-icon="cwsicon cwsicon-arrow-right"
 *      pc-device-category-journey-type-config='{"WINDOWS LAPTOPS & CONVERTIBLES": "WINDOWS LAPTOPS & CONVERTIBLES", "WINDOWS DESKTOPS": "WINDOWS DESKTOPS"}'
 *      pc-device-category-redirect-url-config='{"WINDOWS LAPTOPS & CONVERTIBLES": "build/laptop/pdp", "WINDOWS DESKTOPS": "build/desktop/pdp"}'
 *      pc-no-compare-results-msg="There aren't any items to compare."
 *      pc-remove-compare-icon="cwsicon cwsicon-circle-close"
 *      pc-select-text="Select"
 *
 *      pr-currency-config="[{\x22currencySymbol\x22:\x22\\u0026#163;\x22,\x22currencyFormat\x22:\x220\x22,\x22decimalSymbol\x22:\x22.\x22,\x22digitsAfterDecimal\x22:2,\x22digitGroupingSymbol\x22:\x22,\x22,\x22digitGrouping\x22:\x221\x22}]"
 *      pr-layout-type="details"
 *  ></product-compare>
 */
angular
    .module('uitoolkit')
    .component('productCompare', {
        bindings: {
            // productCompare and productCompareItem bindings (pci sub
            // component is not a public api, and may change to a more
            // generic product component).
            addToCompareActiveIcon: '@pcAddToCompareActiveIcon',
            addToCompareInactiveIcon: '@pcAddToCompareInactiveIcon',
            buttonLeftIcon: '@pcButtonLeftIcon',
            buttonRightIcon: '@pcButtonRightIcon',
            deviceCategoryJourneyTypeConfig: '@pcDeviceCategoryJourneyTypeConfig',
            deviceCategoryRedirectUrlConfig: '@pcDeviceCategoryRedirectUrlConfig',
            noCompareResultsMsg: '@pcNoCompareResultsMsg',
            noResultsMsg: '@pcNoResultsMsg',
            removeCompareIcon: '@pcRemoveCompareIcon',
            selectText: '@pcSelectText',
            titleText: '@pcTitleText',

            // Nested deviceIconFeatures
            difFeatures: '@',
            difDisplay: '@',

            // Nested pricing
            prCurrencyConfig: '@',
            prLayoutType: '@'
        },
        controller: 'ProductCompareController',
        templateUrl: '/components/ng-components/product-compare/product-compare.html'
    });
