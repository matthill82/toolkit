/**
 * Generic product component.
 *
 * Not an AEM component, for nested use only!
 *
 * Note if onSelectImage is not specified however onSelect is then
 * onSelectImage will simply call onSelect. If onSelect is also undefined then
 * it will do nothing.
 */
angular
    .module('uitoolkit')
    .component('uitProductItem', {
        bindings: {
            product: '<',
            showTags: '@',
            selectText: '@',
            selectedText: '@',
            removeCompareIcon: '@',
            featuresArray: '<',

            // Nested deviceIconFeatures
            difDisplay: '@',
            difFeatures: '@',
            difJourneyType: '@',

            // Nested deviceStickers
            dsJourneyType: '@',

            // Nested pricing
            prLayoutType: '@',

            // Actions
            onCompareRemove: '&?',
            onIsSelected: '&?',
            onSelect: '&?',
            onSelectImage: '&?'
        },
        controller: 'UitProductItemController',
        templateUrl: '/components/uit-components/product-item/product-item.html'
    });
