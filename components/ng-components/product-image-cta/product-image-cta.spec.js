describe('productImageCta component', function () {
    var $componentController;
    var ctrl;
    var mock$state;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$state = {
            go: jasmine.createSpy()
        };

        mockStateManagement = {
            setDevice: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('$state', mock$state);
            $provide.value('StateManagement', mockStateManagement);
        });

        String.prototype.replaceHTMLSuffix = function () {
            return this;
        };
    });


    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;

        ctrl = $componentController('productImageCta', null, {ctaPath: 'testPath', deviceId: 'testDeviceId'});
    }));


    describe('Methods: ', function () {
        it('Should handle click.', function () {
            expect(ctrl.onClick).toBeDefined();

            ctrl.onClick();

            expect(mockStateManagement.setDevice).toHaveBeenCalledWith('device', 'testDeviceId');
            expect(mock$state.go).toHaveBeenCalledWith('testPath');
        });
    });
});
