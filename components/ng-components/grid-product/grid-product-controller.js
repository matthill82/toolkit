angular
    .module('uitoolkit')
    .controller('GridProductController', GridProductController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {object} EventEnums
 * @param {GridProductService} GridProductService
 * @param {StateManagement} StateManagement
 * @constructor
 */
function GridProductController(
    $scope,
    EventEnums,
    GridProductService,
    StateManagement
) {
    var $ctrl = this;
    var directionKeys = StateManagement.journeyGetDirectionKeys();

    $ctrl.features = $ctrl.featuresArray ? angular.fromJson($ctrl.featuresArray) : [];
    $ctrl.products = [];

    $ctrl.$onInit = $onInit;
    $ctrl.isSelected = isSelected;
    $ctrl.select = select;
    $ctrl.selectImage = selectImage;

    $scope.$root.$broadcast(EventEnums.ENUMS.CTA_BUTTON_UPDATE, {
        direction: directionKeys.NEXT,
        disabled: false
    });

    function $onInit() {
        if ($ctrl.productIds) {
            GridProductService.getProductsById($ctrl.productIds).then(function (products) {
                $ctrl.products = products;
            });
        } else {
            GridProductService.loadProductsFromJson($ctrl.journeyType, $ctrl.pageType).then(function (products) {
                $ctrl.products = products;
            }, function () {
                $scope.$root.$broadcast(EventEnums.ENUMS.CTA_BUTTON_TRIGGER, {
                    direction: StateManagement.journeyGetDirection()
                });
            });
        }
    }

    /**
     * @param {object} product
     * @returns {boolean}
     */
    function isSelected(product) {
        return GridProductService.isSelected(product, $ctrl.pageType);
    }

    /**
     * @param {object} product
     */
    function select(product) {
        $scope.$root.$broadcast(EventEnums.ENUMS.SELECT_ITEM, product);

        GridProductService.select(product, $ctrl.pageType, $ctrl.redirectUrl, $ctrl.displayType);
    }

    /**
     * @param {object} product
     */
    function selectImage(product) {
        if ($ctrl.removeImageLink === 'true') {
            return;
        }

        return select(product);
    }
}
