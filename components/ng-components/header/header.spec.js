describe('header component', function () {
    var $componentController;
    var $rootScope;
    var mock$state;
    var mock$window;
    var mockDsEventService;
    var mockStateManagement;
    var mockUser;
    var mockUserService;
    var $q;
    var mockUitModalService;
    var deferred;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$state = {
            go: jasmine.createSpy()
        };

        mock$window = {
            ENUMS: {
                EVENTS: {
                    RECEIVE: {
                        APP_UPDATES_FOUND: 'APP_UPDATES_FOUND',
                        APP_UPDATES_INSTALLED: 'APP_UPDATES_INSTALLED'
                    }
                }
            }
        };

        mockUitModalService = {
            showModal: function () {
                deferred = $q.defer();
                return deferred.promise;
            }
        };

        mockDsEventService = {
            sessionRestart: jasmine.createSpy()
        };

        mockStateManagement = {
            clearDataExceptLogic: jasmine.createSpy()
        };

        mockUser = {
            meta: {
                firstName: 'USER',
                formattedName: 'USER'
            }
        };

        mockUserService = {
            getUser: function () {
                return mockUser;
            }
        };

        module(function ($provide) {
            $provide.value('$state', mock$state);
            $provide.value('$window', mock$window);
            $provide.value('DsEventService', mockDsEventService);
            $provide.value('UitModalService', mockUitModalService);
            $provide.value('StateManagement', mockStateManagement);
            $provide.value('UserService', mockUserService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));

    describe('Construct', function () {
        it('Should listen for update events', function () {
            spyOn($rootScope, '$on');

            $componentController('header', {$scope: $rootScope});

            expect($rootScope.$on).toHaveBeenCalledWith(
                mock$window.ENUMS.EVENTS.RECEIVE.APP_UPDATES_FOUND,
                jasmine.any(Function)
            );

            expect($rootScope.$on).toHaveBeenCalledWith(
                mock$window.ENUMS.EVENTS.RECEIVE.APP_UPDATES_INSTALLED,
                jasmine.any(Function)
            );
        });

        it('Should set updatesFound on APP_UPDATES_FOUND', function () {
            var ctrl = $componentController('header', {$scope: $rootScope});

            $rootScope.$broadcast(mock$window.ENUMS.EVENTS.RECEIVE.APP_UPDATES_FOUND);

            expect(ctrl.updatesFound).toEqual(true);
        });

        it('Should remove updatesFound on APP_UPDATES_INSTALLED', function () {
            var ctrl = $componentController('header', {$scope: $rootScope});

            ctrl.updatesFound = 'TEST';

            $rootScope.$broadcast(mock$window.ENUMS.EVENTS.RECEIVE.APP_UPDATES_INSTALLED);

            expect(ctrl.updatesFound).toEqual(false);
        });

        it('Should receive user on hBuser.', function () {
            var ctrl = $componentController('header', {$scope: $rootScope});
            var user = {};

            ctrl.$onInit();
            expect(ctrl.user).toEqual(mockUser);

            $rootScope.$broadcast('hBuser', user);

            expect(ctrl.user).toEqual(user);
        });

        it('Should set header class.', function () {
            var ctrl = $componentController('header', null, {headerClass: 'TEST'});

            ctrl.$onInit();
            expect(ctrl.headerType).toEqual(true);
        });
    });

    describe('.hasValidUser()', function () {
        it('Should return truthy if there is a valid user.', function () {
            var ctrl = $componentController('header');
            ctrl.$onInit();
            expect(ctrl.hasValidUser()).toBeTruthy();
        });

        it('Should return falsy if no user.', function () {
            var ctrl;

            mockUser = null;

            ctrl = $componentController('header');
            ctrl.$onInit();
            expect(ctrl.hasValidUser()).toBeFalsy();
        });

        it('Should return falsy if the user is invalid.', function () {
            var ctrl;

            mockUser.meta.formattedName = null;

            ctrl = $componentController('header');
            ctrl.$onInit();
            expect(ctrl.hasValidUser()).toBeFalsy();
        });
    });

    describe('.openBurgerMenu()', function () {

        it('Should broadcast event.', function () {
            var ctrl;

            spyOn($rootScope, '$broadcast');

            ctrl = $componentController('header');
            ctrl.$onInit();
            ctrl.openBurgerMenu();

            expect($rootScope.$broadcast).toHaveBeenCalled();
        });

    });

    describe('.openRestart()', function () {

        it('Should not call clearAndRestartSession if modal returns a resolved promise', function () {
            var ctrl = $componentController('header');
            ctrl.$onInit();
            ctrl.openRestart();
            deferred.resolve();
            $rootScope.$apply();
            expect(mockStateManagement.clearDataExceptLogic).toHaveBeenCalled();
            expect(mockDsEventService.sessionRestart).toHaveBeenCalled();
            expect(mock$state.go).not.toHaveBeenCalled();
        });

        it('Should not call clearAndRestartSession if modal returns a rejected promise', function () {
            var ctrl = $componentController('header');
            ctrl.$onInit();
            ctrl.openRestart();
            deferred.reject();
            $rootScope.$apply();
            expect(mockStateManagement.clearDataExceptLogic).not.toHaveBeenCalled();
        });

    });
});
