describe('ProtectionTeaserService', function () {
    /** @type ProtectionTeaserService */
    var ProtectionTeaserService;
    var mock$sce;
    var mockJrdResponse;
    var mockJrdService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$sce = {
            trustAsHtml: function (input) {
                return 'SCE' + input;
            }
        };

        spyOn(mock$sce, 'trustAsHtml').and.callThrough();

        mockJrdResponse = [
            {
                fromPrice: 0,
                protectionPrice: '10',
                protectionTerm: 'Forever',
                toPrice: 100,
                monthlyPrice: '-'
            }
        ];

        mockJrdService = {
            get: function () {
                return mockJrdResponse;
            }
        };

        spyOn(mockJrdService, 'get').and.callThrough();

        module(function ($provide) {
            $provide.value('$sce', mock$sce);
            $provide.value('JrdService', mockJrdService);
        });
    });

    beforeEach(inject(function (_ProtectionTeaserService_) {
        ProtectionTeaserService = _ProtectionTeaserService_;
    }));

    describe('.getPrice()', function () {
        it('Should find price plan.', function () {
            var selectedPrice = ProtectionTeaserService.getPrice(
                50,
                'UNTESTED',
                'Forever'
            );

            expect(selectedPrice).toEqual('10');
        });

        it('Should find the monthly price.', function () {
            var selectedPrice;

            mockJrdResponse[0].protectionPrice = '-';
            mockJrdResponse[0].monthlyPrice = '5';

            selectedPrice = ProtectionTeaserService.getPrice(
                50,
                'UNTESTED',
                'Forever'
            );

            expect(selectedPrice).toEqual(5);
        });

        it('Should ignore prices with no matching price plan.', function () {
            var selectedPrice = ProtectionTeaserService.getPrice(
                101,
                'UNTESTED',
                'NOTHING'
            );

            expect(selectedPrice).toBeUndefined();
        });

        it('Should return undefined if no plans.', function () {
            var selectedPrice;

            mockJrdResponse = null;

            selectedPrice = ProtectionTeaserService.getPrice(
                101,
                'UNTESTED',
                'NOTHING'
            );

            expect(selectedPrice).toBeUndefined();
        });
    });

    describe('.getTextParts()', function () {
        it('Should split input using $sce.', function () {
            var parts = ProtectionTeaserService.getTextParts('BEFORE {0} AFTER');

            expect(mock$sce.trustAsHtml).toHaveBeenCalled();

            expect(parts).toEqual({before: 'SCEBEFORE', after: 'SCEAFTER'});
        });

        it('Should not error without a placeholder.', function () {
            var parts = ProtectionTeaserService.getTextParts('BEFORE AFTER');

            expect(mock$sce.trustAsHtml).toHaveBeenCalled();

            expect(parts).toEqual({before: 'SCEBEFORE AFTER', after: ''});
        });
    });
});
