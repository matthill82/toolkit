/**
 * @example
 *  <div carousel-container> or <carousel-container>
 *      ...
 *  </div>
 */
angular
    .module('uitoolkit')
    .directive('carouselContainer', function () {
        return {
            controller: 'CarouselContainerController'
        };
    });
