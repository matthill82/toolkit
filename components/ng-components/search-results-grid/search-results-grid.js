angular
    .module('uitoolkit')
    .component('searchResultsGrid', {
        bindings: {
            clearSearchIcon: '@srgClearSearchIcon',
            deviceCategoriesConfig: '@srgDeviceCategoriesConfig',
            deviceCategoryRedirectUrlConfig: '@srgDeviceCategoryRedirectUrlConfig',
            maxResultsCount: '@srgMaxResultsCount',
            noResultsMessageText: '@srgNoResultsMessageText',
            noResultsTitleText: '@srgNoResultsTitleText',
            searchAtCharacterCount: '@srgSearchAtCharacterCount',
            searchIcon: '@srgSearchIcon',
            searchPlaceholderText: '@srgSearchPlaceholderText',
            searchTitleText: '@srgSearchTitleText',
            enableBarcodeScan: '@srgEnableBarcodeScan',

            // Passed through to nested deviceStickers component.
            dsJourneyType: '@dsJourneyType',

            // Passed through to nested pricing component.
            pricingCurrencyConfig: '@pricingCurrencyConfig',
            pricingLayoutType: '@pricingLayoutType',

            // Passed through to nested productSlide component.
            psFeaturesArray: '@?psFeaturesArray',
            psPageType: '@psPageType',
            psSelectedText: '@psSelectedText',
            psSelectText: '@psSelectText'
        },
        controller: 'SearchResultsGridController',
        templateUrl: '/components/ng-components/search-results-grid/search-results-grid.html'
    });
