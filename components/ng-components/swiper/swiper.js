angular.module('uitoolkit')
    .component('swiper', {
        templateUrl: '/components/ng-components/swiper/swiper.html',
        controller: 'SwiperController',
        bindings: {
            bundleCategoryFilter: '@bundleCategoryFilter',
            selectText: '@swSelectText',

            selectedText:  '@swSelectedText',
            priceText:  '@swPriceText',
            displayPrice:  '@swDisplayPrice',
            layoutType:  '@swLayout',
            // selectMode may be "single" or "multi"
            selectMode:  '@swSelectMode',

            disabledGroupString: '@swDisabledGroup',

            savingText:  '@swSavingText',
            displaySaving:  '@swDisplaySaving',
            displaySeparateSellingPriceText: '@swDisplaySeparateSellingPriceText',

            hintContentUrl:  '@hintContentUrl',
            hintIcon:  '@hintIcon',
            hintModalCloseIcon:  '@hintModalCloseIcon',
            hintModalTitle:  '@hintModalTitle',
            hintModalSize: '@hintModalSize',

            initialSlide: '@swInitialSlide',

            journeyType: '@swJourney',
            dataKey: '@swDataKey',
            filterCategory: '@swCategory',
            heightCategory: '@swHeightCategory',
            displayType: '@swDisplayType'
        }
    });
