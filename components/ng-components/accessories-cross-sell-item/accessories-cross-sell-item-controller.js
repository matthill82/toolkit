angular
    .module('uitoolkit')
    .controller('AccessoriesCrossSellItemController', AccessoriesCrossSellItemController);

/**
 *
 * @param $state
 * @param {StateManagement} StateManagement
 * @constructor
 */
function AccessoriesCrossSellItemController($state, $scope, AccessoriesCrossSellItemService) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.categoryOnClick = categoryOnClick;
    $ctrl.imageOnClick = imageOnClick;
    $ctrl.select = select;
    $ctrl.isSelected = isSelected;


    function $onInit() {
        $ctrl.category2 = $ctrl.categoryValue.split('::')[1];

        $ctrl.AccessoriesCrossSellContainerController.accessoriesForCategories[$ctrl.category2] = null;

        $scope.$evalAsync(function () {
            $ctrl.AccessoriesCrossSellContainerController.getMappedAccessories();
        });
    }

    function categoryOnClick() {
        // implement additional logic to save the category for use on the next page
        $state.go($ctrl.AccessoriesCrossSellContainerController.categoryCtaPath.replaceHTMLSuffix());
    }

    function imageOnClick(accessroryId) {
        // implement additional logic to save the accessory ID for use on the next page
        $state.go($ctrl.AccessoriesCrossSellContainerController.imageCtaPath.replaceHTMLSuffix());
    }


    /**
     * @returns {boolean}
     */
    function isSelected(product) {
        return product ? AccessoriesCrossSellItemService.isSelected(product) : false;
    }

    function select(product) {
        AccessoriesCrossSellItemService.select(product);
    }
}
