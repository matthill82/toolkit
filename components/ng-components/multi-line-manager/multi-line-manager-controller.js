angular.module('uitoolkit')
    .controller('MultiLineManagerController', MultiLineManagerController);

/**
 *
 * @param $document
 * @param $scope
 * @param $timeout
 * @param $uibModal
 * @param {EventEnums} EventEnums
 * @param {MultiLineService} MultiLineService
 * @constructor
 */
function MultiLineManagerController($document, $scope, $timeout, $uibModal, EventEnums, MultiLineService) {
    var $ctrl = this;
    var dragged;
    var draggedIndex;

    $ctrl.$onInit = $onInit;
    $ctrl.setPaymentOption = setPaymentOption;
    $ctrl.toggleCustomer = toggleCustomer;
    $ctrl.removeCustomer = removeCustomer;
    $ctrl.isNumber = angular.isNumber;

    /**
     *
     */
    function $onInit() {
        var newCustomers;

        $ctrl.isPaymentOptionsVisible = false;
        $ctrl.groupingEnabled = $ctrl.grouping === 'true';

        $ctrl.customers = MultiLineService.getCustomers();

        $scope.$on(EventEnums.ENUMS.MULTI_LINE_UPDATE_CUSTOMERS, function (event, customers) {
            $ctrl.customers = customers;
        });

        $scope.$on(EventEnums.ENUMS.SELECT_DEVICE, function (event, data) {
            MultiLineService.setDevice(data.hBPropositionDevice, data.hBSelectedColor, data.hBfFullName);
        });

        $scope.$on(EventEnums.ENUMS.SELECT_DATA, function (event, data) {
            MultiLineService.setDataMB(data.hBdataMB, data.hBdataMBSliders);
        });

        if ($ctrl.customersData && !$ctrl.customers.length) {
            newCustomers = angular.fromJson($ctrl.customersData);

            MultiLineService.setCustomers(newCustomers.customers);
        }

        if ($ctrl.groupingEnabled) {
            initDragAndDrop();
        }
    }

    $ctrl.$onDestroy = function () {
        if ($ctrl.groupingEnabled) {
            $document.off('touchstart', touchStart);
            $document.off('touchend', touchEnd);
        }
    };

    /**
     *
     * @param customerId
     * @param paymentOptionKey
     */
    function setPaymentOption(customerId, paymentOptionKey) {

        MultiLineService.setCustomerSelectedPaymentOption(customerId, paymentOptionKey);

    }

    /**
     *
     * @param index
     */
    function toggleCustomer(index){

        MultiLineService.toggleCustomer(index);

    }

    /**
     *
     * @param index
     */
    function removeCustomer(index) {

        $uibModal.open({
            animation: true,
            size: 'sm type-warning',
            scope: $scope,
            templateUrl: '/components/ng-components/multi-line-manager/multi-line-manager-modal.html',
            controller: function ($scope, $uibModalInstance) {
                $scope.clearModalTitle = $ctrl.removeDialogTitle;
                $scope.clearModalMsg = $ctrl.removeDialogText;
                $scope.clearModalYesLabel = $ctrl.removeDialogOk;
                $scope.clearModalNoLabel = $ctrl.removeDialogCancel;

                $scope.ok = function () {
                    $uibModalInstance.close();
                    MultiLineService.removeCustomer(index);
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

    }

    /**
     *
     */
    function initDragAndDrop() {

        $document.bind('touchstart', touchStart);
        $document.bind('touchend', touchEnd);

    }

    /**
     *
     * @param e
     */
    function touchStart(e) {
        dragged = $(e.target).closest('.ml-customers-tile');

        if (dragged.length) {

            draggedIndex = dragged.index();

            $timeout(function () {
                // Don't show dragging visual feedback if it's just a tap
                if (dragged && dragged.length) {
                    $scope.$apply(function () {
                        $ctrl.dragged = true;
                        $ctrl.draggedIndex = draggedIndex;
                        $ctrl.isDraggedInAGroup = angular.isNumber($ctrl.customers[draggedIndex].groupId);
                        $ctrl.newGroupId = MultiLineService.findNewGroupId(parseInt($ctrl.maxNumberGroups));
                    });
                }
            }, 150);

        } else {
            clear();
        }
    }

    /**
     *
     * @param e
     */
    function touchEnd(e) {
        var changedTouch;
        var dropArea;
        var existingGroupId;

        if ($ctrl.dragged) {
            changedTouch = e.changedTouches[0];
            dropArea = $(document.elementFromPoint(changedTouch.clientX, changedTouch.clientY));

            if (dropArea.hasClass('dropzone')) {
                if (dropArea.hasClass('ml-dots-customer')) {
                    existingGroupId = parseInt(dropArea.attr('group-id'));

                    MultiLineService.setCustomerGroup(draggedIndex, existingGroupId);

                } else if (dropArea.hasClass('ml-dots-add')) {

                    MultiLineService.createGroup(draggedIndex, $ctrl.newGroupId);

                } else if (dropArea.hasClass('ml-dots-remove')) {

                    MultiLineService.removeCustomerFromGroup(draggedIndex);

                }
            }
        }

        clear();
    }

    /**
     *
     * @private
     */
    function clear() {
        $scope.$apply(function () {
            $ctrl.dragged = false;
            $ctrl.draggedIndex = -1;
            $ctrl.isDraggedInAGroup = null;
            $ctrl.newGroupId = null;
        });
        dragged = null;
        draggedIndex = null;
    }
}
