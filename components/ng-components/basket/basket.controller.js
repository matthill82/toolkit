angular.module('uitoolkit')
    .controller('BasketController', BasketController);

function BasketController($scope, $state, DeviceService, StateManagement) {
        var vm = this;
        var KEY_PLAN = 'plan';
        var KEY_COLOUR = 'deviceColour';
        var KEY_CAPACITY = 'deviceCapacity';

        vm.device = null;
        vm.imagePath = '';
        vm.colourName = '';
        vm.capacity = '';
        vm.deviceObj = null;
        vm.completeTransaction = completeTransaction;

        loadSavedPlan();

        function completeTransaction(device, link) {
            link = link.replaceHTMLSuffix();
            $state.go(link);
        }
        function applyDeviceData(product) {
            var colourIndex;
            vm.deviceObj = product;

            var colourNameSaved = StateManagement.getData(KEY_COLOUR);
            colourIndex = getIndexOfSavedColour(colourNameSaved);
            vm.colour = colourIndex;

            if (vm.colour !== null) {
                if (typeof vm.deviceObj.available_colours !== 'undefined') {
                    vm.imagePath = vm.deviceObj.available_colours[colourIndex].imagery[0].url;
                    vm.colourName = vm.deviceObj.available_colours[colourIndex].name;
                }
            }

            var regexp = /^"?(.+?)"?$/;
            var capacityNameSaved = StateManagement.getData(KEY_CAPACITY);
            capacityNameSaved = capacityNameSaved.replace(regexp,'$1');

            if (capacityNameSaved !== 'null') {
                vm.capacity =  capacityNameSaved;
            }
        }

        function applyPlanData(result) {
            applyDeviceData(result.queryResult[0].device);
            vm.planObj = result;
        }

        function getIndexOfSavedColour(colourNameSavedStr) {
            var regexp = /^"?(.+?)"?$/;
            var colourNameSaved = colourNameSavedStr.replace(regexp,'$1');

            if (typeof vm.deviceObj.available_colours !== 'undefined') {
                for (var i = 0; i < vm.deviceObj.available_colours.length; i++) {
                    var colourItem = vm.deviceObj.available_colours[i].name;
                    if (colourItem.indexOf(colourNameSaved) >= 0) {
                        return i;
                    }
                }
            }
        }

        function loadSavedPlan() {
            //var deviceId = StateManagement.getDevice(KEY_DEVICE);
            //var deviceColour = StateManagement.getData(KEY_COLOUR);
            var planId = StateManagement.getPlan(KEY_PLAN);

            //deviceId = deviceId.replace(DOUBLE_QUOTE_REGEX,'$1');
            //deviceColour = deviceColour.replace(DOUBLE_QUOTE_REGEX,'$1');
            //planId = planId.replace(DOUBLE_QUOTE_REGEX,'$1');

            if (planId === null){
                $scope.emptyBasket = true;
            }
            else {
                DeviceService.findPropositionById(planId)
                    .then(
                        function (response) {
                            var results = response;
                            applyPlanData(results);
                        }
                    );
                }
            }

}
