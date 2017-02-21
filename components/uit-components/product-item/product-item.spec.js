describe('component: productItem', function () {
    var $componentController;
    var $rootScope;
    var $timeout;
    var mockEventEnums;
    var mockProduct;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockEventEnums = {
            ENUMS: {
                SELECTED_DEVICE: 'selectedDevice'
            }
        };

        mockProduct = {
            device: {
                imagery: [
                    {
                        url: 'http://test'
                    }
                ]
            }
        };

        module(function ($provide) {
            $provide.value('EventEnums', mockEventEnums);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$timeout_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;

        spyOn($rootScope, '$broadcast').and.callThrough();
    }));

    describe('.$onInit()', function () {
        it('Should default onIsSelected if not specified.', function () {
            var ctrl = $componentController('uitProductItem', {$scope: $rootScope});

            ctrl.$onInit();

            expect(ctrl.onIsSelected).toEqual(jasmine.any(Function));
        });

        it('Should default onSelectImage if not specified.', function () {
            var ctrl = $componentController('uitProductItem', {$scope: $rootScope});

            ctrl.$onInit();

            expect(ctrl.onSelectImage).toEqual(jasmine.any(Function));
        });

        it('Should broadcast device.', function () {
            var ctrl = $componentController(
                'uitProductItem',
                {
                    $scope: $rootScope
                },
                {
                    product: mockProduct,
                    onIsSelected: angular.noop,
                    onSelectImage: angular.noop
                }
            );

            ctrl.$onInit();

            // flush timeout(s) for all code under test.
            $timeout.flush();

            // this will throw an exception if there are any pending timeouts.
            $timeout.verifyNoPendingTasks();

            expect($rootScope.$broadcast).toHaveBeenCalledWith(
                mockEventEnums.ENUMS.SELECTED_DEVICE,
                mockProduct.device
            );
        });
    });
});
