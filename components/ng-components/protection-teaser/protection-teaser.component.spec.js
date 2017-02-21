describe('component: protectionTeaser', function () {
    var $componentController;
    var $rootScope;
    /** @type ProtectionTeaserController */
    var ProtectionTeaserController;
    var mockEventEnums;
    var mockProtectionTeaserService;
    var mockTextParts;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockEventEnums = {
            ENUMS: {
                PRODUCT_OFFERINGS: 'productOfferings'
            }
        };

        mockProtectionTeaserService = {
            getPrice: function () {
                return 1;
            },
            getTextParts: function () {
                return mockTextParts;
            }
        };

        mockTextParts = {
            before: 'BEFORE',
            after: 'AFTER'
        };

        spyOn(mockProtectionTeaserService, 'getPrice').and.callThrough();
        spyOn(mockProtectionTeaserService, 'getTextParts').and.callThrough();

        module(function ($provide) {
            $provide.value('EventEnums', mockEventEnums);
            $provide.value('ProtectionTeaserService', mockProtectionTeaserService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;

        spyOn($rootScope, '$on').and.callThrough();
    }));

    describe('.$onInit()', function () {
        var bindings;

        beforeEach(function () {
            bindings = {journeyType: 'TEST_JOURNEY', term: 'TEST_TERM'};

            ProtectionTeaserController = $componentController('protectionTeaser', {$scope: $rootScope}, bindings);

            ProtectionTeaserController.$onInit();
        });

        it('Should listen for productOfferings', function () {
            expect($rootScope.$on).toHaveBeenCalledWith(mockEventEnums.ENUMS.PRODUCT_OFFERINGS, jasmine.any(Function));
        });

        describe('on PRODUCT_OFFERINGS', function () {
            beforeEach(function () {
                $rootScope.$broadcast(mockEventEnums.ENUMS.PRODUCT_OFFERINGS, {upfrontPrice: {net: {value: 100}}});

                $rootScope.$digest();
            });

            it('Should set on PRODUCT_OFFERINGS.', function () {
                expect(mockProtectionTeaserService.getPrice)
                    .toHaveBeenCalledWith(100, bindings.journeyType, bindings.term);

                expect(ProtectionTeaserController.price).toBe(1);
            });

            it('Should get text parts.', function () {
                expect(mockProtectionTeaserService.getTextParts).toHaveBeenCalled();

                expect(ProtectionTeaserController.textParts).toBe(mockTextParts);
            });
        });
    });
});
