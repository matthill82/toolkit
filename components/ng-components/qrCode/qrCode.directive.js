angular.module('uitoolkit')
    .directive('qrCode',function () {
 
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/qrCode/qrCode.html',
            controller: 'qrCodeController',
            controllerAs: 'qrCodeController',
            link: function (scope, element, attr){
                scope.modalTitle = attr.qrModalTitle;
                scope.modalText = attr.qrModalText;
                scope.modalYesLabel = attr.qrModalYesLabel;
                scope.modalNoLabel = attr.qrModalNoLabel;
                scope.header = attr.qrHeader;
                scope.thankYouMsg = attr.qrThankYou;
                scope.upgradeMsg = attr.qrUpgradeMsg;
                scope.buttonLabel = attr.qrButtonLabel;
            }
        };
});
