describe('dsEventBasketSelectedAttachmentPercent directive', function () {
    var $compile;
    var $rootScope;
    var mockBasketService;
    var mockDsEventService;
    var mockUtilityService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockBasketService = {
            getBasket: angular.noop
        };

        mockDsEventService = {
            sendEvent: angular.noop
        };

        mockUtilityService = {
            aemKvMapString: angular.noop
        };

        module(function ($provide) {
            $provide.value('BasketService', mockBasketService);
            $provide.value('DsEventService', mockDsEventService);
            $provide.value('UtilityService', mockUtilityService);
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Should watch.', function () {
        spyOn($rootScope, '$watch').and.callThrough();

        $compile('<div ds-event-basket-selected-attachment-percent="TEST"></div>')($rootScope);

        expect($rootScope.$watch).toHaveBeenCalled();
    });
});
