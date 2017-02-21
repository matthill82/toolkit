

angular.module('uitoolkit')
    .directive('navigationItemUpdates', function ($window) {

        return {
            replace: true,
            scope: {
                'data': '='
            },
            templateUrl: '/components/ng-components/navigation/navigation-item-updates/navigation-item-updates.html',
                    link: function (scope, element, attr) {
                        
                        scope.linkPath = attr.nilPath;
                        scope.linkLabel = attr.nilLabel; 
                        scope.updatesFound=''; 
                          
                    },
                    controller: function ($scope /*, $state */) {
                        $scope.goToLink = goToLink;

                        function goToLink(link) {
                             // go to the page
                            
                            $scope.$emit(window.ENUMS.EVENTS.EMIT.ON_MENU_ITEM_CLICK, false);
                            // woraround problem where relative path is incorrect for sibling of root page
                            if (link.startsWith('/') && !link.startsWith('/content')) {
                                console.log('link should be relative or to /content');
                                link = link.replace('/', '');
                            }
                            $window.location.href= link + '?navigation=true';
 
                        }
                        $scope.$on(window.ENUMS.EVENTS.RECEIVE.APP_UPDATES_FOUND, function (event) {
                            var e = event;
                            console.log('Nav Item Updates has recevied notification that an update exists'+e);
                              
                            $scope.updatesFound='found'; 
                        })
                        $scope.$on(window.ENUMS.EVENTS.RECEIVE.APP_UPDATES_INSTALLED, function (event) {
                            var e = event;
                            console.log('Nav Item Updates has recevied notification that an update installed '+e);
                              
                            $scope.updatesFound=''; 
                        })
            }
        }
    })
;
