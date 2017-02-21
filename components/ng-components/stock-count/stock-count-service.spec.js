describe('StockCountService', function () {
    var $q;
    var $rootScope;
    var StockCountService;
    var mockConfigService;
    var mockStockConfig;
    var mockStockResponse;
    var mockStockService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockConfigService = {
            get: function () {
                return mockStockConfig;
            }
        };

        mockStockConfig = {
            availableText: 'AVAILABLE',
            extraSign: '+',
            threshold: 1,
            unavailableText: 'UNAVAILABLE'
        };

        mockStockResponse = {
            queryResult: [
                {
                    device: {
                        location: [
                            {
                                id: 'TEST_LOCATION',
                                quantity: 2
                            }, {
                                id: 'TEST_LOCATION_2',
                                quantity: 5
                            }
                        ]
                    }
                }
            ]
        };

        mockStockService = {
            getStockForLocationAndIds: function () {
                return $q.resolve(mockStockResponse);
            }
        };

        module(function ($provide) {
            $provide.value('ConfigService', mockConfigService);
            $provide.value('StockService', mockStockService);
        });
    });

    beforeEach(inject(function (_$q_, _$rootScope_, _StockCountService_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        StockCountService = _StockCountService_;
    }));

    describe('.getStock()', function () {
        it('Should get stock for matching location id.', function () {
            var promiseStock;

            StockCountService.getStock('TEST_LOCATION_2', 'ID').then(function (stock) {
                promiseStock = stock;
            });

            $rootScope.$digest();

            expect(promiseStock).toBe(5);
        });

        it('Should get undefined for no matching location id.', function () {
            var promiseCalled = false;
            var promiseStock;

            StockCountService.getStock('TEST_LOCATION_3', 'ID').then(function (stock) {
                promiseCalled = true;
                promiseStock = stock;
            });

            $rootScope.$digest();

            expect(promiseCalled).toBeTruthy();
            expect(promiseStock).toBeUndefined();
        });

        it('Should get undefined for no valid result.', function () {
            var promiseCalled = false;
            var promiseStock;

            mockStockResponse = null;

            StockCountService.getStock('TEST_LOCATION_3', 'ID').then(function (stock) {
                promiseCalled = true;
                promiseStock = stock;
            });

            $rootScope.$digest();

            expect(promiseCalled).toBeTruthy();
            expect(promiseStock).toBeUndefined();
        });
    });

    describe('.stockCountDecorator()', function () {
        it('Should show threshold message when above threshold.', function () {
            expect(StockCountService.stockCountDecorator(2)).toEqual('AVAILABLE 1+');
        });

        it('Should show unavailable message when below or equal to threshold.', function () {
            expect(StockCountService.stockCountDecorator(1)).toEqual('UNAVAILABLE');
            expect(StockCountService.stockCountDecorator(0)).toEqual('UNAVAILABLE');
        });
    });
});
