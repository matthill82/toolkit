/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
        .directive('messagingErrors', function () {

                return {
                    restrict: 'E',
                    replace: true,
                    scope: true,
                    controller: 'MessagingErrorsController',
                    controllerAs: 'MessagingErrorsController',
                    templateUrl: '/components/ng-components/messaging-errors/messaging-errors.html',
                    link: function (scope, element, attr) {

                        scope.toastIconError = attr.toastIconError;
                        scope.toasIconWarning = attr.toastIconWarning;
                        scope.toastIconInfo = attr.toastIconInfo;

                        scope.toastIconClasses = {
                            error: scope.toastIconError,
                            info: scope.toastIconInfo,
                            warning: scope.toasIconWarning
                        }
                    }
                };

            })
        ;
