angular.module('uitoolkit')
    .directive('navigationItemLogout', navigationItemLogoutDirective);

/**
 * @param {DsEventService} DsEventService
 */
function navigationItemLogoutDirective(DsEventService) {
    return {
        replace: true,
        scope: {
            data: '='
        },
        templateUrl: '/components/ng-components/navigation/navigation-item-logout/navigation-item-logout.html',
        link: function (scope, element, attr) {
            scope.logoutTitle = attr.nilogLabel;
            scope.logoutPath = attr.nilogPath;
            scope.logoutModalTitle = attr.nilogModalTitle;
            scope.logoutModalText = attr.nilogModalText;
            scope.logoutModalOkLabel = attr.nilogModalOkLabel;
            scope.logoutModalCancelLabel = attr.nilogModalCancelLabel;
            scope.serviceUrl = attr.nilogServiceUrl;
            scope.titleIcon = attr.nilogTitleIcon;
        },
        controller: function ($scope, UitModalService, $state, $window, $http) {
            $scope.goToLink = goToLink;
            $scope.logout = logout;
            function logout() {
                UitModalService.showModal({
                    size: 'sm',
                    params: {
                        titleIcon: $scope.titleIcon,
                        title: $scope.logoutModalTitle,
                        message: $scope.logoutModalText,
                        submitLabel: $scope.logoutModalOkLabel,
                        cancelLabel: $scope.logoutModalCancelLabel
                    }

                }).then(function () {
                    DsEventService.logout();
                    $http({
                        method: 'GET',
                        url: $scope.serviceUrl,
                        data: '',
                        headers: {'Content-Type': 'text/html'}
                    }).success(function () {
                        goToLink($scope.logoutPath);
                    });
                });
            }

            function goToLink(link) {
                $scope.$emit($window.ENUMS.EVENTS.EMIT.ON_MENU_ITEM_CLICK, false);
                link = link.replaceHTMLSuffix();
                $state.go(link);
            }

        }
    };
}
