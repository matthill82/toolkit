/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .controller('LeftNavigationController', function ($scope, $rootScope, $state, $timeout) {

        var vm = this;
        var presentState = $state.current.name;

        vm.isIconActive = isIconActive;
        vm.goToIconState = goToIconState;

        function isIconActive(routes) {
            var routesArray = stringIntoArray(routes);
            return routesArray.indexOf(presentState) !== -1;
        }

        function goToIconState(link) {
            link = link.replaceHTMLSuffix();
            $state.go(link);
        }

        function stringIntoArray (_string){
            var stringRemoveSpaces = _string.replace(/\s/g, '');
            return stringRemoveSpaces.split(',');
        }

        function checkForLeftNav (state) {
            if ($rootScope.leftNavAllStates) {
                $rootScope.showLeftNav = $rootScope.leftNavAllStates.indexOf(state) !== -1;
            } else {
                $rootScope.showLeftNav = false;
            }
        }


        $timeout(function () {
                checkForLeftNav($state.current.name)
            }, 0);

        // Event handlers
        $rootScope.$on('$stateChangeStart',
            function(event, toState){
                checkForLeftNav(toState.name);
            });

    });
