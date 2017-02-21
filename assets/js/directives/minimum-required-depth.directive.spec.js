describe('minimumRequiredDepth directive', function () {
    var $compile;
    var $rootScope;
    var mockUserService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockUserService = {
            getUser: function () {
                return {};
            },
            getMaxDepth: function () {
                return 1;
            }
        };

        spyOn(mockUserService, 'getUser').and.callThrough();
        spyOn(mockUserService, 'getMaxDepth').and.callThrough();

        module(function ($provide) {
            $provide.value('UserService', mockUserService);
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Should call the User service.', function () {
        $compile('<div minimum-required-depth="1"></div>')($rootScope);

        expect(mockUserService.getUser).toHaveBeenCalled();
        expect(mockUserService.getMaxDepth).toHaveBeenCalled();
    });

    it('Should do nothing when depth is 0.', function () {
        $compile('<div minimum-required-depth="0"></div>')($rootScope);

        expect(mockUserService.getUser).not.toHaveBeenCalled();
        expect(mockUserService.getMaxDepth).not.toHaveBeenCalled();
    });

    it('Should remove when user depth is less than required.', function () {
        var element = $compile('<div><div minimum-required-depth="2"></div></div>')($rootScope);

        expect(element.html()).toEqual('');
    });
});
