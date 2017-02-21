/* global Swiper:true */

angular.module('uitoolkit')
    .controller('VerticalSliderController', VerticalSliderController);

/**
 * @param $interval
 * @param {$rootScope.Scope} $scope
 * @param $state
 * @param $timeout
 * @param {DeviceRecommendationsService} DeviceRecommendationsService
 * @param {object} EventEnums
 * @param {StateManagement} StateManagement
 * @constructor
 */
function VerticalSliderController(
    $interval,
    $scope,
    $state,
    $timeout,
    DeviceRecommendationsService,
    EventEnums,
    StateManagement
) {
    var $ctrl = this;
    var interval;
    var swiper;

    $ctrl.$onDestroy = $onDestroy;

    function $onDestroy() {
        if (interval) {
            $interval.cancel(interval);
        }
    }

    $scope.$on(EventEnums.ENUMS.SPECS_SLIDER_CTA, function (event, data) {
        // This happens every time an update is received from the specs slider,
        // content may not have actually changed but the specs slider has been
        // interacted with in some way.
        var brackets = data.brackets;

        $scope.devices = [];

        if (brackets && $scope.bracket-1 < brackets.length) {
            $scope.devices = brackets[$scope.bracket-1];
        }

        $timeout(function () {
            _init();
            _broadcastSlideChange(0);
        }, 0);
    });

    $scope.$watch(function () {
        return swiper ? swiper.activeIndex : null;
    }, function (newVal) {
        if (newVal !== null) {
            _broadcastSlideChange(newVal);
        }
    });

    function _init() {
        if (swiper) {
            swiper.destroy(true, true);
        }

        if ($scope.devices.length >= 1) {
            swiper = new Swiper('.swiper-container-' + $scope.bracket, {
                direction: $scope.direction,
                pagination: '.swiper-pagination-' + $scope.bracket,
                paginationClickable: true,
                autoHeight: true
            });

            if ($scope.bracket === '1') {
                if (interval) {
                    $interval.cancel(interval);
                }
                interval = $interval(angular.noop, 500);
            }
        }
    }

    function _broadcastSlideChange(activeIndex) {
        $scope.$root.$broadcast(
            EventEnums.ENUMS.SWIPER_SLIDE_CHANGE,
            {
                bracketId: $scope.bracket,
                activeIndex: activeIndex
            }
        );
    }

    $scope.goToPDP = function goToPDP(device, link) {
        StateManagement.setDevice('device', device);
        link = link.replaceHTMLSuffix();
        $state.go(link);
    };

    $scope.addToBasket = function addToBasket(proposition, link, bracket, item) {
        var directionKeys = StateManagement.journeyGetDirectionKeys();

        $scope.$root.$broadcast(
            EventEnums.ENUMS.SELECT_PROPOSITION,
            {
                bracket: parseInt(bracket),
                itemIndex: item,
                proposition: proposition
            });
        DeviceRecommendationsService.addToBasket(proposition);
        StateManagement.setDevice('device', proposition.device.id);
        StateManagement.journeySetDirection(directionKeys.NEXT);
        link = link.replaceHTMLSuffix();
        $state.go(link);
    };
}
