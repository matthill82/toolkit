describe('stockToggle component', function () {
    var $componentController;
    var $rootScope;
    var EventEnums;
    var mockStateManagement;
    var mockToggle;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockStateManagement = {
            get: function () {
                return mockToggle;
            },
            set: angular.noop
        };

        mockToggle = null;

        spyOn(mockStateManagement, 'get').and.callThrough();
        spyOn(mockStateManagement, 'set').and.callThrough();

        module(function ($provide) {
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_, _EventEnums_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        EventEnums = _EventEnums_;
    }));

    describe('Construct', function () {
        it('Should default to true when not set in state.', function () {
            var ctrl = $componentController('stockToggle');

            expect(ctrl.toggledOn).toBeTruthy();
        });

        it('Should get from state.', function () {
            var ctrl;

            mockToggle = false;

            ctrl = $componentController('stockToggle');

            expect(ctrl.toggledOn).toBeFalsy();
        });
    });

    describe('.switchToggle()', function () {
        it('Should update state', function () {
            var ctrl = $componentController('stockToggle');

            ctrl.switchToggle();

            expect(mockStateManagement.set).toHaveBeenCalledWith('showInStore', true);
        });

        it('Should broadcast to STOCK_TOGGLE.', function () {
            var ctrl = $componentController('stockToggle', {$scope: $rootScope});

            spyOn($rootScope, '$broadcast');

            ctrl.switchToggle();

            expect($rootScope.$broadcast).toHaveBeenCalledWith(EventEnums.ENUMS.STOCK_TOGGLE, {showInStore: true});
        });
    });
});
