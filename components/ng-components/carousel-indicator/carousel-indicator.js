angular
    .module('uitoolkit')
    .component('carouselIndicator', {
        bindings: {
            theme: '@'
        },
        controller: 'CarouselIndicatorController',
        require: {
            CarouselContainerController: '^carouselContainer'
        },
        templateUrl: '/components/ng-components/carousel-indicator/carousel-indicator.html'
    });
