describe('stockCount component', function () {
    var $componentController;
    var $q;
    var $rootScope;
    var EventEnums;
    var mockLocationId;
    var mockStock;
    var mockStockCountDecoratorResponse;
    var mockStockCountService;
    var mockStockService;
    var mockUserService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockLocationId = 'LOCATION_ID';

        mockStock = {

        };

        mockStockCountDecoratorResponse = null;

        mockStockCountService = {
            stockCountDecorator: function () {
                return mockStockCountDecoratorResponse;
            },
            getStock: function () {
                return $q.resolve(1);
            }
        };

        spyOn(mockStockCountService, 'getStock').and.callThrough();

        mockStockService = {
            listenForStock: function () {
                return mockStock;
            }
        };

        spyOn(mockStockService, 'listenForStock').and.callThrough();

        mockUserService = {
            getLocation: function () {
                return mockLocationId;
            }
        };

        module(function ($provide) {
            $provide.value('StockCountService', mockStockCountService);
            $provide.value('StockService', mockStockService);
            $provide.value('UserService', mockUserService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_, _EventEnums_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        EventEnums = _EventEnums_;
    }));

    describe('Construct', function () {
        describe('Either mode', function () {
            it('Should listen for SELECTED_DEVICE.', function () {
                spyOn($rootScope, '$on');

                $componentController('stockCount', {$scope: $rootScope});

                expect($rootScope.$on).toHaveBeenCalledWith(EventEnums.ENUMS.SELECTED_DEVICE, jasmine.any(Function));
            });

            it('Should empty message on no product id.', function () {
                var ctrl = $componentController('stockCount', {$scope: $rootScope});

                mockStockCountDecoratorResponse = 'TESTMESSAGE';

                expect(ctrl.stockMessage).toBeUndefined();

                $rootScope.$broadcast(EventEnums.ENUMS.SELECTED_DEVICE);

                $rootScope.$digest();

                expect(ctrl.stockMessage).toBe('TESTMESSAGE');
            });

            it('Should empty message on no user location id.', function () {
                var ctrl = $componentController('stockCount', {$scope: $rootScope});

                mockLocationId = null;
                mockStockCountDecoratorResponse = 'TESTMESSAGE';

                expect(ctrl.stockMessage).toBeUndefined();

                $rootScope.$broadcast(EventEnums.ENUMS.SELECTED_DEVICE, {id: 'TEST'});

                $rootScope.$digest();

                expect(ctrl.stockMessage).toBe('TESTMESSAGE');
            });
        });

        describe('Websocket mode', function () {
            it('Should listen for stock.', function () {
                $componentController('stockCount', {$scope: $rootScope}, {method: 'WEBSOCKET'});

                $rootScope.$broadcast(EventEnums.ENUMS.SELECTED_DEVICE, {id: 'TEST'});

                $rootScope.$digest();

                expect(mockStockService.listenForStock).toHaveBeenCalledWith('TEST');
            });
        });

        describe('Restful mode', function () {
            it('Should call stock count service.', function () {
                $componentController('stockCount', {$scope: $rootScope});

                $rootScope.$broadcast(EventEnums.ENUMS.SELECTED_DEVICE, {id: 'TEST'});

                $rootScope.$digest();

                expect(mockStockCountService.getStock).toHaveBeenCalledWith(mockLocationId, 'TEST');
            });
        });
    });
});
