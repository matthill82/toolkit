angular.module('uitoolkit')
    .controller('PlansResultsController', function(StateManagement, DeviceService, $filter, $scope, $timeout){
        var device = {
            name: StateManagement.getDevice('device'),
            colour: StateManagement.getDevice('deviceColour'),
            capacity: StateManagement.getDevice('deviceCapacity')
        };

        $scope.facets = $scope.facets || {};
        $scope.facets.serviceProvider = $scope.facets.serviceProvider || []; // Required for plans results summary
        $scope.facets['device.id'] = $scope.facets['device.id'] || [];       // Required for plans results summary and controller itself

        $scope.pagination = {
                    pageSize: 4,
                    currentPage: 1,
                    totalPages: 0,
                    totalItems: 0
                };


        function init() {
            DeviceService.getAllFacetsForDevice(device.name, device.colour, $scope.planType, $scope.facets).then(function(data){
                for (var facetName in $scope.facets) {
                    if (data.aggregations[facetName]) {
                        $scope.facets[facetName] = $scope.facets[facetName].concat($filter('orderBy')(data.aggregations[facetName].buckets,'key'));
                    }
                }
            });


            function resetPagination() {
                if ($scope.pagination.currentPage !== 1) {
                    $scope.pagination.currentPage = 1;
                }
            }


            //
            // Watchers
            //
            $scope.$watch('pagination.currentPage', function() {
                $timeout.cancel($scope.timer);
                $scope.timer = $timeout(getData, 250);
            });
            $scope.$watch('pagination.pageSize', function() {
                $timeout.cancel($scope.timer);
                $scope.timer = $timeout(getData, 250);
            });

            $scope.$watch('facets', function(){
                resetPagination()
                $timeout.cancel($scope.timer);
                $scope.timer = $timeout(getData, 250);
            }, true);

            $scope.$watch('sort', function(){
                resetPagination()
                $timeout.cancel($scope.timer);
                $scope.timer = $timeout(getData, 250);
            }, true);
        }

        function getData() {
            DeviceService.getAllPlansForDeviceAndFacets(device.name, device.colour, $scope.planType, $scope.facets, $scope.pagination, $scope.sort).then(function(data){
                    $scope.results = data.queryResult;
                    $scope.carriersCount = data.aggregations.serviceProvider.buckets.length;
                    $scope.plansCount = data.aggregations['device.id'].buckets.length && data.aggregations['device.id'].buckets[0].doc_count;
                    $scope.pagination.totalItems = $scope.plansCount;
                    $scope.pagination.totalPages = Math.ceil($scope.plansCount / $scope.pagination.pageSize);
                });
        }

        //
        // Initialize state
        //
        $timeout(init, 0);

    });
