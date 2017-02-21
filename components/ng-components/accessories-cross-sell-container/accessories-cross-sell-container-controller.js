angular
    .module('uitoolkit')
    .controller('AccessoriesCrossSellContainerController', AccessoriesCrossSellContainerController);

/**
 *
 * @param AccessoriesCrossSellService
 * @constructor
 */
function AccessoriesCrossSellContainerController(AccessoriesCrossSellService) {
    var $ctrl = this;
    var getMethodCalled;

    $ctrl.$onInit = $onInit;
    $ctrl.getMappedAccessories = getMappedAccessories;

    function $onInit() {
        $ctrl.accessoriesForCategories = {};
        getMethodCalled = false;
    }

    function getMappedAccessories() {
        if (getMethodCalled) {
            return;
        }

        getMethodCalled = true;

        AccessoriesCrossSellService.getMappedAccessories(
            $ctrl.accessoriesFor,
            $ctrl.accessoriesForCategories
        ).then(function (response) {
             $ctrl.accessories = response;
        });
    }
}
