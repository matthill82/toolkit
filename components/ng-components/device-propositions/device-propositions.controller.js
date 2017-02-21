angular.module('uitoolkit')
    .controller('DevicePropositionsController', function(StateManagement, DeviceService, $filter, $scope, $timeout){
        var device = {
            name: StateManagement.getDevice('device'),
            colour: StateManagement.getDevice('deviceColour'),
            capacity: StateManagement.getDevice('deviceCapacity')
        };


        function init() {
            // Create a holding object for all the facet groups on the page
            $scope.facets = $scope.facets || {};
            $scope.facets.serviceProvider = $scope.facets.serviceProvider || []; // Required for plans results summary
            $scope.facets['device.id'] = $scope.facets['device.id'] || [];       // Required for plans results summary and controller itself

            $scope.pagination = {
                    pageSize: 4,
                    currentPage: 1,
                    totalPages: 0,
                    pagesNumbers: [],
                    totalItems: 0
                };

            $scope.queryData = {
                sort: [],
                query: [{'device.id': device.name},{'device.colour': device.colour}],
                size: 10,
                from: 0,
                aggs: ['device.id', 'serviceProvider']
            };

            $scope.queryData.sort.push({'tariff.textAllowance.number': 'desc'});
            $scope.queryData.sort.push({'tariff.dataAllowance.number': 'asc'});


            $timeout(function () {
                DeviceService.getAllFacetsForDevice(device.name, device.colour, $scope.facets).then(function(data){
                    $scope.carriersCount = data.aggregations.serviceProvider.buckets.length;
                    $scope.plansCount = data.aggregations['device.id'].buckets[0].doc_count;
                    $scope.pagination.totalItems = $scope.plansCount;
                    $scope.pagination.totalPages = Math.ceil($scope.plansCount / $scope.pagination.pageSize);
                    $scope.pagination.pagesNumbers.length = $scope.pagination.totalPages;

                    for (var facetName in $scope.facets) {
                        if (data.aggregations[facetName]) {
                            $scope.facets[facetName] = $scope.facets[facetName].concat($filter('orderBy')(data.aggregations[facetName].buckets,'key'));
                        }
                    }
                });
            });
        }


        function getData() {
            DeviceService.elasticQuery($scope.queryData).then(function(data){
//                    console.log('>>>', data);
                    $scope.results = data.queryResult;
                    $scope.carriersCount = data.aggregations.serviceProvider.buckets.length;
                    $scope.plansCount = data.aggregations['device.id'].buckets.length && data.aggregations['device.id'].buckets[0].doc_count;
                    $scope.pagination.totalItems = $scope.plansCount;
                    $scope.pagination.totalPages = Math.ceil($scope.plansCount / $scope.pagination.pageSize);
                    $scope.pagination.pagesNumbers.length = $scope.pagination.totalPages;
                });
        }

        //
        // Initialize state
        //
        init();


        //
        // Watchers
        //
        $scope.$watch('pagination', function() {
            getData();
        }, true);

        $scope.$watch('facets', function(){
            $scope.pagination.currentPage = 1;
            getData();
        }, true);

        $scope.$watch('sort', function(){
            $scope.pagination.currentPage = 1;
            getData();
        }, true);

    });
