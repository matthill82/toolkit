describe('Device results controller: ', function () {
    var $controller;
    var $scope;
    var $state;
    var mock$window;
    var mockJrdService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$window = {
            ENUMS: {
                EVENTS: {
                    RECEIVE: {
                        RECEIVE_SEARCH_RESULTS: 'RECEIVE_SEARCH_RESULTS'
                    }
                }
            }
        };

        mockJrdService = {
            get: function () {
                return [
                    {
                        "index": 0,
                        "fromSKU": "APPLE_IPHONE_6S_PLUS_128GB",
                        "toSKU": "SAMSUNG_GALAXY_S6_EDGE_128GB"
                    },
                    {
                        "index": 1,
                        "fromSKU": "APPLE_IPHONE_6S_128GB",
                        "toSKU": "SAMSUNG_GALAXY_S6_EDGE_128GB"
                    },
                    {
                        "index": 2,
                        "fromSKU": "APPLE_IPHONE_5S_16GB",
                        "toSKU": "SAMSUNG_GALAXY_J3_2016"
                    }
                ];
            }
        };


        module(function ($provide) {
            $provide.value('$window', mock$window);
            $provide.value('JrdService', mockJrdService);
            $provide.value('config', {
                psi_url: 'http://test'
            });
        });
    });

    beforeEach(inject(function (_$controller_, _$rootScope_, _$state_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $state = _$state_;
    }));

    it('should expose methods', function () {
        $controller('DeviceResultsController', {
            $scope: $scope
        });

        expect($scope.goToNextPage).toBeDefined();
        expect($scope.goTo).toBeDefined();
        expect($scope.goToSpecifications).toBeDefined();
        expect($scope.hideSpecificationItem).toBeDefined();
        expect($scope.thereAreCompareItems).toBeDefined();
        expect($scope.hideSpecificationItem).toBeDefined();
        expect($scope.getNumberOfCompareItems).toBeDefined();
        expect($scope.loadCompareDevices).toBeDefined();
        expect($scope.loadProductData).toBeDefined();
        expect($scope.setPromotedDeviceConfig).toBeDefined();
    });

    it('go to selected page', function () {
        $controller('DeviceResultsController', {
            $scope: $scope
        });

        $state.go = jasmine.createSpy();

        $scope.goTo('home');

        expect($state.go).toHaveBeenCalledWith('home');
    });
});
