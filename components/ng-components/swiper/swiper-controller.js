/* List specific global vars below to prevent issues with JSHint */
/* global Swiper */

angular.module('uitoolkit')
    .controller('SwiperController', SwiperController);

/**
 * @param $element
 * @param $interval
 * @param {$rootScope.Scope} $scope
 * @param $timeout
 * @param {SwiperService} SwiperService
 * @constructor
 */
function SwiperController($element, $interval, $scope, $timeout, SwiperService) {
    var $ctrl = this;
    var disabledGroupArray = $ctrl.disabledGroupString ? $ctrl.disabledGroupString.split('||') : [];
    var interval;
    var swiper;

    $ctrl.isOpen = false;
    $ctrl.attachments = [];
    $ctrl.bundles = [];

    $ctrl.$onDestroy = $onDestroy;
    $ctrl.$onInit = $onInit;
    $ctrl.isDisabled = isDisabled;
    $ctrl.isSelected = isSelected;
    $ctrl.select = select;

    function $onInit() {
        _loadData();

        if ($ctrl.bundleCategoryFilter) {
            _loadBundles();
        }
    }

    function $onDestroy() {
        if (interval) {
            $interval.cancel(interval);
        }

        if (swiper) {
            swiper.destroy();
        }
    }

    /**
     * Note; Removes any and all items from the basket if it becomes disabled.
     *
     * @returns {boolean}
     */
    function isDisabled() {
        if (!disabledGroupArray.length) {
            return false;
        }

        if (SwiperService.isDisabled(disabledGroupArray)) {
            SwiperService.removeAll($ctrl.bundles.length ? $ctrl.bundles : $ctrl.attachments);
            return true;
        }

        return false;
    }

    /**
     * @param {BasketAttachment=} attachment
     * @returns {boolean}
     */
    function isSelected(attachment) {
        return SwiperService.isSelected(attachment || $ctrl.attachments[_getSliderIndex()], $ctrl.bundles);
    }

    /**
     * Toggle select the active slide item.
     */
    function select() {
        if ($ctrl.bundles.length) {
            SwiperService.selectBundle(
                $ctrl.attachments[_getSliderIndex()],
                $ctrl.attachments,
                $ctrl.bundles,
                _getSliderIndex()
            );
        } else {
            SwiperService.select(
                $ctrl.attachments[_getSliderIndex()],
                $ctrl.selectMode === 'single',
                _getSliderIndex()
            );
        }
    }

    function _addPaginationClasses(index) {
        $scope.$root.sliders = $scope.$root.sliders || [];
        $scope.$root.sliderIndex = $scope.$root.sliderIndex + 1 || 0;

        angular.element($element[0].querySelector('.swiper-container')).addClass('s' + index);
        angular.element($element[0].querySelector('.swiper-pagination')).addClass('p' + index);
    }

    function _checkForSelections() {
        $ctrl.attachments.forEach(function (attachment, index) {
            if (isSelected(attachment) && swiper && swiper.slideTo) {
                swiper.slideTo(index, 0);
            }
        });
    }

    /**
     * @returns {number}
     */
    function _getSliderIndex() {
        if (swiper && swiper.slides) {
            return swiper.activeIndex < swiper.slides.length ? swiper.activeIndex : swiper.slides.length - 1;
        }

        return 0;
    }

    function _loadBundles() {
        $ctrl.bundles = SwiperService.loadBundleProducts(
            $ctrl.journeyType,
            $ctrl.bundleCategoryFilter,
            $ctrl.filterCategory,
            $ctrl.displayType
        );
    }

    function _loadData() {
        $ctrl.attachments = SwiperService.loadData(
            $ctrl.journeyType,
            $ctrl.dataKey,
            $ctrl.filterCategory,
            $ctrl.displayType
        );

        if ($ctrl.attachments.length > 1) {
            _loadSlider();
        }
    }

    function _loadSlider() {
        var indexOfSlider = $scope.$root.sliderIndex;

        _addPaginationClasses(indexOfSlider);

        // $timeout/delayed until the pagination classes added
        $timeout(function () {
            swiper = new Swiper('.s' + indexOfSlider, {
                pagination: '.p' + indexOfSlider,
                paginationClickable: true,
                initialSlide: $ctrl.initialSlide
            });

            $scope.$root.sliders.push(swiper);

            _paginationChangeListener();

            _checkForSelections();
        }, 0);
    }

    function _paginationChangeListener() {
        // swiper has an onSlideChangeEnd event however it does not fire
        // reliably so this interval will cause a digest which will solve the
        // problem. Twice per second shouldn't be a problem hoover could be
        // tuned for performance if it is.
        interval = $interval(angular.noop, 500);
    }
}
