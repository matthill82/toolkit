angular
    .module('uitoolkit')
    .controller('CarouselGoToController', CarouselGoToController);

function CarouselGoToController() {
    var $ctrl = this;

    $ctrl.disabled = disabled;
    $ctrl.go = go;

    function disabled() {
        switch($ctrl.direction) {
        case 'next':
            return $ctrl.CarouselContainerController.end;

        case 'previous':
            return $ctrl.CarouselContainerController.start;

        default:
            return false;
        }
    }

    function go() {
        switch($ctrl.direction) {
        case 'next':
            $ctrl.CarouselContainerController.CarouselController.scrollToIndex(
                $ctrl.CarouselContainerController.visible[0] + 1
            );
            return;

        case 'previous':
            $ctrl.CarouselContainerController.CarouselController.scrollToIndex(
                $ctrl.CarouselContainerController.visible[0] - 1
            );
            return;

        default:
            throw new Error('Unrecognised direction');
        }
    }
}
