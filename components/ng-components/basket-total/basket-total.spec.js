describe('component: basketTotal', function () {
    var $componentController;
    var $rootScope;
    /** @type {BasketTotalController} */
    var BasketTotalController;
    var mockBasketService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockBasketService = {
            getBasket: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('BasketService', mockBasketService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;

        spyOn($rootScope, '$broadcast').and.callThrough();
    }));

    describe('.$onInit()', function () {
        it('Should get the basket.', function () {
            BasketTotalController = $componentController('basketTotal', {$scope: $rootScope});

            BasketTotalController.$onInit();

            expect(mockBasketService.getBasket).toHaveBeenCalled();
        });
    });
});
