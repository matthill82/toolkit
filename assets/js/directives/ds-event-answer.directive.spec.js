describe('dsEventAnswer directive', function () {
    var $compile;
    var $rootScope;
    var mockDsEventService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDsEventService = {
            sendEvent: function () {
                return {};
            }
        };

        module(function ($provide) {
            $provide.value('DsEventService', mockDsEventService);
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Should watch.', function () {
        spyOn($rootScope, '$watch').and.callThrough();

        $compile('<div ds-event-answer="TEST"></div>')($rootScope);

        expect($rootScope.$watch).toHaveBeenCalled();
    });
});
