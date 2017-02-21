describe('component: simpleHbField', function () {
    var $componentController;
    var mockScope;
    var mockUtilityService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockUtilityService = {
            findUpScope: function () {
                return mockScope.node;
            }
        };

        mockScope = {
            node: {
                fullName: 'TEST'
            }
        };

        module(function ($provide) {
            $provide.value('UtilityService', mockUtilityService);
        });
    });

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('Constructor', function () {
        it('Should find the named node.', function () {
            var ctrl;

            ctrl = $componentController('simpleHbField', {$scope: mockScope}, {nodeName: 'TEST'});

            expect(ctrl.node).toBe(mockScope.node);
        });

        it('Should find the named node down the node tree', function () {
            var ctrl;

            mockScope = {
                node: {
                    children: {
                        child: {
                            fullName: 'TEST'
                        }
                    }
                }
            };

            ctrl = $componentController('simpleHbField', {$scope: mockScope}, {nodeName: 'TEST'});

            expect(ctrl.node).toBe(mockScope.node.children.child);
        });

        it('Should be undefined if a node cant be found up the scope.', function () {
            var ctrl;

            mockScope = {
            };

            ctrl = $componentController('simpleHbField', {$scope: mockScope}, {nodeName: 'TEST'});

            expect(ctrl.node).toBeUndefined();
        });

        it('Should be undefined if a the named node cant be found down the node tree.', function () {
            var ctrl;

            mockScope = {
                node: {
                    children: {
                        child: {
                            fullName: 'TESTNOTFOUND'
                        }
                    }
                }
            };

            ctrl = $componentController('simpleHbField', {$scope: mockScope}, {nodeName: 'TEST'});

            expect(ctrl.node).toBeUndefined();
        });
    });
});
