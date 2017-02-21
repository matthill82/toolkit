describe('component: simpleHbSubmit', function () {
    var $componentController;
    var $rootScope;
    var EventEnums;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_, _$rootScope_, _EventEnums_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        EventEnums = _EventEnums_;
    }));

    describe('$onInit', function () {
        it('Should broadcast when not fallback.', function () {
            var ctrl;

            spyOn($rootScope, '$broadcast');

            ctrl = $componentController('simpleHbSubmit', {$scope: $rootScope.$new()});
            ctrl.$onInit();

            expect($rootScope.$broadcast).toHaveBeenCalled();
        });

        it('Should display and not broadcast when fallback.', function () {
            var ctrl;

            spyOn($rootScope, '$broadcast');

            ctrl = $componentController('simpleHbSubmit', {$scope: $rootScope.$new()}, {fallback: true});
            ctrl.$onInit();

            expect($rootScope.$broadcast).not.toHaveBeenCalled();
            expect(ctrl.display).toBeTruthy();
        });

        it('Should hide when fallback and broadcast received.', function () {
            var ctrl;

            ctrl = $componentController('simpleHbSubmit', {$scope: $rootScope.$new()}, {fallback: true});
            ctrl.$onInit();

            $rootScope.$broadcast(EventEnums.ENUMS.SIMPLE_HB_SUBMIT_RENDER, true);

            expect(ctrl.display).toBeFalsy();
        });
    });

    describe('.submit()', function () {
        it('Should prevent default.', function () {
            var $event = {preventDefault: jasmine.createSpy()};
            var ctrl = $componentController('simpleHbSubmit', {$scope: $rootScope.$new()});

            ctrl.submit($event);

            expect($event.preventDefault).toHaveBeenCalled();
        });

        it('Should broadcast event with "triggerEvent".', function () {
            var ctrl;

            spyOn($rootScope, '$broadcast');

            ctrl = $componentController('simpleHbSubmit', {$scope: $rootScope.$new()}, {triggerEvent: 'EVENT_MSG'});

            ctrl.submit();

            expect($rootScope.$broadcast).toHaveBeenCalledWith('submit', 'EVENT_MSG');
        });
    });
});
