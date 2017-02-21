describe('setPageTitle directive', function () {
    var $compile;
    var $rootScope;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockStateManagement = {
            setPageTitle: function () {

            }
        };

        spyOn(mockStateManagement, 'setPageTitle').and.callThrough();

        module(function ($provide) {
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Should set page title on state service.', function () {
        $compile('<div set-page-title="TEST"></div>')($rootScope);

        expect(mockStateManagement.setPageTitle).toHaveBeenCalledWith('TEST');
    });
});
