describe('AccessoriesCrossSellItem', function () {
    var $componentController;
    var $rootScope;
    var ctrl;
    var mock$state;
    var mockAccessoriesCrossSellItemService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$state = {
            go: jasmine.createSpy()
        };

        mockAccessoriesCrossSellItemService = {
            isSelected: jasmine.createSpy(),
            select: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('$state', mock$state);
            $provide.value('$ctrl', ctrl);
            $provide.value('AccessoriesCrossSellItemService', mockAccessoriesCrossSellItemService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;

        ctrl = $componentController('accessoriesCrossSellItem', null, {
            categoryValue: 'accessory::Screen protector',
            AccessoriesCrossSellContainerController: {
                accessoriesForCategories: {},
                categoryCtaPath: 'test-category-cta-path',
                imageCtaPath: 'test-image-cta-path',
                getMappedAccessories: jasmine.createSpy()
            }
        });
    }));

    describe('Methods', function () {
        it('should expose methods', function () {
            expect(ctrl.$onInit).toBeDefined();
            expect(ctrl.categoryOnClick).toBeDefined();
            expect(ctrl.imageOnClick).toBeDefined();
            expect(ctrl.isSelected).toBeDefined();
            expect(ctrl.select).toBeDefined();
        });

        it('should create category placeholder', function () {
            expect(
                ctrl.AccessoriesCrossSellContainerController.accessoriesForCategories['Screen protector']
            ).toBeUndefined();

            ctrl.$onInit();

            $rootScope.$digest();

            expect(
                ctrl.AccessoriesCrossSellContainerController.accessoriesForCategories['Screen protector']
            ).toBe(null);

            expect(
                ctrl.AccessoriesCrossSellContainerController.getMappedAccessories
            ).toHaveBeenCalled();
        });

        it('should change the state on category click', function () {
            ctrl.categoryOnClick();
            expect(mock$state.go).toHaveBeenCalledWith(ctrl.AccessoriesCrossSellContainerController.categoryCtaPath);
        });

        it('should change the state on category click', function () {
            ctrl.imageOnClick();
            expect(mock$state.go).toHaveBeenCalledWith(ctrl.AccessoriesCrossSellContainerController.imageCtaPath);
        });

        it('should call the service', function () {
            expect(ctrl.isSelected()).toBe(false);
            expect(mockAccessoriesCrossSellItemService.isSelected).not.toHaveBeenCalled();

            ctrl.isSelected('TEST_DEVICE_ID');
            expect(mockAccessoriesCrossSellItemService.isSelected).toHaveBeenCalled();

            ctrl.select();
            expect(mockAccessoriesCrossSellItemService.select).toHaveBeenCalled();
        });

    });
});
