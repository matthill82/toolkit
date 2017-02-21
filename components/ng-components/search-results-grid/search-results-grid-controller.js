angular
    .module('uitoolkit')
    .controller('SearchResultsGridController', SearchResultsGridController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {DeviceHelperService} DeviceHelperService
 * @param {object} EventEnums
 * @param {SearchResultsGridService} SearchResultsGridService
 * @constructor
 */
function SearchResultsGridController(
    $scope,
    DeviceHelperService,
    EventEnums,
    SearchResultsGridService
) {
    var $ctrl = this;

    $ctrl._query = '';

    $ctrl.select = select;
    $ctrl.selectImage = angular.noop;

    // Uses getter/setter to avoid having to create a watcher.
    Object.defineProperty($ctrl, 'query', {
        get: function () {
            return $ctrl._query;
        },
        set: function (value) {
            $ctrl._query = value;

            if (value.length >= $ctrl.searchAtCharacterCount) {
                $ctrl.pending = true;

                SearchResultsGridService.search(
                    value,
                    $ctrl.maxResultsCount,
                    $ctrl.deviceCategoriesConfig.split('||')
                ).then(function (products) {
                    $ctrl.products = products;
                }).finally(function () {
                    $ctrl.pending = false;
                });
            } else {
                $ctrl.products = null;
            }
        }
    });

    function select(product) {
        $scope.$root.$broadcast(EventEnums.ENUMS.SELECT_ITEM, product);

        DeviceHelperService.goToDevice(product, angular.fromJson($ctrl.deviceCategoryRedirectUrlConfig));
    }
}
