describe('CarouselContainerController', function () {
    var $controller;
    var $rootScope;
    var $scope;
    var ctrl;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
    }));

    beforeEach(function () {
        ctrl = $controller('CarouselContainerController', {
            $scope: $scope
        });
    });

    describe('.addInitCallback()', function () {
        it('Should return undefined.', function () {
            expect(ctrl.addInitCallback(Function)).toBeUndefined();
        });
    });

    describe('.initializeCarousel()', function () {
        var mockCarouselController;

        beforeEach(function () {
            mockCarouselController = angular.noop;
        });

        it('Should set values.', function () {
            ctrl.initializeCarousel(mockCarouselController, 2);

            expect(ctrl.CarouselController).toBe(mockCarouselController);
            expect(ctrl.items).toBe(2);
        });

        it('Should call callbacks.', function () {
            var spy = jasmine.createSpy();

            ctrl.addInitCallback(spy);

            ctrl.initializeCarousel(mockCarouselController, 2);

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('.setIndicator()', function () {
        it('Should set the CarouseIndicatorController', function () {
            var testCtrl = {};

            ctrl.setIndicator(testCtrl);

            expect(ctrl.getIndicator()).toBe(testCtrl);
        });
    });

    describe('.setItems()', function () {
        it('Should set items.', function () {
            expect(ctrl.items).toBe(0);

            ctrl.setItems(2);

            expect(ctrl.items).toBe(2);
        });
    });

    describe('.setStatus()', function () {
        it('Should set status.', function () {
            var visible = [1];

            expect(ctrl.end).toBeTruthy();
            expect(ctrl.start).toBeTruthy();
            expect(ctrl.visible).toEqual([]);

            ctrl.setStatus(false, false, [1]);

            expect(ctrl.end).toBeFalsy();
            expect(ctrl.start).toBeFalsy();
            expect(ctrl.visible).toEqual(visible);
        });

        it('Should $apply() if apply is TRUE.', function () {
            spyOn($rootScope, '$apply');

            ctrl.setStatus(false, false, [], true);

            expect($rootScope.$apply).toHaveBeenCalled();
        });

        it('Should not $apply() if apply is FALSE.', function () {
            spyOn($rootScope, '$apply');

            ctrl.setStatus(false, false, [], false);

            expect($rootScope.$apply).not.toHaveBeenCalled();
        });
    });
});
