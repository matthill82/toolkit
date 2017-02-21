/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')

    .controller('CommonController', function ($scope, $rootScope, $state, $timeout,StateManagement) {
        var HTML_SUFFIX = '.html';
        var SEPARATOR = ',';
        var lastHome = '';

        $rootScope.block_notifications = false;

        function preventDispatch(timeout) {
            if(typeof(timeout)=='undefined'){
                timeout=100;
            }
            if ($rootScope.block_notifications === false)
            {
                $rootScope.block_notifications = true;
                $timeout(function () {
                    $rootScope.block_notifications = false;
                }, timeout)
                return false;
            }else
            {
                return true;
            }
        }

        window.ENUMS = {
            EVENTS: {
                EMIT: {
                    NOTIFY: 'notify',
                    CLEAR_SESSION_DATA: 'clearSessionData',
                    RELOAD_DEVICE_DATA: 'reloadDeviceData',
                    ON_MENU_ITEM_CLICK: 'onMenuItemClick',
                    ON_BURGER_MENU_CLICK: 'onBurgerMenuClick',
                    SLIDER_UPDATE: 'sliderUpdate',
                    SLIDERS_UPDATED: 'slidersUpdated',
                    WIFI_SLIDER_UPDATE: 'wifiSliderUpdate',
                    WIFI_SLIDERS_UPDATED: 'wifiSliderFinishedUpdated',
                    ADD_REMOVE_COMPARE: 'addRemoveCompare',
                    HB_SUBMIT: "hbSubmit",
                    PERFORM_SEARCH:'perform_search',
                    CLEAR_DEVICE_RESULTS:'CLEAR_DEVICE_RESULTS',
                    CONNECT_SEARCH:'CONNECT_SEARCH',
                    ORDER_STOCK:'ORDER_STOCK',
                    APP_UPDATES_FOUND:'appUpdatesFound',
                    APP_UPDATES_INSTALLED:'appUpdatesInstalled',
                    APP_UPDATES_ERROR:'appUpdatesError'
                },
                RECEIVE: {
                    CLEAR_SESSION_DATA_CONTAINER: 'clear-session-data-container',
                    CLEAR_SESSION_DATA: 'clear-session-data',
                    CLEAR_DATASWARM_DATA: 'clear-dataswarm-data',
                    RELOAD_DEVICE_DATA: 'reload-device-data',
                    CONTROL_LEFT_MENU_SLIDE_EVENT: 'control-left-menu-slide-event',
                    SLIDER_UPDATED: 'slider-updated',
                    WIFI_SLIDER_UPDATED: 'wifi-slider-updated',
                    WIFI_SLIDERS_FINISHED_UPDATED: 'wifi-slider-finish-updated',
                    SLIDERS_UPDATED: 'sliders-updated',
                    COMPARE_BASKET_UPDATE: 'compareBasketUpdate',
                    RECEIVE_SEARCH_RESULTS:'search_results',
                    CLEAR_DEVICE_RESULTS:'RECEIVE_CLEAR_DEVICE_RESULTS',
                    CONNECT_SEARCH:'RECEIVE_CONNECT_SEARCH',
                    ORDER_STOCK:'ORDER_STOCK',
                    APP_UPDATES_FOUND:'app-updates-found',
                    APP_UPDATES_INSTALLED:'app-updates-installed',
                    APP_UPDATES_ERROR:'app-updates-error'

                }
            },
            DEVICE_KEYS: {
                COMPARE_BASKET: 'compareBasket',
                DEVICE: 'device',
                DEVICE_COLOUR: 'deviceColour',
                DEVICE_CAPACITY: 'deviceCapacity',
                PRESELECTED_DEVICE: 'preselectedDevice',
                KEY_PLAN: 'plan',
                FEATURE_CONN: 'Connectivity',
                FEATURE_CONN_3G: '3G',
                FEATURE_CONN_4G: '4G',
                GB: 'GB',
                MB: 'MB',
                DATA_MB: 'dataMB',
                DATA_GB: 'dataGB',
                PLAN: 'plan',
            },
            ERROR: {
                ERROR_INVALID_LOGIN: 'invalid_login',
                ERROR_SESSION_TIMEOUT: 'session_timed_out',
                ERROR_TYPE: 'error'
            }
        };
        $rootScope.testMode = false;
        $scope.$state = $state;
        $scope.show_overlay = false;
        $rootScope.updatesOn = localStorage.getItem("app-updates-available");


        /////////////////////////////////////////////////////////////////
        $scope.overlayClicked = function () {
            $scope.show_overlay = false;
            $scope.$broadcast('control-left-menu-slide-event', false);
        };


        //always replace the HTML suffix. To be called before state.go()
        String.prototype.replaceHTMLSuffix = function () {
            return this.replace(HTML_SUFFIX, '');
        };

        //$scope.switchTestMode = function (){
        //    $rootScope.testMode = !$rootScope.testMode;
                        //};

        $scope.getHomeClass = function (homeRoutes) {
            var homeRoutesArray = homeRoutes.split(SEPARATOR);
            var ret = false;
            for (var c = 0; c < homeRoutesArray.length; c++) {

                var homeRoute = homeRoutesArray[c];
                if ($state.includes(homeRoute)) {
                    if(lastHome!==homeRoute){
                        StateManagement.clearDataExceptLogic();
                       clearSessionData();
                    }
                    lastHome=homeRoute;

                    return true;
                } else {
                    ret = false;
                }
            }
            return ret;
        };


        $scope.getLoginClass = function (loginRoutes) {
            var loginRoutesArray = loginRoutes.split(SEPARATOR);

            for (var c = 0; c < loginRoutesArray.length; c++) {
                var loginRoute = loginRoutesArray[c];
                if ($state.includes(loginRoute)) {
                    return true;
                } else {
                    return false;
                }
            }
        };



        function clearSessionData(){
            $timeout(function () {
                $rootScope.$broadcast(window.ENUMS.EVENTS.RECEIVE.CLEAR_SESSION_DATA_CONTAINER, {});
            }, 300);
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.CLEAR_SESSION_DATA, {});
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.CLEAR_DATASWARM_DATA, {});
        }
        $scope.$on(window.ENUMS.EVENTS.EMIT.CLEAR_SESSION_DATA, function () {
            clearSessionData();
        });

        $rootScope.$on(window.ENUMS.EVENTS.EMIT.PERFORM_SEARCH, function (event, data) {
            if(preventDispatch()){return;}
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.RECEIVE_SEARCH_RESULTS, data);
        });

        $scope.$on(window.ENUMS.EVENTS.EMIT.RELOAD_DEVICE_DATA, function (event, data) {
            event = null;

            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.RELOAD_DEVICE_DATA, data);
        });
        $scope.$on(window.ENUMS.EVENTS.EMIT.ON_MENU_ITEM_CLICK, function () {
            $scope.show_overlay = false;
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.CONTROL_LEFT_MENU_SLIDE_EVENT, false);
        });
        $scope.$on(window.ENUMS.EVENTS.EMIT.ON_BURGER_MENU_CLICK, function (event, mass) {
            event = null;
            $scope.show_overlay = mass;
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.CONTROL_LEFT_MENU_SLIDE_EVENT, mass);
        });
//SLIDER
        $scope.$on(window.ENUMS.EVENTS.EMIT.SLIDER_UPDATE, function (event, mass) {
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.SLIDER_UPDATED, mass);
        });
        $scope.$on(window.ENUMS.EVENTS.EMIT.WIFI_SLIDER_UPDATE, function (event, mass) {
            event = null;
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.WIFI_SLIDER_UPDATED, mass);
        });
        $scope.$on(window.ENUMS.EVENTS.EMIT.WIFI_SLIDERS_UPDATED, function (event, mass) {
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.WIFI_SLIDERS_FINISHED_UPDATED, mass);
        });
        $scope.$on(window.ENUMS.EVENTS.EMIT.SLIDERS_UPDATED, function (event, mass) {
            event = null;
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.SLIDERS_UPDATED, mass);
        });
        $scope.$on(window.ENUMS.EVENTS.EMIT.CONNECT_SEARCH, function (event, mass) {
            if(preventDispatch()){return;}

            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.CONNECT_SEARCH, mass);
        });
        $scope.$on(window.ENUMS.EVENTS.EMIT.CLEAR_DEVICE_RESULTS, function (event, mass) {
            event = null;
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.CLEAR_DEVICE_RESULTS, {});
        });
        $scope.$on(window.ENUMS.EVENTS.EMIT.APP_UPDATES_FOUND, function () {
            $scope.$broadcast(window.ENUMS.EVENTS.RECEIVE.APP_UPDATES_FOUND);
        });
    });
