describe('dsOnEventCompleteJourney directive', function () {
    var $compile;
    var $rootScope;
    var mockDsEventService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDsEventService = {
            completeJourney: angular.noop
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
        spyOn($rootScope, '$on').and.callThrough();

        $compile('<div ds-on-event-complete-journey="TEST"></div>')($rootScope);

        expect($rootScope.$on).toHaveBeenCalledWith('TEST', jasmine.any(Function));
    });

});
