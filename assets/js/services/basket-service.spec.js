describe('BasketService', function () {
    var Basket;
    /** @type BasketService */
    var BasketService;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockStateManagement = {
            getData: function () {

            },
            removeData: function () {

            }
        };

        spyOn(mockStateManagement, 'getData');
        spyOn(mockStateManagement, 'removeData');

        module(function ($provide) {
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_Basket_, _BasketService_) {
        Basket = _Basket_;
        BasketService = _BasketService_;
    }));

    describe('.getBasket()', function () {
        it('Should get the basket.', function () {
            expect(BasketService.getBasket()).toEqual(jasmine.any(Basket));
        });

        it('Should try to restore from StateManagement.', function () {
            BasketService.getBasket();

            expect(mockStateManagement.getData).toHaveBeenCalled();
        });

        it('Should observe changes to the basket.', function () {
            var instance;

            spyOn(Basket.prototype, 'addObserver');

            instance = BasketService.getBasket();

            expect(instance.addObserver).toHaveBeenCalled();
        });
    });

    describe('.resetBasket()', function () {
        it('Should return a basket', function () {
            expect(BasketService.resetBasket()).toEqual(jasmine.any(Basket));
        });

        it('Should return a new basket.', function () {
            var newBasket;
            var originalBasket;

            originalBasket = BasketService.getBasket();
            newBasket = BasketService.resetBasket();

            expect(newBasket).not.toBe(originalBasket);
        });

        it ('Should remove in StateManagement.', function () {
            BasketService.resetBasket();

            expect(mockStateManagement.removeData).toHaveBeenCalled();
        });
    });
});
