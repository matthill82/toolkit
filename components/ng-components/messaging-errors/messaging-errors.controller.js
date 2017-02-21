angular
    .module('uitoolkit')
    .controller('MessagingErrorsController', MessagingErrorsController);

/**
 *
 * @param {$rootScope.Scope} $scope
 * @param $templateCache
 * @param $timeout
 * @param {DsEventService} DsEventService
 * @param {EventEnums} EventEnums
 * @param toastr
 * @param toastrConfig
 * @constructor
 */
function MessagingErrorsController(
    $scope,
    $templateCache,
    $timeout,
    DsEventService,
    EventEnums,
    toastr,
    toastrConfig
) {
                var openedErrorToasts = [];

                $scope.iconClassName = '';
                $scope.block_notifications = false;

                $scope.$on(EventEnums.ENUMS.SHOW_TOAST, function (event, data) {
                    DsEventService.showToast(data);

                    if ($scope.block_notifications === false) {
                        $scope.block_notifications = true;
                        $timeout(function () {$scope.block_notifications = false; }, 100);

                        openedErrorToasts.push(toastr[data.type](data.msg, data.title, data.options));
                    }
                });

                $scope.options = {
                    autoDismiss: false,
                    containerId: 'toast-container',
                    position: 'toast-top-right toast-container',
                    type: 'success',
                    timeout: '4444445000',
                    extendedTimeout: '500000',
                    html: false,
                    closeButton: true,
                    tapToDismiss: true,
                    progressBar: false,
                    closeHtml: '<button>&times;</button>',
                    newestOnTop: true,
                    maxOpened: 0,
                    preventDuplicates: false,
                    preventOpenDuplicates: false,
                    toastClass: 'toast',
                    level: 0,
                    iconClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },
                    toastIconClasses: $scope.toastIconClasses
                };

                $scope.$watchCollection('toastIconClasses', function (newValue) {
                    if (typeof (newValue) !== 'undefined') {
                        toastrConfig.toastIconClasses = newValue;
                 
                    }
                });

                $scope.$watchCollection('options', function (newValue) {
                    toastrConfig.containerId = newValue.containerId;
                    toastrConfig.autoDismiss = newValue.autoDismiss;
                    toastrConfig.allowHtml = newValue.html;
                    toastrConfig.extendedTimeOut = parseInt(newValue.extendedTimeout, 10);
                    toastrConfig.positionClass = newValue.position;
                    toastrConfig.timeOut = parseInt(newValue.timeout, 10);
                    toastrConfig.closeButton = newValue.closeButton;
                    toastrConfig.tapToDismiss = newValue.tapToDismiss;
                    toastrConfig.progressBar = newValue.progressBar;
                    toastrConfig.closeHtml = newValue.closeHtml;
                    toastrConfig.newestOnTop = newValue.newestOnTop;

                    toastrConfig.maxOpened = newValue.maxOpened;
                    toastrConfig.preventDuplicates = newValue.preventDuplicates;
                    toastrConfig.preventOpenDuplicates = newValue.preventOpenDuplicates;
                    if (newValue.customTemplate) {
                        toastrConfig.templates.toast = 'custom';
                    } else {
                        toastrConfig.templates.toast = 'directives/toast/toast.html';
                    }
           
                });

                $scope.$watch('toast.customTemplate', function (newVal) {
                    if ($templateCache.get('custom')) {
                        $templateCache.remove('custom');
                    }
                    $templateCache.put('custom', newVal);
                });
}
