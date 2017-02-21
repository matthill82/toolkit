describe('uitPriceFormat', function () {
    var $componentController;
    var $sce;
    var mockConfig;
    var mockConfigService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockConfig = {
            currencySymbol: '$'
        };

        mockConfigService = {
            get: function () {
                return mockConfig;
            }
        };

        module(function ($provide) {
            $provide.value('ConfigService', mockConfigService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$sce_) {
        $componentController = _$componentController_;
        $sce = _$sce_;
    }));

    describe('.$onInit()', function () {
        it('Should initialize.', function () {
            var ctrl;

            ctrl = $componentController('uitPriceFormat');

            ctrl.$onInit();

            expect(ctrl.number).toBe(0);
            expect(ctrl.config).toBe(mockConfig);
            expect($sce.getTrustedHtml(ctrl.currencySymbol)).toEqual(mockConfig.currencySymbol);
        });
    });
});
