angular
    .module('uitoolkit')
    .controller('HeaderController', HeaderController);

function HeaderController($scope,
                          $state,
                          $window,
                          DsEventService,
                          EventEnums,
                          StateManagement,
                          UserService,
                          UtilityService,
                          UitModalService) {
    var $ctrl = this;
    var KEY_USER = 'hBuser';

    $ctrl.$onInit = $onInit;

    function $onInit() {

        $ctrl.headerType = !!angular.isDefined($ctrl.headerClass);

        $ctrl.LOGIN_TEMPLATE = 'uitoolkit/components/core/guided-sales/login';
        $ctrl.isLoginTemplate = false;
        $ctrl.showModalFlag = false;
        $ctrl.updatesFound = false;
        $ctrl.user = UserService.getUser();

        $ctrl.hasValidUser = hasValidUser;
        $ctrl.openBurgerMenu = openBurgerMenu;
        $ctrl.openRestart = openRestart;
        $ctrl.goToRoute = UtilityService.goToRoute;
    }

    $scope.$on(KEY_USER, function (event, args) {
        $ctrl.user = args;
    });

    $scope.$on($window.ENUMS.EVENTS.RECEIVE.APP_UPDATES_FOUND, function () {
        $ctrl.updatesFound = true;
    });

    $scope.$on($window.ENUMS.EVENTS.RECEIVE.APP_UPDATES_INSTALLED, function () {
        $ctrl.updatesFound = false;
    });

    function openBurgerMenu() {
        $scope.$root.$broadcast(EventEnums.ENUMS.ON_BURGER_MENU_CLICK, true);
    }

    function hasValidUser() {
        return $ctrl.user && $ctrl.user.meta && $ctrl.user.meta.formattedName;
    }

    function openRestart(isModalHidden, headerTemplate) {

        $ctrl.isLoginTemplate = 'true';

        if (isModalHidden !== 'true' && headerTemplate !== $ctrl.LOGIN_TEMPLATE) {
            UitModalService.showModal({
                size: 'sm',
                params: {
                    title: $ctrl.clearModalTitle,
                    message: $ctrl.clearModalMsg,
                    submitLabel: $ctrl.clearModalYesLabel,
                    cancelLabel: $ctrl.clearModalNoLabel
                }
            }).then(function () {
                clearAndRestartSession($ctrl.homePageLink);
            });
        }

    }

    function clearAndRestartSession(homePageLink) {
        StateManagement.clearDataExceptLogic();
        $scope.$emit('clearSessionData', {});
        DsEventService.sessionRestart($ctrl.user);
        if (homePageLink) {
            homePageLink = homePageLink.replaceHTMLSuffix();
            $state.go(homePageLink);
        }
    }

}
