/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .directive('navigationList',function () {
        return {
            scope: {
                'data': '='
            },
            replace: true,
            templateUrl: '/components/ng-components/navigation/navigation-list/navigation-list.html',  
            link: function (scope, element, attr){
                scope.category = attr.nlCategory;
                scope.closedIconClass = attr.nlClosedIconClass;
                scope.openIconClass = attr.nlOpenIconClass;
                scope.preselectEnabled = attr.nlEnablePreselect;
                scope.iconClass = scope.closedIconClass;
                scope.navList = scope.data;
            },
            controller: function ($scope, $element, StateManagement, $state, $window,$timeout, $location) {
                   var EXT_HTML = '.html';
                   var CSS_SELECTED = 'selected';
                    var TYPE_DEVICE = 'DEVICE';
                    var TYPE_MEDIA = 'MEDIA';
                    var PRESELECT_ENABLED_CLASS = 'preselect-menu';
                    var PATH_SUFFIX = 'END';

                    $scope.expanded = true;
                    $scope.primaryOpen = false;
                    $scope.isSelected = false;
                    $scope.deepLink = goToNextPage;
                    $scope.isCurrentPath = isCurrentPath;
                    $scope.isCurrentPathInList = isCurrentPathInList;
                    $scope.isPreselectEnabled = isPreselectEnabled;



                $scope.expanded = false;
                $scope.primaryOpen = false;
                $scope.isSelected = false;


                $timeout(function() {


                    var hs = $element.hasClass(PRESELECT_ENABLED_CLASS);
                    if (hs === false) {
                       $timeout(function(){$scope.expanded = false; },100);
                    } else {
                        $timeout(function () {
                            if ($scope.isSelected) {
                                $scope.expanded = true;
                                $scope.primaryOpen = true;
                                $element.addClass('active');
                            } else {
                                $scope.expanded = false;
                                $scope.primaryOpen = false;
                                $element.removeClass('active');
                            }
                        }, 100);
                    }
                },100);



                        $scope.menu = function () {
                            $scope.primaryOpen = $scope.primaryOpen ? false : true;

                            if ($scope.primaryOpen) {
                                $element.addClass('active');
                                $scope.iconClass ='';
                                $timeout(function(){ $scope.iconClass = $scope.openIconClass;},100)
                                $scope.expanded = true;
                            } else {
                                $element.removeClass('active');
                                $scope.iconClass ='';
                                 $timeout(function(){ $scope.iconClass = $scope.closedIconClass;},100)
                                $scope.expanded = false;
                            }
                        }

                        $scope.getIconClass = function(item) {
                            var iconclass = '';
                            if (item.type === TYPE_MEDIA) {
                                if (typeof item.icon !== 'undefined') {
                                    iconclass = item.icon;
                                }
                            }
                            return iconclass;
                        }


                        function isPreselectEnabled(preselect) {
                            var css = '';
                            if (typeof preselect !== 'undefined') {
                                if (preselect.indexOf('true') > -1) {
                                    css = PRESELECT_ENABLED_CLASS;
                                }
                            }
                            return css;
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

                        function isCurrentPathInList(navItems) {
                            var cp = $location.path() + PATH_SUFFIX;

                            if (typeof navItems !== 'undefined') {
                                for (var i = 0; i < navItems.length; i++) {
                                    var navitem = navItems[i];
                                    var path = navitem.cta;
                                    path = path.replace(EXT_HTML, '');
                                    path = path + PATH_SUFFIX;

                                    if (cp.charAt(0) === '/') {
                                        path = '/' + path;
                                    }

                                    if (path.indexOf(cp) > -1) {
                                        $element.addClass('active');
                                        $scope.isSelected = true;
                                    }
                                }
                            }
                        }
                        
                        function goToNextPage(itemId, link, itemType) {
                            $scope.$emit(window.ENUMS.EVENTS.EMIT.ON_MENU_ITEM_CLICK, false);
                            
                            if (itemType === TYPE_DEVICE) {
                                if (itemId !== null) {
                                    StateManagement.setDevice('device', itemId);
                                    $scope.$emit(window.ENUMS.EVENTS.EMIT.RELOAD_DEVICE_DATA,false); 
                                }
                            }

                            link = link.replaceHTMLSuffix();
                            $state.go(link); 
                        }
                    }
                }
            })
;
