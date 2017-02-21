angular.module('uitoolkit')
    .controller('VerticalSliderItemController', VerticalSliderItemController);

function VerticalSliderItemController($scope, $timeout, EventBroadcastService, EventEnums) {
    $scope.broadcastProduct = broadcastProduct;

    function broadcastProduct(product) {
        $timeout(function () {
            $scope.$broadcast(EventEnums.ENUMS.SELECTED_DEVICE, product.device);
            $scope.$broadcast(EventEnums.ENUMS.PRODUCT_OFFERINGS, product.offering[0]);
        }, 0);
    }
}
