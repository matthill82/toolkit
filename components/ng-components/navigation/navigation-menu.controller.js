angular.module('uitoolkit')
    .controller('NavigationMenuController', function ($scope, $rootScope, StateManagement) {


        var cssClassNames = {
                compareMenuItem: '.dr-navigation-item-compare a',
                compareMenuItemCounter: '.num-compare-items',
                compareMenuItemDisabled: 'dr-navigation-link-compare-disabled',
                sideMenuOpen: 'sidemenu-open'
            };

        var $htmlEl = $('html');
        var $compareMenuItem = $(cssClassNames.compareMenuItem);

        function updateCompareMenuItem() {
            var newCount = StateManagement.getCompareBasketNumberOfItems();
            newCount = newCount || 0;

            $compareMenuItem.find(cssClassNames.compareMenuItemCounter).text(newCount);

            if (newCount === 0) {
                $compareMenuItem.addClass(cssClassNames.compareMenuItemDisabled);
            } else {
                $compareMenuItem.removeClass(cssClassNames.compareMenuItemDisabled);
            }
        }

        function openMenu() {
            updateCompareMenuItem();
            $htmlEl.addClass(cssClassNames.sideMenuOpen);
        }

        function closeMenu() {
            $htmlEl.removeClass(cssClassNames.sideMenuOpen);
            $scope.slide_out = false;
        }



        //
        // Handlers
        //
        $scope.onCloseMenuClick = function () {
            $scope.$emit(window.ENUMS.EVENTS.EMIT.ON_BURGER_MENU_CLICK, false);
        };


        //
        // Watchers
        //
        $rootScope.$on(window.ENUMS.EVENTS.RECEIVE.COMPARE_BASKET_UPDATE,function () {
            updateCompareMenuItem();
        });

        $scope.$on(window.ENUMS.EVENTS.RECEIVE.CONTROL_LEFT_MENU_SLIDE_EVENT,function (event, mass) {
            //mass==true, opens the menu
            $scope.slide_out = mass;
            if (mass) {
                openMenu();
            } else { //closes the menu
                closeMenu();
            }

        });
    
   
        
        

    });
