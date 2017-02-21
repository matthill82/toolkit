describe('iframeCustom: ', function () {
    var $componentController;
    var ctrl;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));


    it('should have trustSrc method', function () {
        ctrl = $componentController('iframeCustom');

        expect(ctrl.trustSrc).toBeDefined();
    });
});
