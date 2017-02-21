/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */
//<grid-product
//sw-select-text="Select"
//sw-selected-icon="cwsicon cwsicon-cart"
//sw-features='[{"value":"Operating system", "category":"OVERVIEW"},{"value":"Storage", //"category":"SPECIFICATION"},{"value":"Resolution", "category":"SCREEN"}]'
//sw-currency-config=""
//sw-products="146868,141647,147529,146583,146586,147020"
//sw-layout-type="details"
//sw-redirect-url="build/laptop/pdp"

//>
//</grid-product>

angular.module('uitoolkit')
    .directive('productSlide', function () {

        return {
            templateUrl: '/components/ng-components/product-slide/product-slide.html',
            controller: 'ProductSlideController as ProductSlideController',
            link: function (scope, element, attr) {

                scope.product = angular.fromJson(attr.psProduct);
                scope.selectText = attr.psSelectText;
                scope.selectedText = attr.psSelectedText;
                scope.redirectUrl = attr.psRedirectUrl;
                scope.displayType = attr.psDisplayType;

                // sticker directive
                scope.journeyType = attr.stickerJourneyType;

                // Allows currencyConfig and layoutType to be passed as
                // attributes rather than using scope inheritance.
                if (attr.pricingCurrencyConfig) {
                    scope.currencyConfig = attr.pricingCurrencyConfig;
                }

                if (attr.pricingLayoutType) {
                    scope.layoutType = attr.pricingLayoutType;
                }

                if (attr.psFeaturesArray) {
                    scope.featuresArray = angular.fromJson(attr.psFeaturesArray) || [];
                }

                if (attr.psPageType) {
                    scope.pageType = attr.psPageType;
                }
            }
        };

    });
