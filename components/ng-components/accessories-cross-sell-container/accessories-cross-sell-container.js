/**
 *
 * @example
 *  <accessories-cross-sell-container
 *      accessories-for="PHONES" //JRD admin data section name
 *      basket-cta-select-label="Add to Basket"
 *      basket-cta-selected-label="Remove from Basket"
 *      category-cta-path="search-selector"
 *      css-column-class="accessoriesCrossSellContainer__col"
 *      image-cta-path="device-details"
 *  ></accessories-cross-sell-container
 */
angular
    .module('uitoolkit')
    .component('accessoriesCrossSellContainer', {
        bindings: {
            accessoriesFor: '@',
            basketCtaSelectLabel: '@',
            basketCtaSelectedLabel: '@',
            categoryCtaPath: '@',
            cssColumnClass: '@',
            imageCtaPath: '@'
        },
        template:'<div class="accessoriesCrossSellContainer" ng-transclude></div>',
        transclude: true,
        controller: 'AccessoriesCrossSellContainerController'
    });
