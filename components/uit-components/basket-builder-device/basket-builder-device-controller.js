angular
    .module('uitoolkit')
    .controller('BasketBuilderDeviceController', function ($scope, $document, EventEnums, BasketService, $window, ImageService, $state) {
        'use strict';

        var $ctrl = this;
        $ctrl.panelName = 'device';

        $ctrl.$onInit = $onInit;
        $ctrl.$onChanges = $onChanges;
        $ctrl.handleClick = handleClick;
        $ctrl.goTo = goTo;

        function $onChanges() {
            $ctrl.expand = $ctrl.panelOpen === $ctrl.panelName;
        }

        function handleClick($event) {
            if (!$ctrl.expand) {
                $scope.$root.$broadcast($window.ENUMS.EVENTS.EMIT.BASKET_BUILDER_RESIZE, $ctrl.panelName);
            } else {
                $event.stopPropagation();
            }
        }

        function $onInit() {
            $ctrl.panelName = 'device';
            if(BasketService.getBasket().length) {
                $ctrl.model = BasketService.getBasket().findPropositionsWithDevices()[0];
                $ctrl.setImage = ImageService.findDeviceImage($ctrl.model.data.device.imagery, 1);
            }
        }

        function goTo(route) {
            $state.go(route.replaceHTMLSuffix());
        }

    });
