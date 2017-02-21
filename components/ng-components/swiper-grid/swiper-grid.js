/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */


angular.module('uitoolkit')
    .component('swiperGrid', {
        templateUrl: '/components/ng-components/swiper-grid/swiper-grid.html',
        controller: 'SwiperGridController',
        bindings: {
            bundleCategoryFilter: '@bundleCategoryFilter',

            selectText: '@swSelectText',
            selectedText: '@swSelectedText',
            priceText: '@swPriceText',
            currencyConfig: '@swCurrencyConfig',
            dataKey: '@swDataKey',
            journey: '@swJourney',
            filterCategoriesString: '@swCategories',
            disabledGroup: '@swDisabledGroup',
            heightCategory:'@swHeightCategory',
            displayType: '@swDisplayType',

            initialSlide: '@swInitialSlide',
            displaySeparateSellingPriceText: '@swDisplaySeparateSellingPriceText',
            displaySaving: '@swDisplaySaving',
            savingText: '@swSavingText',
            layoutType: '@swLayout',

            hintContentUrlString: '@hintContentUrl',
            hintIcon: '@hintIcon',
            hintModalCloseIcon: '@hintModalCloseIcon',
            hintModalTitleString: '@hintModalTitle',
            hintModalSizeString: '@hintModalSize',

            selectMode: '@swSelectMode'
        }
    });
