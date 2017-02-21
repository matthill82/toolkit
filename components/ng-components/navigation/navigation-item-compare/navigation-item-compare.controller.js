angular.module('uitoolkit')
    .controller('NavigationItemCompareController', function ($scope, $rootScope, $state, StateManagement) {
        var vm = this;

        $rootScope.numberCompareItems = 0;
        vm.goToLink = goToLink;

        setNumberCompare();

        function setNumberCompare() {
            var items = StateManagement.getCompareBasketNumberOfItems();
            if (items === undefined) {
                items = 0;
            }
            $rootScope.numberCompareItems = items;
        }

        function goToLink(link) {
            if(!$rootScope.numberCompareItems) {
                return;
            }

            $scope.$emit(window.ENUMS.EVENTS.EMIT.ON_MENU_ITEM_CLICK, false);
            link = link.replaceHTMLSuffix();
            $state.go(link);
        }



    });
