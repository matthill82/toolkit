describe('component: productItem', function () {
    var $componentController;
    var $rootScope;
    var mockConfigService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockConfigService = {
            get: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('ConfigService', mockConfigService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
    }));

    it('Should get pricing config.', function () {
        $componentController('pricing', {$scope: $rootScope});

        expect(mockConfigService.get).toHaveBeenCalledWith('pricing');
    });
});
