describe('Graph: ', function () {
    var $componentController;
    var ctrl;
    var mockDependencies = {
        $element:{
            find: function () {
                return [{
                    getContext: function () {
                        return {
                            beginPath: angular.noop,
                            arc: angular.noop,
                            stroke: angular.noop
                        };
                    }
                }];
            }
        }
    };

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));


    it('should have $onInit method', function () {
        ctrl = $componentController('graph', mockDependencies);

        expect(ctrl.$onInit).toBeDefined();
    });

    it('should support graph-small', function () {
        ctrl = $componentController('graph', mockDependencies, {
            canvasColor: '#ff00ff',
            canvasId: 'mock-canvas-1',
            canvasPosition: '2',
            canvasSize: 'S'
        });

        ctrl.$onInit();
    });

    it('should work without size specified', function () {
        ctrl = $componentController('graph', mockDependencies, {
            canvasColor: '#ffaaff',
            canvasId: 'mock-canvas-2',
            canvasPosition: '4'
        });

        ctrl.$onInit();
    });


});
