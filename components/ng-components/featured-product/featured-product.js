angular
    .module('uitoolkit')
    .component('featuredProduct', {
        /*
         Product ID (selected from product catalogue) [AC1]
         Product brand (derived from product catalogue, but can be overridden by the author) [AC1]
         Product title (derived from product catalogue, but can be overridden by the author) [AC1]
         Product image (derived from product catalogue, but can be overridden by the author) [AC1]
         Description (manually entered) [AC1]
         Indicative Price (derived from product catalogue but can be overridden) [AC1]
         Add to Basket Text [AC2]
         Product Description Page URL [AC3]
         */
        bindings: {
            brand: '@', //optional override
            ctaSelectText: '@',
            ctaSelectedText: '@',
            description: '@',
            deviceId: '@',
            price: '@', //optional override
            title: '@', //optional override
            producturl: '@'// not sure what this is for if the button adds to basket?
        },
        controller: 'FeaturedProductController',
        templateUrl: '/components/ng-components/featured-product/featured-product.html'
    });
