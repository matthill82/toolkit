/**
 * @example
 *  <carousel-go-to
 *      direction="next" May be "next" or "previous"
 *      icon="cwsicon cwsicon-arrow-left" Optional icon
 *      text="Back" Optional text
 *  ></carousel-go-to>
 */
angular
    .module('uitoolkit')
    .component('carouselGoTo', {
        bindings: {
            direction: '@',
            icon: '@',
            text: '@'
        },
        controller: 'CarouselGoToController',
        require: {
            CarouselContainerController: '^carouselContainer'
        },
        templateUrl: '/components/ng-components/carousel-go-to/carousel-go-to.html'
    });
