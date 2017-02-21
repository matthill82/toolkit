angular.module('uitoolkit')
    .controller('NavigationInpageMenuController', NavigationInpageMenuController);

function NavigationInpageMenuController($document, $rootScope, $scope, $timeout) {
    var deRegister;
    var $ctrl = this;

    $scope.hasItems = false;

    function checkForInpageNav() {
        $rootScope.showInpageNav = $scope.hasItems;
    }

    $timeout(function () {
        checkForInpageNav();
    }, 0);

    // Event handlers
    deRegister = $scope.$root.$on('$stateChangeStart', function () {
        if (!$document[0].webkitFullscreenElement) {
            $scope.hasItems = false;
            checkForInpageNav();
        }
    });

    $ctrl.$onDestroy = function () {
        deRegister();
    };
}
