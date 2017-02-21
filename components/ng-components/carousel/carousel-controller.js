angular
    .module('uitoolkit')
    .controller('CarouselController', CarouselController);

/**
 * @param $document
 * @param $element
 * @param $scope
 * @param $timeout
 * @param $window
 * @constructor
 */
function CarouselController($document, $element, $scope, $timeout, $window) {
    var $ctrl = this;
    var autoAdvanceTimeout;
    var browserSupport = 'scrollBehavior' in $document[0].documentElement.style;
    var carouselElement = $element[0];
    var carouselWidth;
    var currentScrollLeft;
    var elementWidth;
    var lastScrollLeft;
    var nearestSnap;
    var publishedSlides = [];
    var scrollDetectTimeout;
    var scrollDetectTimeoutLength = 100;
    var scrolling = false;
    var scrollFrame;
    var scrollOff;
    var slideControllers = {};
    var suppressNextScroll = false;
    var touching = false;
    var update = false;

    $ctrl.animationDuration = parseInt($ctrl.animationDuration) || 333;

    $ctrl.$onInit = $onInit;
    $ctrl.$postLink = $postLink;
    $ctrl.autoAdvanceStart = autoAdvanceStart;
    $ctrl.autoAdvanceStop = autoAdvanceStop;
    $ctrl.publishSlide = publishSlide;
    $ctrl.scrollTo = scrollTo;
    $ctrl.scrollToIndex = scrollToIndex;

    function $onInit() {
        if (parseInt($ctrl.fixedHeight)) {
            carouselElement.height = parseInt($ctrl.fixedHeight);
        }

        if (angular.isUndefined($ctrl.slidesShown)) {
            $ctrl.slidesShown = 1;
            carouselElement.setAttribute('slides-shown', '1');
        }
    }

    function $postLink() {
        _initialize();

        $ctrl.autoAdvanceStart();

        $element.on('scroll', function () {
            if (suppressNextScroll) {
                suppressNextScroll = false;
                return;
            }

            if (!touching && !scrolling) {
                _scrollDetect(true);
            }
        });

        $element.on('touchend', function () {
            touching = false;

            _scrollDetect(!browserSupport);
        });

        $element.on('touchstart', function () {
            // If there is any scrolling or scroll detect happening it will be
            // halted.
            touching = true;

            // Temporarily halt any auto advance (will be kicked off again on
            // touch end by _scrollDetect()).
            $ctrl.autoAdvanceStop();

            if (scrollFrame) {
                $window.cancelAnimationFrame(scrollFrame);
                scrollFrame = null;
            }
        });
    }

    /**
     * Start or reset the auto advance timeout. Note that the carousel must
     * have had an auto-advance time set for this to work.
     */
    function autoAdvanceStart() {
        $ctrl.autoAdvanceStop();

        if ($ctrl.autoAdvance) {
            autoAdvanceTimeout = $timeout(function () {
                $ctrl.scrollToIndex($ctrl.end ? 0 : $ctrl.visible[0] + 1);
            }, parseInt($ctrl.autoAdvance) * 1000);
        }
    }

    /**
     * Halt any auto advance timeout.
     */
    function autoAdvanceStop() {
        if (autoAdvanceTimeout) {
            $timeout.cancel(autoAdvanceTimeout);
        }
    }

    /**
     * @param {object} controller
     * @param {object} element
     * @param {boolean=false} update Trigger an internal update, e.g. useful if publishing a controller after the carousel has rendered.
     */
    function publishSlide(controller, element, update) {
        publishedSlides.push({controller: controller, element: element[0]});

        if (update) {
            _update();
        }
    }

    /**
     * Note that you should almost certainly be using scrollToIndex().
     * Theoretically allows scrolling off a snap point which wouldn't actually
     * work in a browser supporting css snap points.
     *
     * @todo While exposing this makes testing a lot easier it is not really a desirable method to publicly expose.
     * @param {number} position target scrollLeft position.
     */
    function scrollTo(position) {
        currentScrollLeft = carouselElement.scrollLeft;

        if (currentScrollLeft === position) {
            return;
        }

        $ctrl.autoAdvanceStop();

        if (browserSupport) {
            // Need to watch to update values when scrolling has finished.
            _scrollDetect(false);

            carouselElement.scrollTo({
                behavior: 'smooth',
                left: position,
                top: 0
            });
        } else {
            _scrollTo(position);
        }
    }

    /**
     * Scroll to a particular item index.
     *
     * @param {number} index Item index, clamped to acceptable values.
     */
    function scrollToIndex(index) {
        // Clamp index to acceptable values.
        index = Math.min(Math.max(index, 0), carouselElement.childElementCount - parseInt($ctrl.slidesShown));

        // todo might need to round this value
        $ctrl.scrollTo(index * carouselElement.offsetWidth / parseInt($ctrl.slidesShown));
    }

    /**
     * Cube input number.
     *
     * @param {number} t
     * @returns {number}
     * @private
     */
    function _easeInCubic(t) {
        return t * t * t;
    }

    function _getSlideControllers() {
        slideControllers = {};

        publishedSlides.forEach(function (publishedSlide) {
            var i;
            var index;

            for (i = 0; i < carouselElement.childElementCount; i++) {
                if (carouselElement.children[i] === publishedSlide.element) {
                    index = i;
                }
            }

            slideControllers[index] = publishedSlide.controller;
        });
    }

    /**
     * Calculate carousel values. Should fire if carousel size changes due to resize/rotate.
     *
     * @private
     */
    function _getValues() {
        carouselWidth = carouselElement.offsetWidth;
        elementWidth = carouselWidth / parseInt($ctrl.slidesShown);
        lastScrollLeft = currentScrollLeft = carouselElement.scrollLeft;
    }

    /**
     * Initialize the carousel.
     *
     * @private
     */
    function _initialize() {
        $scope.$watch(function () {
            return carouselElement.childElementCount;
        }, function (childElementCount) {
            if (!$ctrl.CarouselContainerController.CarouselController) {
                $ctrl.CarouselContainerController.initializeCarousel($ctrl, childElementCount);
            } else {
                $ctrl.CarouselContainerController.setItems(childElementCount);
            }

            _update();
        });
    }

    /**
     * Calculate the scroll position based on the animation time.
     *
     * @param {number} start The start point of the scroll
     * @param {number} end The end point of the scroll
     * @param {number} elapsed Time elapsed since the scroll was initiated.
     * @param {number} duration Total duration of the scroll.
     * @return {number} The position to set
     */
    function _position(start, end, elapsed, duration) {
        if (elapsed > duration) {
            return end;
        }

        return start + (end - start) * _easeInCubic(elapsed / duration);
    }

    /**
     * Detect if the carousel is being scrolled by any mechanism and fire
     * updates when it seems to stop.
     *
     * @param {boolean=false} checkSnapped When scrolling appears to have stopped check if it has landed on a snap point?
     * @private
     */
    function _scrollDetect(checkSnapped) {
        scrolling = true;

        if (scrollDetectTimeout) {
            $timeout.cancel(scrollDetectTimeout);
        }

        if (touching) {
            // Halt any scroll detect, will kick off on touch end.
            return;
        }

        scrollDetectTimeout = $timeout(function () {
            currentScrollLeft = carouselElement.scrollLeft;

            if (lastScrollLeft != currentScrollLeft) {
                lastScrollLeft = currentScrollLeft;

                return _scrollDetect(checkSnapped);
            }

            // Doesn't appear to be scrolling any more.

            if (!browserSupport && checkSnapped && _snap()) {
                // Snapping is now being applied.
                return;
            }

            // Done scrolling
            scrolling = false;

            $ctrl.autoAdvanceStart();
            _updateStatus(true);
        }, scrollDetectTimeoutLength);
    }

    /**
     * Scroll to the target position, upon reaching it fire status update.
     *
     * This is for browsers which do not support element.scrollTo() only.
     *
     * @param {number} endPosition Target scrollLeft position.
     * @private
     */
    function _scrollTo(endPosition) {
        var elapsed;
        var startPosition = currentScrollLeft;
        var startTime = Date.now();

        scrolling = true;

        // Cancel any currently running animation.
        if (scrollFrame) {
            $window.cancelAnimationFrame(scrollFrame);
            scrollFrame = null;
        }

        scrollFrame = $window.requestAnimationFrame(scrollLoop);

        function scrollLoop() {
            elapsed = Date.now() - startTime;

            carouselElement.scrollLeft = currentScrollLeft = _position(
                startPosition,
                endPosition,
                elapsed,
                $ctrl.animationDuration
            );

            if (currentScrollLeft != endPosition) {
                scrollFrame = $window.requestAnimationFrame(scrollLoop);
            } else {
                scrolling = false;
                // Required as a scroll event will be fired after this.
                suppressNextScroll = true;

                $ctrl.autoAdvanceStart();
                _updateStatus(true);
            }
        }
    }

    /**
     * If required animate to snap point.
     *
     * @returns {boolean} Has snapping been initiated?
     * @private
     */
    function _snap() {
        scrollOff = currentScrollLeft % elementWidth;

        // Are we resting on a snap point?
        if (!browserSupport && scrollOff) {
            // Not on a snap point, get nearest snap point.
            nearestSnap = currentScrollLeft - scrollOff;

            if (scrollOff > elementWidth / 2) {
                // Nearest snap is forward, scroll up to it.
                nearestSnap += elementWidth;
            }

            _scrollTo(nearestSnap);

            return true;
        }

        return false;
    }

    function _update() {
        if (!update) {
            update = true;
            $scope.$evalAsync(function () {
                update = false;

                _getValues();

                _getSlideControllers();

                _updateStatus();
            });
        }
    }

    /**
     * Fire to update when done scrolling. Calculate if the carousel is at the
     * start/end and which elements are visible.
     */
    function _updateStatus(apply) {
        var i;
        var indexEnd;
        var indexStart;
        var visible = [];

        indexStart = i = Math.ceil(currentScrollLeft / elementWidth);
        indexEnd = indexStart + parseInt($ctrl.slidesShown);

        while (i < indexEnd) {
            visible.push(i++);
        }

        $ctrl.start = indexStart === 0;
        $ctrl.end = indexEnd === carouselElement.childElementCount;
        $ctrl.visible = visible;

        for (i in slideControllers) {
            if (visible.indexOf(parseInt(i)) > -1) {
                if (angular.isFunction(slideControllers[i].$onSlideVisible)) {
                    slideControllers[i].$onSlideVisible();
                }
            } else {
                if (angular.isFunction(slideControllers[i].$onSlideHidden)) {
                    slideControllers[i].$onSlideHidden();
                }
            }
        }

        $ctrl.CarouselContainerController.setStatus(
            $ctrl.start,
            $ctrl.end,
            $ctrl.visible,
            apply
        );
    }
}
