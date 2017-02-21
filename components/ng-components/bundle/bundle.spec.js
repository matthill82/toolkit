describe('bundle component', function () {
    var $componentController;
    var $rootScope;
    var mock$sce;
    var mockBucket;
    var mockBundle;
    var mockBasketService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$sce = {
            trustAsHtml: jasmine.createSpy()
        };

        mockBucket = {
            findAttachmentsByDisplayType: function () {
                return [mockBundle];
            }
        };

        spyOn(mockBucket, 'findAttachmentsByDisplayType').and.callThrough();

        mockBundle = {
            upsellAddMore: 'MESSAGE'
        };

        mockBasketService = {
            getBasket: function () {
                return mockBucket;
            }
        };

        spyOn(mockBasketService, 'getBasket').and.callThrough();

        module(function ($provide) {
            $provide.value('$sce', mock$sce);
            $provide.value('BasketService', mockBasketService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;

        spyOn($rootScope, '$watch').and.callThrough();
    }));

    describe('.$onInit()', function () {
        it('Should get the basket.', function () {
            var ctrl = $componentController('bundle');

            ctrl.$onInit();

            expect(mockBasketService.getBasket).toHaveBeenCalled();
        });

        it('Should watch.', function () {
            var ctrl = $componentController('bundle', {$scope: $rootScope});

            ctrl.$onInit();

            expect($rootScope.$watch).toHaveBeenCalled();
        });

        it('Should find bundle attachments.', function () {
            var ctrl = $componentController('bundle', {$scope: $rootScope}, {displayType: 'TEST'});

            ctrl.$onInit();

            $rootScope.$digest();

            expect(mockBucket.findAttachmentsByDisplayType).toHaveBeenCalledWith('TEST');
        });

        it('Should update message.', function () {
            var ctrl = $componentController(
                'bundle',
                {$scope: $rootScope},
                {
                    displayType: 'TEST',
                    moreText: 'SOME {0}'
                }
            );

            ctrl.$onInit();

            $rootScope.$digest();

            expect(mock$sce.trustAsHtml).toHaveBeenCalledWith('SOME MESSAGE');
        });

        it('Should set blank message on no bundle.', function () {
            var ctrl = $componentController(
                'bundle',
                {$scope: $rootScope},
                {
                    displayType: 'TEST',
                    moreText: 'SOME {0}'
                }
            );

            mockBundle.upsellAddMore = null;

            ctrl.$onInit();

            $rootScope.$digest();

            expect(mock$sce.trustAsHtml).toHaveBeenCalledWith('');
        });
    });
});
