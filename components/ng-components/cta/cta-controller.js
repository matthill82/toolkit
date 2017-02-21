angular
    .module('uitoolkit')
    .controller('CtaController', CtaController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {$state} $state
 * @param {$window} $window
 * @param {object} EventEnums
 * @param {StateManagement} StateManagement
 * @constructor
 */
function CtaController($scope, $state, $window, EventEnums, StateManagement) {
    var $ctrl = this;
    var directionKeys = StateManagement.journeyGetDirectionKeys();

    $ctrl.currentLink = $ctrl.link;

    $ctrl.goToPage = goToPage;

    _init();

    function goToPage() {
        if ($ctrl.usePrevious) {
            $window.history.back();
        } else {
            if ($ctrl.currentLink) {
                if ($ctrl.direction) {
                    StateManagement.journeySetDirection($ctrl.direction);
                }

                $state.go($ctrl.currentLink.replaceHTMLSuffix());
            }
        }
    }

    function _init() {
        switch($ctrl.direction) {
        case directionKeys.NEXT:
            $ctrl.isButtonDisabled = true;
            break;

        case directionKeys.BACK:
        default:
            $ctrl.isButtonDisabled = false;
        }

        if ($ctrl.direction) {
            $scope.$on(EventEnums.ENUMS.CTA_BUTTON_UPDATE, function (event, data) {
                if (data.direction === $ctrl.direction) {
                    $ctrl.isButtonDisabled = data.disabled;

                    $ctrl.currentLink = data.link ? data.link : $ctrl.link;
                }
            });

            $scope.$on(EventEnums.ENUMS.CTA_BUTTON_TRIGGER, function (event, data) {
                if (data.direction === $ctrl.direction) {
                    $ctrl.goToPage();
                }
            });
        }
    }
}
