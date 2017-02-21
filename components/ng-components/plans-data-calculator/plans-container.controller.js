/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */


angular.module('uitoolkit')
    .controller('PlansContainerController', function (DeviceService, PlanService, $scope, StateManagement, $window, $rootScope, $timeout, $state, EventBroadcastService, EventEnums, $filter) {
        var KEY_DATA = 'dataMB';
        var vm = this;

        vm.calculateTotal = calculateTotal;
        vm.getTotalMonthlyUsage = getTotalMonthlyUsage;
        vm.viewPlans = viewPlans;
        vm.multilineAllSame = false;
        
        //vm.toggleFutureProof = toggleFutureProof;

        function setAllSame(customers) {
            var selectedCustomers = $filter('filter')(customers, {selected: true});

            if (selectedCustomers.length) {
                var sameData = true;
                var selectedData = {
                    hBdataMB: selectedCustomers[0].selections.hBdataMB,
                    hBdataMBSliders: selectedCustomers[0].selections.hBdataMBSliders
                };

                // Check if all customers have same data
                angular.forEach(selectedCustomers, function (customer) {
                    if (selectedData.hBdataMB !== customer.selections.hBdataMB ||
                        angular.equals(selectedData.hBdataMBSliders, customer.selections.hBdataMBSliders) === false) {
                        sameData = false;
                    }
                });
                if (sameData) {
                    //console.log('update sliders with these values', selectedData);
                    return true;
                } else {
                    //console.log('zero sliders');
                    return false;
                }
            } else {
                //console.log('no customers selected - reset sliders');
                return false;
            }
        }

        $scope.initialize = function (_showFutureProofDetail_, _contentUrl_) {
            vm.showFutureProofDetail = _showFutureProofDetail_ !== 'false';
            vm.panelContentUrl = _contentUrl_;
            vm.individuals = StateManagement.getCustomers('multiline');
            if(vm.individuals) {
                vm.multilineAllSame = setAllSame(vm.individuals);
                $scope.$broadcast('initialiseSlider', vm.individuals);
            }
        };

        $scope.$on(EventEnums.ENUMS.MULTI_LINE_UPDATE_CUSTOMERS, function (event, customers){
            vm.multilineAllSame = setAllSame(customers);
            vm.individuals = customers;
        });

        function viewPlans(selectedData, link, actionMode, sliderObj) {
            if (actionMode === 'broadcast') {
                $scope.$root.$broadcast(EventEnums.ENUMS.SELECT_DATA, {
                    hBdataMB: angular.copy(selectedData),
                    hBdataMBSliders: angular.copy(sliderObj)
                });
            }
            else {
                if (selectedData > 1024) {
                    selectedData = selectedData - (selectedData % 1024);
                }
                StateManagement.saveData(KEY_DATA, selectedData);

                link = link.replaceHTMLSuffix();
                $state.go(link);
            }
        }

        function calculateTotal(value, sliderId) {
            if (sliderId !== 'undefined') {
                var valueNum = parseFloat(value);// / 1024; //always calculate to total GB value.
                PlanService.calculateTotalDataUsagePerMonth(valueNum, sliderId);
            }
            getTotalMonthlyUsage();
        }

        function getTotalMonthlyUsage() {
            var total = 0;
            $timeout(function () { //Need a delay so we have enough time for values to be registered
                total = PlanService.totalDataUsagePerMonth();
                return total;
            }, 300);
        }

    })
;
