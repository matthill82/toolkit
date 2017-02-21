/**
 * Generic carousel supports specific content:
 * - productImage
 *
 * @example
 *  <carousel
 *      auto-advance="5" Time to auto advance to the next item in the carousel, in seconds.
 *      fixed-height="600"
 *      slides-shown="1" Number of slides shown at once, may be 1 - 4.
 *  ></carousel>
 */
angular
    .module('uitoolkit')
    .component('carousel', {
        bindings: {
            autoAdvance: '@',
            fixedHeight: '@',
            slidesShown: '@'
        },
        controller: 'CarouselController',
        require: {
            CarouselContainerController: '^carouselContainer'
        }
    });
