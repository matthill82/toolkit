angular.module('uitoolkit')
    .component('bundle', {
        bindings: {
            displayType: '@bundleDisplayType',
            moreText: '@bundleMoreText',
            noProductSelectedText: '@bundleNoProductSelectedText',
            priceText: '@bundlePriceText',
            saveText: '@bundleSaveText',
            separateText: '@bundleSeparateText'
        },
        controller: 'BundleController',
        templateUrl: '/components/ng-components/bundle/bundle.html'
    });
