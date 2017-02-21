describe('featuredProduct component', function () {
    var $componentController;
    var $q;
    var $rootScope;
    var mockFeaturedProductService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockFeaturedProductService = {
            findById: function () {
                return $q.resolve({
                    offering: [
                        {
                            upfrontPrice: {
                                net: {
                                    value: 9999
                                }
                            }
                        }
                    ]
                });
            },
            isSelected: jasmine.createSpy(),
            select: jasmine.createSpy()
        };

        spyOn(mockFeaturedProductService, 'findById').and.callThrough();

        module(function ($provide) {
            $provide.value('FeaturedProductService', mockFeaturedProductService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    describe('.$onInit()', function () {
        it('Should call service to get the product.', function () {
            var ctrl = $componentController('featuredProduct', {$scope: $rootScope});

            ctrl.$onInit();

            expect(mockFeaturedProductService.findById).toHaveBeenCalled();
        });

        it('Should set the product.', function () {
            var ctrl = $componentController('featuredProduct', {$scope: $rootScope});

            ctrl.$onInit();

            expect(ctrl.product).toBeUndefined();

            $rootScope.$digest();

            expect(ctrl.product).toBeDefined();
        });
    });

    describe('.isSelected()', function () {
        it('Should not call service when there is no product.', function () {
            var ctrl = $componentController('featuredProduct', {$scope: $rootScope});

            ctrl.isSelected();

            expect(mockFeaturedProductService.isSelected).not.toHaveBeenCalled();
        });

        it('Should call service', function () {
            var ctrl = $componentController('featuredProduct', {$scope: $rootScope});

            ctrl.product = {};

            ctrl.isSelected();

            expect(mockFeaturedProductService.isSelected).toHaveBeenCalled();
        });
    });

    describe('.select()', function () {
        it('Should call service', function () {
            var ctrl = $componentController('featuredProduct', {$scope: $rootScope});

            ctrl.select();

            expect(mockFeaturedProductService.select).toHaveBeenCalled();
        });
    });
});
