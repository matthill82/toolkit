angular.module('uitoolkit')
    .directive('leftNavigation', function () {

        return {
            restrict: 'E',
            replace: true,
            scope: true,
            controller: 'LeftNavigationController',
            controllerAs: 'LeftNavigationController',
            templateUrl: '/components/ng-components/left-navigation/left-navigation.html',
            link: function (scope, element, attr) {
                scope.navigationItems = [
                    {
                        'routes' : attr.lnWelcomeRoutes,
                        'title'  : attr.lnWelcomeText,
                        'icon'   : attr.lnWelcomeIcon,
                        'default': attr.lnWelcomeDefault
                    },
                    {
                        'routes' : attr.lnAboutRoutes,
                        'title'  : attr.lnAboutText,
                        'icon'   : attr.lnAboutIcon,
                        'default': attr.lnAboutDefault
                    },
                    {
                        'routes' : attr.lnBuildRoutes,
                        'title'  : attr.lnBuildText,
                        'icon'   : attr.lnBuildIcon,
                        'default': attr.lnBuildDefault
                    },
                    {
                        'routes' : attr.lnReviewRoutes,
                        'title'  : attr.lnReviewText,
                        'icon'   : attr.lnReviewIcon,
                        'default': attr.lnReviewDefault
                    }
                ];

                scope.$root.leftNavAllStates = scope.$root.leftNavAllStates || [];

                angular.forEach(scope.navigationItems, function (navItem) {
                    if (typeof navItem !== 'undefined') {
                        if (typeof navItem.routes !== 'undefined') {
                            var states = navItem.routes.split(/\s*,\s*/);

                            angular.forEach(states, function (state) {
                                if (scope.$root.leftNavAllStates.indexOf(state) === -1) {
                                    scope.$root.leftNavAllStates.push(state);
                                }
                            });
                        }
                    }
                    
                });
            }
        };
    });
