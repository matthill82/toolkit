/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .controller('qrCodeController', function ( $uibModal, $scope, $state) {

        var vm = this;

        vm.qrModal = qrModal;

        function qrModal() {

            $uibModal.open({

                animation: true,
                size: 'sm type-warning',
                scope: $scope,
                templateUrl: '/components/ng-components/qrCode/qrCode-modal.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.ok = function () {
                        $uibModalInstance.close();
                        $state.go('home');
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            });

        }


    })
;
