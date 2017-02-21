describe('component: prductCompare', function () {
    var $componentController;
    var $q;
    var $rootScope;
    var deferred;
    var mockDeviceHelperService;
    var mockEventEnums;
    var mockProductCompareService;
    var mockProducts;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDeviceHelperService = {
            goToDevice: jasmine.createSpy()
        };

        mockEventEnums = {
            ENUMS: {
                SELECT_ITEM: 'SELECT_ITEM'
            }
        };

        mockProductCompareService = {
            load: function () {
                deferred = $q.defer();

                return deferred.promise;
            },
            removeCompare: jasmine.createSpy()
        };

        mockProducts = [
            {
                device: {
                    category1: 'CAT'
                }
            }
        ];

        spyOn(mockProductCompareService, 'load').and.callThrough();

        module(function ($provide) {
            $provide.value('DeviceHelperService', mockDeviceHelperService);
            $provide.value('EventEnums', mockEventEnums);
            $provide.value('ProductCompareService', mockProductCompareService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        spyOn($rootScope, '$broadcast').and.callThrough();
    }));

    describe('.$onInit()', function () {
        it('Should load.', function () {
            var ctrl = $componentController('productCompare');

            ctrl.$onInit();

            expect(mockProductCompareService.load).toHaveBeenCalled();
        });

        it('Should set products from promise.', function () {
            var ctrl = $componentController('productCompare');

            ctrl.$onInit();

            deferred.resolve(mockProducts);

            $rootScope.$apply();

            expect(ctrl.products).toEqual(mockProducts);
        });

        it('Should set empty products on failed promise.', function () {
            var ctrl = $componentController('productCompare');

            ctrl.$onInit();

            deferred.reject();

            $rootScope.$apply();

            expect(ctrl.products).toEqual([]);
        });
    });

    describe('.getCategoryJourneyType()', function () {
        it('Should get the journey type for the product category1', function () {
            var ctrl = $componentController(
                'productCompare',
                null,
                {
                    deviceCategoryJourneyTypeConfig: '{"CAT": "JOURNEY"}'
                }
            );

            expect(ctrl.getCategoryJourneyType(mockProducts[0])).toEqual('JOURNEY');
        });

        it('Should return undefined on no match', function () {
            var ctrl = $componentController('productCompare');

            expect(ctrl.getCategoryJourneyType(mockProducts[0])).toBeUndefined();
        });
    });

    describe('.removeCompare()', function () {
        it('Should decrement $ctrl.numberProducts', function () {
            var ctrl = $componentController('productCompare');

            ctrl.numberProducts = 1;

            ctrl.removeCompare();

            expect(ctrl.numberProducts).toBe(0);
        });

        it('Should call ProductCompareService.', function () {
            var ctrl = $componentController('productCompare');

            ctrl.removeCompare();

            expect(mockProductCompareService.removeCompare).toHaveBeenCalled();
        });
    });

    describe('.select()', function () {
        it('Should broadcast product', function () {
            var ctrl = $componentController('productCompare', {$scope: $rootScope});

            ctrl.select();

            expect($rootScope.$broadcast).toHaveBeenCalled();
        });

        it('Should use DeviceHelperService to go to the device.', function () {
            var ctrl = $componentController('productCompare');

            ctrl.select();

            expect(mockDeviceHelperService.goToDevice).toHaveBeenCalled();
        });
    });
});
