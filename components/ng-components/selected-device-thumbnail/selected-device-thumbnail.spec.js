describe('Selected Device Thumbnail Component', function () {
    var $componentController;
    var $q;
    var $rootScope;
    var bindings;
    var ctrl;
    var deferred;
    var mockDeviceService;
    var mockProposition;
    var mockImageService;
    var mockStateManagement;
    var mockGetDeviceResponse;
    var mockGetProductDetailsCached;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockProposition = {
            device: {
                id: 'IPHONE_7_PLUS',
                name: 'iPhone 7 Plus',
                manufacturer: 'Apple',
                imagery: [
                    {
                        url: 'http://test/APPLE-IPHONE-7-128GB_GOLD_1'
                    }
                ]
            }
        };

        mockDeviceService = {
            getProductDetailsCached: function () {
                deferred = $q.defer();

                return deferred.promise;
            }
        };
        spyOn(mockDeviceService, 'getProductDetailsCached').and.callThrough();


        mockImageService = {
            findImageUrlBySize: function () {
                return mockProposition.device.imagery[0].url;
            }
        };
        spyOn(mockImageService, 'findImageUrlBySize').and.callThrough();

        mockStateManagement = {
            getDevice: function () {
                return mockGetDeviceResponse;
            }
        };
        spyOn(mockStateManagement, 'getDevice').and.callThrough();

        bindings = {
            imageSize: 'small'
        };

        module(function ($provide) {
            $provide.value('DeviceService', mockDeviceService);
            $provide.value('ImageService', mockImageService);
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        ctrl = $componentController('selectedDeviceThumbnail', {$scope: $rootScope}, bindings);
    }));

    describe('Init', function () {
        it('should initialise component and visualise the result', function () {
            mockGetDeviceResponse = mockProposition.device.id;
            mockGetProductDetailsCached = [mockProposition];

            expect(ctrl.showComponent).toBe(undefined);

            ctrl.$onInit();

            expect(mockStateManagement.getDevice).toHaveBeenCalled();

            expect(mockDeviceService.getProductDetailsCached).toHaveBeenCalled();

            deferred.resolve(mockGetProductDetailsCached);

            $rootScope.$digest();

            expect(mockImageService.findImageUrlBySize).toHaveBeenCalledWith(
                mockProposition.device.imagery,
                bindings.imageSize
            );

            expect(ctrl.showComponent).toBe(true);
            expect(ctrl.manufacturer).toBe(mockProposition.device.manufacturer);
            expect(ctrl.name).toBe(mockProposition.device.name);
            expect(ctrl.imgSrc).toBe(mockProposition.device.imagery[0].url);

        });

        it('should hide the component if device data can\'t be retrieved', function () {
            mockGetDeviceResponse = mockProposition.device.id;
            mockGetProductDetailsCached = [];

            expect(ctrl.showComponent).toBe(undefined);

            ctrl.$onInit();

            expect(mockStateManagement.getDevice).toHaveBeenCalled();

            expect(mockDeviceService.getProductDetailsCached).toHaveBeenCalled();

            deferred.resolve(mockGetProductDetailsCached);

            $rootScope.$digest();

            expect(mockImageService.findImageUrlBySize).not.toHaveBeenCalled();

            expect(ctrl.showComponent).toBe(undefined);
            expect(ctrl.manufacturer).toBe(undefined);
            expect(ctrl.name).toBe(undefined);
            expect(ctrl.imgSrc).toBe(undefined);
        });

        it('should hide the component if no device is selected', function () {
            mockGetDeviceResponse = null;

            expect(ctrl.showComponent).toBe(undefined);

            ctrl.$onInit();

            expect(mockStateManagement.getDevice).toHaveBeenCalled();

            expect(mockDeviceService.getProductDetailsCached).not.toHaveBeenCalled();

            expect(mockImageService.findImageUrlBySize).not.toHaveBeenCalled();

            expect(ctrl.showComponent).toBe(undefined);
            expect(ctrl.manufacturer).toBe(undefined);
            expect(ctrl.name).toBe(undefined);
            expect(ctrl.imgSrc).toBe(undefined);
        });
    });
});
