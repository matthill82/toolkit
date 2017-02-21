describe('component: uitProductSelect', function () {
    var $componentController;
    var $rootScope;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
    }));

    describe('.$onInit()', function () {
        it('Should initialize', function () {
            var ctrl = $componentController('uitProductSelect', {$scope: $rootScope}, {onIsSelected: angular.noop});

            ctrl.$onInit();

            expect(ctrl.onIsSelected).toEqual(jasmine.any(Function));
        });

        it('Should default onIsSelected if not specified.', function () {
            var ctrl = $componentController('uitProductSelect', {$scope: $rootScope});

            ctrl.$onInit();

            expect(ctrl.onIsSelected).toEqual(jasmine.any(Function));
        });
    });
});
