describe('ProductCompareService', function () {
    var $q;
    var $rootScope;
    var ProductCompareService;
    var deferred;
    var mockDeviceCompareService;
    var mockProducts;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDeviceCompareService = {
            getCompareDevices: function () {
                deferred = $q.defer();

                return deferred.promise;
            },
            removeCompare: jasmine.createSpy()
        };

        mockProducts = [
            {
                device: {
                    category1: 'CAT',
                    id: 'ID'
                }
            }
        ];

        spyOn(mockDeviceCompareService, 'getCompareDevices').and.callThrough();

        module(function ($provide) {
            $provide.value('DeviceCompareService', mockDeviceCompareService);
        });
    });

    beforeEach(inject(function (_$q_, _$rootScope_, _ProductCompareService_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        ProductCompareService = _ProductCompareService_;
    }));

    describe('.load()', function () {
        it('Should call DeviceCompareService.', function () {
            ProductCompareService.load();

            expect(mockDeviceCompareService.getCompareDevices).toHaveBeenCalled();
        });

        it('Should resolve products.', function () {
            var productsTest;

            ProductCompareService.load().then(function (products) {
                productsTest = products;
            });

            deferred.resolve(mockProducts);

            $rootScope.$apply();

            expect(productsTest).toEqual(mockProducts);
        });
    });

    describe('.removeCompare()', function () {
        it('Should call DeviceCompareService', function () {
            ProductCompareService.removeCompare(mockProducts[0]);

            expect(mockDeviceCompareService.removeCompare).toHaveBeenCalled();
        });
    });
});
