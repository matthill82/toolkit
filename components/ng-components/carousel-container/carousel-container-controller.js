angular
    .module('uitoolkit')
    .controller('CarouselContainerController', CarouselContainerController);

/**
 * @param {$rootScope.Scope} $scope
 * @constructor
 */
function CarouselContainerController($scope) {
    var $ctrl = this;
    /** @type {CarouselIndicatorController} */
    var CarouselIndicatorController;
    /** @type {Function[]} */
    var initCallbacks = [];

    $ctrl.end = true;
    $ctrl.items = 0;
    $ctrl.start = true;
    /** @type {number[]} Array of indexes of visible slides. */
    $ctrl.visible = [];

    $ctrl.addInitCallback = addInitCallback;
    $ctrl.getIndicator = getIndicator;
    $ctrl.initializeCarousel = initializeCarousel;
    $ctrl.setIndicator = setIndicator;
    $ctrl.setItems = setItems;
    $ctrl.setStatus = setStatus;

    /**
     * @param {Function} callback
     */
    function addInitCallback(callback) {
        initCallbacks.push(callback);
    }

    /**
     * @returns {?CarouselIndicatorController}
     */
    function getIndicator() {
        return CarouselIndicatorController;
    }

    /**
     * @param {CarouselController} controller
     * @param {number} items
     */
    function initializeCarousel(controller, items) {
        $ctrl.CarouselController = controller;

        $ctrl.setItems(items);

        while (initCallbacks.length){
            initCallbacks.shift().call();
        }
    }

    /**
     * @param {CarouselIndicatorController} controller
     */
    function setIndicator(controller) {
        CarouselIndicatorController = controller;
    }

    /**
     * @param {number} items
     */
    function setItems(items) {
        $ctrl.items = items;
    }

    /**
     * @param {boolean} start
     * @param {boolean} end
     * @param {number[]} visible
     * @param {boolean=false} apply
     */
    function setStatus(start, end, visible, apply) {
        $ctrl.start = start;
        $ctrl.end = end;
        $ctrl.visible = visible;

        if (apply) {
            $scope.$apply();
        }
    }
}
