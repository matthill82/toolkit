/**
 * Created by matthew on 07/12/2016.
 */

angular.module('uitoolkit').directive('validatePass', function () {
    return {
        require: 'ngModel',
        controller: function ($scope) {

            $scope.formFlags = {
                showpass: false,
                minpasslength: 6,
                tempPass: ''
            };

            $scope.master = {};

            $scope.update = function (user) {
                $scope.master = angular.copy(user);
            };
            $scope.reset = function () {
                $scope.user = angular.copy($scope.master);
            };

            $scope.reset();
        },
        link: function (scope, elm, attrs, ctrl) {

            //Password validation regexp
            var PASS_REGEXP = /\d/;

            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue.length >= scope.formFlags.minpasslength && PASS_REGEXP.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('value', true);
                } else {
                    // it is invalid
                    ctrl.$setValidity('value', false);
                }
                // update model anyway to sync password fields
                return viewValue;
            });
        }
    };
});
