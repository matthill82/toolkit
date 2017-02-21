describe('deviceBenefits component', function () {
    var $componentController;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('Construct', function () {
        it('Should build benefits.', function () {
            var ctrl;
            var mockFeatures = [
                {
                    value: 'TESTNAME',
                    category: 'TEST'
                }, {
                    value: 'TESTWONTFIND',
                    category: 'TESTWONTFIND'
                }
            ];
            var mockProduct = {
                device: {
                    features: [
                        {
                            category: 'TEST',
                            id: 'ID1',
                            name: 'TESTNAME',
                            value: 'VALUE'
                        }, {
                            category: 'TESTEXCLUDE',
                            id: 'ID2',
                            name: 'TESTEXCLUDE',
                            value: 'VALUE'
                        }
                    ]
                }
            };

            ctrl = $componentController('deviceBenefits', null, {featuresArray: mockFeatures, product: mockProduct});

            expect(ctrl.benefits).toEqual([[mockProduct.device.features[0]]]);
        });
    });
});
