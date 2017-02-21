describe('component: simpleHbUnhandled', function () {
    var $componentController;
    var $rootScope;
    var mockUtilityService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockUtilityService = {
            findUpScope: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('UtilityService', mockUtilityService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
    }));

    describe('.getUnhandled()', function () {
        it('Should search up its scope for unhandled.', function () {
            var ctrl;
            var scope;

            scope = $rootScope.$new();

            ctrl = $componentController('simpleHbUnhandled', {$scope: scope});

            ctrl.getUnhandled();

            expect(mockUtilityService.findUpScope).toHaveBeenCalledWith(scope, 'unhandled');
        });
    });
});
