describe('component: simpleHb', function () {
    var $componentController;
    var $rootScope;
    var $timeout;
    var mock$state;
    var mockHbNodeTemplate;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$state = {
            go: jasmine.createSpy()
        };

        mockHbNodeTemplate = {
            addTemplate: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('$state', mock$state);
            $provide.value('hbNodeTemplate', mockHbNodeTemplate);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$timeout_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    describe('Construct', function () {
        it('Should set template from binding.', function () {
            $componentController('simpleHb', null, {templateMapping: 'FORMAT::PATH'});

            expect(mockHbNodeTemplate.addTemplate).toHaveBeenCalledWith('PATH', 'object', 'FORMAT');
        });
    });

    describe('$onInit()', function () {
        it('Should exist.', function () {
            var ctrl  = $componentController('simpleHb');

            ctrl.$onInit();
        });

        it('Should listen for hbFlowDone if doneRedirectPath specified.', function () {
            var ctrl  = $componentController('simpleHb', {$scope: $rootScope}, {doneRedirectPath: 'path'});

            spyOn($rootScope, '$on');

            ctrl.$onInit();

            expect($rootScope.$on).toHaveBeenCalledWith('hbFlowDone', jasmine.any(Function));
        });

        it('Should redirect to doneRedirectPath on done if specified.', function () {
            var ctrl  = $componentController('simpleHb', {$scope: $rootScope}, {doneRedirectPath: 'path'});

            ctrl.$onInit();

            $rootScope.$broadcast('hbFlowDone');

            $rootScope.$digest();

            expect(mock$state.go).toHaveBeenCalledWith('path');
        });
    });

    describe('.toggleTestMode()', function () {
        it('Should toggle test mode on.', function () {
            var ctrl = $componentController('simpleHb');

            ctrl.toggleTestMode();

            expect(ctrl.testMode).toBeTruthy();
        });

        it('Should toggle test mode off.', function () {
            var ctrl = $componentController('simpleHb');

            ctrl.toggleTestMode();
            ctrl.toggleTestMode();

            expect(ctrl.testMode).toBeFalsy();
        });

        it('Should toggle hide and show.', function () {
            var ctrl = $componentController('simpleHb');

            ctrl.toggleTestMode();

            expect(ctrl.show).toBeFalsy();

            // flush timeout(s) for all code under test.
            $timeout.flush();

            // this will throw an exception if there are any pending timeouts.
            $timeout.verifyNoPendingTasks();

            expect(ctrl.show).toBeTruthy();
        });
    });
});
