// input id and something to identify the image
angular
    .module('uitoolkit')
    .component('slide', {
        bindings: {
            imageSrc: '@',
            indicatorTheme: '@'
        },
        transclude: true,
        require: {
            CarouselContainerController: '?^carouselContainer',
            CarouselController: '?^carousel'
        },
        controller: function ($scope, $element) {
            var $ctrl = this;

            $ctrl.$onInit = $onInit;
            $ctrl.$onSlideVisible = $onSlideVisible;

            function $onInit() {
                if ($ctrl.CarouselController) {
                    $ctrl.CarouselController.publishSlide($ctrl, $element);
                }
            }

            function $onSlideVisible() {
                $ctrl.CarouselContainerController.getIndicator().indicatorTheme = $ctrl.indicatorTheme;
            }

        },
        templateUrl: '/components/ng-components/slide/slide.html'
    });
