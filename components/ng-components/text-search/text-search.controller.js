angular.module('uitoolkit')
    .controller('TextSearchController', TextSearchController);

function TextSearchController($scope, $timeout, $window) {
    var searchTimeoutPromise = null;

    $scope.performSearch = performSearch;
    $scope.clearSearch = clearSearch;

    clearSearch();

    function _startSearch() {
        var data = {
            query: $scope.search,
            maxAmount: parseInt($scope.maxAmount)
        };

        $scope.$emit($window.ENUMS.EVENTS.EMIT.PERFORM_SEARCH, data);
    }

    function performSearch() {
        if (angular.isUndefined($scope.search)) {
            $scope.search = '';
            return;
        }

        if ($scope.search.length < $scope.searchAfterCharacterCount) {
            return;
        }

        if (searchTimeoutPromise) {
            $timeout.cancel(searchTimeoutPromise);
        }

        searchTimeoutPromise = $timeout(_startSearch, 500);
    }

    function clearSearch() {
        $scope.search = '';
        $scope.$emit($window.ENUMS.EVENTS.EMIT.CLEAR_DEVICE_RESULTS, {});
    }
}
