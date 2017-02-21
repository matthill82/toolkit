angular
    .module('uitoolkit')
    .controller('CarouselIndicatorController', CarouselIndicatorController);

function CarouselIndicatorController() {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        $ctrl.CarouselContainerController.setIndicator($ctrl);
    }
}
