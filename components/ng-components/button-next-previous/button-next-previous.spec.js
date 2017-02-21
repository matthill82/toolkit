describe('ButtonNextPrevious Component', function () {
    var $componentController;
    var mock$state;
    var ctrl;
    var bindings;
    var $rootScope;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$state = {
            go: jasmine.createSpy()
        };

        bindings = {
            label: 'Test button label',
            path: 'basket',
            icon: 'cwsicon cwsicon-next',
            xOffset: '480',
            iconSize: '50'
        };

        module(function ($provide) {
            $provide.value('$state', mock$state);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
    }));

    describe('Construct', function () {
        it('should initialise', function () {
            ctrl = $componentController('buttonNextPrevious', {$scope: $rootScope}, bindings);

            expect(ctrl.label).toBe(bindings.label);
            expect(ctrl.path).toBe(bindings.path);
            expect(ctrl.icon).toBe(bindings.icon);

            ctrl.$onInit();

            expect(ctrl.xOffsetStyle).toBe('top:' +  bindings.xOffset +  'px');
            expect(ctrl.iconStyle).toBe('font-size:' + bindings.iconSize + 'px');
        });
    });

    describe('Behaviour', function () {
        it('should navigate on goToPage() call', function () {
            ctrl = $componentController('buttonNextPrevious', {$scope: $rootScope}, bindings);

            ctrl.$onInit();
            expect(mock$state.go).not.toHaveBeenCalled();

            ctrl.goToPage();
            expect(mock$state.go).toHaveBeenCalledWith(ctrl.path);

        });
    });
});
