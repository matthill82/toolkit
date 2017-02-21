describe('basketAdvanced component', function () {
    var $componentController;
    var mockBasketService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockBasketService = {
            getBasket: function () {
                return {
                    removeAttachment: angular.noop
                };
            }
        };

        spyOn(mockBasketService, 'getBasket').and.callThrough();

        module(function ($provide) {
            $provide.value('BasketService', mockBasketService);
        });
    });

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('.$onInit()', function () {
        it('Should get basket', function () {
            var ctrl = $componentController('basketAdvanced');

            ctrl.$onInit();

            expect(mockBasketService.getBasket).toHaveBeenCalled();
        });
    });

    describe('.orderFunc()', function () {
        var ctrl;

        beforeEach(function () {
            ctrl = $componentController('basketAdvanced', null, {orderConfig: 'DT1||DT2||DT3'});

            ctrl.$onInit();
        });

        it('Should return index of attachment display type in order.', function () {
            expect(ctrl.orderFunc({displayType: 'DT2'})).toEqual(1);
        });

        it('Should return infinity if the dispaly type is not recognised.', function () {
            expect(ctrl.orderFunc({displayType: 'DTX'})).toEqual(Infinity);
        });
    });
});
