/**
 *
 * @example
 *  <accessories-cross-sell-item
 *      category-label="Screen Protection"
 *      category-value="accessory::Screen Protector"
 *  ></accessories-cross-sell-item>
 */
angular
    .module('uitoolkit')
    .component('accessoriesCrossSellItem', {
        bindings: {
            categoryLabel: '@',
            categoryValue: '@'
        },
        controller: 'AccessoriesCrossSellItemController',
        require: {
            AccessoriesCrossSellContainerController: '^accessoriesCrossSellContainer'
        },
        templateUrl: '/components/ng-components/accessories-cross-sell-item/accessories-cross-sell-item.html'
    });
