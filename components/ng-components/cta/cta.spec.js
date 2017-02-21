describe('breadcrumb component', function () {
    var $componentController;
    var $rootScope;
    var EventEnums;
    var mock$state;
    var mock$window;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$state = {
            go: jasmine.createSpy()
        };

        mock$window = {
            history: {
                back: jasmine.createSpy()
            }
        };

        mockStateManagement = {
            journeyGetDirectionKeys: function () {
                return {
                    BACK: 'back',
                    NEXT: 'next'
                };
            },
            journeySetDirection: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('$state', mock$state);
            $provide.value('$window', mock$window);
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_, _EventEnums_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        EventEnums = _EventEnums_;

        spyOn($rootScope, '$on').and.callThrough();
    }));

    describe('Construct', function () {
        it('Should disable when direction is NEXT.', function () {
            var ctrl = $componentController('cta', null, {direction: 'next'});

            expect(ctrl.isButtonDisabled).toBeTruthy();
        });

        it('Should enable when direction is BACK.', function () {
            var ctrl = $componentController('cta', null, {direction: 'back'});

            expect(ctrl.isButtonDisabled).toBeFalsy();
        });

        it('Should listen for CTA_BUTTON_UPDATE when direction is set.', function () {
            $componentController('cta', {$scope: $rootScope}, {direction: 'TEST'});

            expect($rootScope.$on).toHaveBeenCalledWith(EventEnums.ENUMS.CTA_BUTTON_UPDATE, jasmine.any(Function));
        });

        it('Should disable on CTA_BUTTON_UPDATE when direction and disabled.', function () {
            var ctrl = $componentController('cta', {$scope: $rootScope}, {direction: 'back'});

            expect(ctrl.isButtonDisabled).toBeFalsy();

            $rootScope.$broadcast(EventEnums.ENUMS.CTA_BUTTON_UPDATE, {direction: 'back', disabled: true});

            $rootScope.$digest();

            expect(ctrl.isButtonDisabled).toBeTruthy();
        });

        it('Should set link on CTA_BUTTON_UPDATE when direction and link.', function () {
            var ctrl = $componentController('cta', {$scope: $rootScope}, {direction: 'back'});
            var link = 'http://example';

            expect(ctrl.currentLink).toBeUndefined();

            $rootScope.$broadcast(EventEnums.ENUMS.CTA_BUTTON_UPDATE, {direction: 'back', link: link});

            $rootScope.$digest();

            expect(ctrl.currentLink).toEqual(link);
        });

        it('Should not set link on CTA_BUTTON_UPDATE when no direction and link.', function () {
            var ctrl = $componentController('cta', {$scope: $rootScope}, {direction: 'back'});

            expect(ctrl.currentLink).toBeUndefined();

            $rootScope.$broadcast(EventEnums.ENUMS.CTA_BUTTON_UPDATE, {link: 'http://example'});

            $rootScope.$digest();

            expect(ctrl.currentLink).toBeUndefined();
        });

        it('Should listen for CTA_BUTTON_TRIGGER when direction is set.', function () {
            $componentController('cta', {$scope: $rootScope}, {direction: 'TEST'});

            expect($rootScope.$on).toHaveBeenCalledWith(EventEnums.ENUMS.CTA_BUTTON_TRIGGER, jasmine.any(Function));
        });

        it('Should action on CTA_BUTTON_TRIGGER when direction matches.', function () {
            var ctrl = $componentController('cta', {$scope: $rootScope}, {direction: 'back'});

            spyOn(ctrl, 'goToPage');

            $rootScope.$broadcast(EventEnums.ENUMS.CTA_BUTTON_TRIGGER, {direction: 'back'});

            $rootScope.$digest();

            expect(ctrl.goToPage).toHaveBeenCalled();
        });

        it('Should not action on CTA_BUTTON_TRIGGER when direction doesn\'t match.', function () {
            var ctrl = $componentController('cta', {$scope: $rootScope}, {direction: 'back'});

            spyOn(ctrl, 'goToPage');

            $rootScope.$broadcast(EventEnums.ENUMS.CTA_BUTTON_TRIGGER, {direction: 'next'});

            $rootScope.$digest();

            expect(ctrl.goToPage).not.toHaveBeenCalled();
        });

        it('Should not listen when no direction is set.', function () {
            $componentController('cta', {$scope: $rootScope});

            expect($rootScope.$on).not.toHaveBeenCalled();
        });
    });

    describe('.goToPage()', function () {
        it('Should use history api when usePrevious is set.', function () {
            var ctrl = $componentController('cta', null, {usePrevious: true});

            ctrl.goToPage();

            expect(mock$window.history.back).toHaveBeenCalled();
        });

        it('Should go to link.', function () {
            var link = 'http://example';
            var ctrl = $componentController('cta', null, {link: link});

            ctrl.goToPage();

            expect(mock$state.go).toHaveBeenCalledWith(link);
        });

        it('Should set state data direction if it has a direction.', function () {
            var link = 'http://example';
            var ctrl = $componentController(
                'cta',
                null,
                {
                    direction: 'back',
                    link: link
                });

            ctrl.goToPage();

            expect(mockStateManagement.journeySetDirection).toHaveBeenCalledWith('back');
        });

        it('Should do nothing if no link is defined.', function () {
            var ctrl = $componentController('cta');

            ctrl.goToPage();

            expect(mock$window.history.back).not.toHaveBeenCalled();
            expect(mock$state.go).not.toHaveBeenCalled();
        });
    });
});
