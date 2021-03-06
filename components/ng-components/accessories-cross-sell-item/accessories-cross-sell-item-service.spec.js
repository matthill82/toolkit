describe('AccessoriesCrossSellItemService', function () {
    var $q;
    var $rootScope;
    var AccessoriesCrossSellItemService;
    var mockAttachment;
    var mockBasket;
    var mockBasketAttachment;
    var mockBasketService;
    var mockDeviceService;
    var mockProduct;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockAttachment = undefined;

        mockBasket = {
            addAttachment: jasmine.createSpy(),
            findAttachmentById: function () {
                return mockAttachment;
            },
            removeAttachment: jasmine.createSpy()
        };

        spyOn(mockBasket, 'findAttachmentById').and.callThrough();

        mockBasketAttachment = angular.noop;

        mockBasketService = {
            getBasket: function () {
                return mockBasket;
            }
        };

        mockDeviceService = {
            getProductDetailsCached: function () {
                return $q.resolve([mockProduct]);
            }
        };

        mockProduct = {
            id: 'TEST'
        };

        module(function ($provide) {
            $provide.value('BasketAttachment', mockBasketAttachment);
            $provide.value('BasketService', mockBasketService);
            $provide.value('DeviceService', mockDeviceService);
        });
    });

    beforeEach(inject(function (_$q_, _$rootScope_, _AccessoriesCrossSellItemService_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        AccessoriesCrossSellItemService = _AccessoriesCrossSellItemService_;
    }));

    describe('.findById()', function () {
        it('Should return first result.', function () {
            var testProduct;

            AccessoriesCrossSellItemService.findById('TEST').then(function (product) {
                testProduct = product;
            });

            $rootScope.$digest();

            expect(testProduct).toBe(mockProduct);
        });
    });

    describe('.isSelected()', function () {
        it('Should return true when product is in the basket.', function () {
            mockAttachment = {};

            expect(AccessoriesCrossSellItemService.isSelected(mockProduct)).toBeTruthy();

            expect(mockBasket.findAttachmentById).toHaveBeenCalled();
        });

        it('Should return false when product is not in the basket.', function () {
            expect(AccessoriesCrossSellItemService.isSelected(mockProduct)).toBeFalsy();

            expect(mockBasket.findAttachmentById).toHaveBeenCalled();
        });
    });

    describe('.select()', function () {
        it('Should add to basket when not already in.', function () {
            AccessoriesCrossSellItemService.select(mockProduct);

            expect(mockBasket.addAttachment).toHaveBeenCalled();
        });

        it('Should remove from basket when already in.', function () {
            mockAttachment = {};

            AccessoriesCrossSellItemService.select(mockProduct);

            expect(mockBasket.removeAttachment).toHaveBeenCalled();
        });
    });
});
