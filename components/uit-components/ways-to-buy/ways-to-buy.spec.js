describe('uitWaysToBuy', function () {
    var $componentController;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('.selectOfferingType()', function () {
        it('Should select offering type.', function () {
            var ctrl = $componentController('uitWaysToBuy');

            ctrl.selectOfferingType('OFFERING');

            expect(ctrl.selectedOfferingType).toEqual('OFFERING');
        });
    });
});
