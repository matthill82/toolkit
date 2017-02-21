describe('UserService', function () {
    /** @type {UserService} */
    var UserService;
    var mockStateManagement;
    var mockUser;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockUser = {
            'depth1': ['2875']
        };

        mockStateManagement = {
            getUser: function () {
                return angular.toJson(mockUser);
            },
            setUser: function () {

            }
        };

        spyOn(mockStateManagement, 'getUser').and.callThrough();
        spyOn(mockStateManagement, 'setUser');

        module(function ($provide) {
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_UserService_) {
        UserService = _UserService_;
    }));

    describe('.getUser()', function () {
        it('Should get current user', function () {
            expect(UserService.getUser()).toEqual(mockUser);
        });
    });

    describe('.setUser()', function () {
        it('Should save user to StateManagement', function () {
            UserService.setUser(mockUser);
            expect(mockStateManagement.setUser).toHaveBeenCalled();
        });
    });

    describe('.getLocation()', function () {
        it('Should get current location', function () {
            expect(UserService.getLocation()).toEqual(mockUser.depth1[0]);
        });
    });

    describe('.getMaxDepth()', function () {
        it('Should get user highest depth.', function () {
            mockUser.depth = [2, 1];

            UserService.setUser(mockUser);

            expect(UserService.getMaxDepth()).toEqual(2);
        });

        it('Should allow string depth values.', function () {
            mockUser.depth = ['1', '2'];

            UserService.setUser(mockUser);

            expect(UserService.getMaxDepth()).toEqual(2);
        });

        it ('Should return 0 when there is no user.', function () {
            expect(UserService.getMaxDepth()).toEqual(0);
        });
    });
});
