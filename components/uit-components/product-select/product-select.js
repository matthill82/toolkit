/**
 * @example
 *  <uit-product-select
 *      on-is-selected: '$ctrl.isSelected(product)',
 *      on-select: '$ctrl.select(product)',
 *      select-text: 'Select',
 *      selected-text: 'Selected'
 *  ></uit-product-select>
 */
angular
    .module('uitoolkit')
    .component('uitProductSelect', {
        bindings: {
            onIsSelected: '&',
            onSelect: '&',
            selectText: '@',
            selectedText: '@'
        },
        controller: 'UitProductSelectController',
        templateUrl: '/components/uit-components/product-select/product-select.html'
    });
