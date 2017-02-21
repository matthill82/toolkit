describe('gridProduct component', function () {
    var $componentController;
    var $q;
    var $rootScope;
    var EventEnums;
    var deferred;
    var mockGridProductService;
    var mockProducts;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockGridProductService = {
            getProductsById: function () {
                return $q.resolve(mockProducts);
            },
            isSelected: jasmine.createSpy(),
            loadProductsFromJson: function () {
                deferred = $q.defer();

                return deferred.promise;
            },
            select: jasmine.createSpy()
        };

        spyOn(mockGridProductService, 'getProductsById').and.callThrough();
        spyOn(mockGridProductService, 'loadProductsFromJson').and.callThrough();

        mockProducts = [
            {

            }
        ];

        mockStateManagement = {
            journeyGetDirection: angular.noop,
            journeyGetDirectionKeys: function () {
                return {
                    NEXT: 'NEXT'
                };
            }
        };

        module(function ($provide) {
            $provide.value('GridProductService', mockGridProductService);
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_, _EventEnums_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        EventEnums = _EventEnums_;
    }));

    describe('Construct', function () {
        it('Should set features form json.', function () {
            var ctrl = $componentController('gridProduct', {$scope: $rootScope}, {featuresArray: '["TEST"]'});

            expect(ctrl.features).toEqual(['TEST']);
        });

        it('Should broadcast to button.', function () {
            spyOn($rootScope, '$broadcast');

            $componentController('gridProduct', {$scope: $rootScope}, {featuresArray: '["TEST"]'});

            expect($rootScope.$broadcast).toHaveBeenCalledWith(EventEnums.ENUMS.CTA_BUTTON_UPDATE, jasmine.any(Object));
        });
    });

    describe('.$onInit()', function () {
        it('Should get products by id.', function () {
            var ctrl = $componentController('gridProduct', {$scope: $rootScope}, {productIds: '1,2'});

            ctrl.$onInit();

            $rootScope.$digest();

            expect(mockGridProductService.getProductsById).toHaveBeenCalled();

            expect(ctrl.products).toEqual(mockProducts);
        });

        it('Should get products from Json.', function () {
            var ctrl = $componentController('gridProduct', {$scope: $rootScope});

            ctrl.$onInit();

            deferred.resolve(mockProducts);

            $rootScope.$digest();

            expect(ctrl.products).toEqual(mockProducts);
        });

        it('Should skip if get products from Json returns nothing.', function () {
            var ctrl = $componentController('gridProduct', {$scope: $rootScope});

            spyOn($rootScope, '$broadcast');

            ctrl.$onInit();

            deferred.reject();

            $rootScope.$digest();

            expect($rootScope.$broadcast).toHaveBeenCalledWith(
                EventEnums.ENUMS.CTA_BUTTON_TRIGGER,
                jasmine.any(Object)
            );
        });
    });

    describe('.isSelected()', function () {
        it('Should call the service.', function () {
            var ctrl = $componentController('gridProduct', {$scope: $rootScope});

            ctrl.isSelected();

            expect(mockGridProductService.isSelected).toHaveBeenCalled();
        });
    });

    describe('.select()', function () {
        it('Should broadcast', function () {
            var ctrl = $componentController('gridProduct', {$scope: $rootScope});

            spyOn($rootScope, '$broadcast');

            ctrl.select();

            expect($rootScope.$broadcast).toHaveBeenCalled();
        });

        it('Should call the service.', function () {
            var ctrl = $componentController('gridProduct', {$scope: $rootScope});

            ctrl.select();

            expect(mockGridProductService.select).toHaveBeenCalled();
        });
    });

    describe('.selectImage()', function () {
        it('Should call through to select when removeImageLink is not "true".', function () {
            var ctrl = $componentController('gridProduct', {$scope: $rootScope});

            ctrl.selectImage();

            expect(mockGridProductService.select).toHaveBeenCalled();
        });

        it('Should not call through to select when removeImageLink is not "true".', function () {
            var ctrl = $componentController('gridProduct', {$scope: $rootScope}, {removeImageLink: 'true'});

            ctrl.selectImage();

            expect(mockGridProductService.select).not.toHaveBeenCalled();
        });
    });
});
