describe('dsEventBasketSelectedAttachmentPercentMap directive', function () {
    var $compile;
    var $rootScope;
    var mockBasketService;
    var mockDsEventService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockBasketService = {
            getBasket: angular.noop
        };
        mockDsEventService = {
            sendEvent: angular.noop
        };

        module(function ($provide) {
            $provide.value('BasketService', mockBasketService);
            $provide.value('DsEventService', mockDsEventService);
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Should watch.', function () {
        spyOn($rootScope, '$watch').and.callThrough();

        $compile('<div ds-event-basket-selected-attachment-percent-map="TEST"></div>')($rootScope);

        expect($rootScope.$watch).toHaveBeenCalled();
    });
});
