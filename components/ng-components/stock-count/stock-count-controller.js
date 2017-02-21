angular
    .module('uitoolkit')
    .controller('StockCountController', StockCountController);

/**
 * @param {$rootScope.Scope} $scope
 * @param EventEnums
 * @param {StockCountService} StockCountService
 * @param {StockService} StockService
 * @param {UserService} UserService
 * @constructor
 */
function StockCountController($scope, EventEnums, StockCountService, StockService, UserService) {
    var $ctrl = this;

    $scope.$on(EventEnums.ENUMS.SELECTED_DEVICE, function (event, data) {
        $ctrl.device = $ctrl.device || data;
        getStockAmount($ctrl.device);
    });

    function getStockAmount(product) {
        var locationId;

        if (angular.isUndefined(product) || !product.id) {
            $ctrl.stockMessage = StockCountService.stockCountDecorator();
            return;
        }

        locationId = UserService.getLocation();

        // This just avoids calling the endpoint and getting an error in
        // frontend dev when there may not be a user.
        if (!locationId) {
            $ctrl.stockMessage = StockCountService.stockCountDecorator();
            return;
        }

        if (angular.isDefined($ctrl.method)) {
            $ctrl.stock = StockService.listenForStock(product.id);

            $scope.$watch(function () {
                return $ctrl.stock[product.id];
            }, function (newVal) {
                $ctrl.stockMessage = StockCountService.stockCountDecorator(newVal);
            });
        } else {
            StockCountService.getStock(locationId, product.id.toString()).then(getStockSuccess, getStockError);


        }
    }

    function getStockSuccess (stock) {
        $ctrl.stockMessage = StockCountService.stockCountDecorator(stock);
    }

    function getStockError (error) {
        console.log('Stock count ctrl, StockCountService problem', error);
    }
}
