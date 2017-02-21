describe('component: basketSummary', function () {
    var $componentController;
    var $rootScope;
    /** @type {BasketSummaryController} */
    var BasketSummaryController;
    var mockBasketService;
    var mockEventEnums;
    var mockConfigService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockBasketService = {
            getBasket: jasmine.createSpy()
        };

        mockEventEnums = {
            ENUMS: {
                BASKET_SUMMARY_MODAL_OPEN: 'BASKET_SUMMARY_MODAL_OPEN'
            }
        };

        mockConfigService = {
            get: function () {
                return {
                    currencySymbol: '$'
                }
            }
        };

        module(function ($provide) {
            $provide.value('ConfigService', mockConfigService);
            $provide.value('BasketService', mockBasketService);
            $provide.value('EventEnums', mockEventEnums);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;

        spyOn($rootScope, '$broadcast').and.callThrough();
    }));

    describe('.$onInit()', function () {
        it('Should get the basket.', function () {
            BasketSummaryController = $componentController('basketSummary', {$scope: $rootScope});

            BasketSummaryController.$onInit();

            expect(mockBasketService.getBasket).toHaveBeenCalled();
        });
    });

    describe('.checkout()', function () {
        it('Should get pricing config.', function () {
            BasketSummaryController = $componentController('basketSummary', {$scope: $rootScope});

            BasketSummaryController.checkout();

            expect($rootScope.$broadcast).toHaveBeenCalled();
        });

    });
});
