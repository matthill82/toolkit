

angular.module('uitoolkit')
    .directive('navigationItemMedia', function ($window) {

        return {
            replace: true,
            scope: {
                'data': '='
            },
            templateUrl: '/components/ng-components/navigation/navigation-item-media/navigation-item-media.html',
            link: function (scope, element, attr) {
                scope.linkPath = attr.nilPath;
                scope.linkLabel = attr.nilLabel;
                scope.linkIcon = attr.nilIcon;
            },
            controller: function ($scope, $state, $location) {
                var CSS_SELECTED = 'selected';
                var EXT_HTML = '.html';
                var PATH_SUFFIX = 'END';
                $scope.goToLink = goToLink;
                $scope.isCurrentPath = isCurrentPath;

                function goToLink(link) {
                    var externalLinkPattern = /^https?:\/\//i;
                    $scope.$emit(window.ENUMS.EVENTS.EMIT.ON_MENU_ITEM_CLICK, false);

                    if (externalLinkPattern.test(link)) {
                        $window.open(link, '_blank');
                    } else {
                        link = link.replaceHTMLSuffix();
                        $state.go(link);
                    }
                }


                function isCurrentPath(path) {
                    var cssclass = '';

                    if (typeof path !== 'undefined') {
                        path = path.replace(EXT_HTML,'');
                        path = path + PATH_SUFFIX;
                        var cp = $location.path() + PATH_SUFFIX;

                        if (cp.charAt(0) === '/') {
                            path = '/' + path;
                        }

                        if ( path.indexOf(cp) > -1 ) {
                            cssclass = CSS_SELECTED;
                        }
                    }
                    return cssclass;
                }
            }
        }
    })
;
