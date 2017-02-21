describe('journeyStart directive', function () {
    var $compile;
    var $rootScope;
    var mockDsEventService;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDsEventService = {
            setJourneyType: function () {

            }
        };

        mockStateManagement = {
            journeySetStart: function () {

            }
        };

        spyOn(mockDsEventService, 'setJourneyType').and.callThrough();
        spyOn(mockStateManagement, 'journeySetStart').and.callThrough();

        module(function ($provide) {
            $provide.value('DsEventService', mockDsEventService);
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Should set journey on state and fire to ds event service.', function () {
        $compile('<div journey-start="TEST"></div>')($rootScope);

        expect(mockStateManagement.journeySetStart).toHaveBeenCalledWith('TEST');
        expect(mockDsEventService.setJourneyType).toHaveBeenCalledWith('TEST');
    });
});
