describe('productImage component', function () {
    var $componentController;
    var $q;
    var $rootScope;
    var mockDeviceService;
    var mockDeviceServiceResponse;
    var mockImage;
    var mockImageService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDeviceService = {
            getProductDetailsCached: function () {
                return $q.resolve(mockDeviceServiceResponse);
            }
        };

        spyOn(mockDeviceService, 'getProductDetailsCached').and.callThrough();

        mockDeviceServiceResponse = [{device: 'TEST'}];

        mockImage = {
            url: 'http://test'
        };

        mockImageService = {
            findDeviceImage: function () {
                return mockImage;
            }
        };

        spyOn(mockImageService, 'findDeviceImage').and.callThrough();

        module(function ($provide) {
            $provide.value('DeviceService', mockDeviceService);
            $provide.value('ImageService', mockImageService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    describe('.$onInit()', function () {
        var ctrl;

        beforeEach(function () {
            ctrl = $componentController('productImage', null, {colourIndex: '2', deviceId: 'TESTID', imageIndex: '1'});
        });

        it('Should query DeviceService.', function () {
            ctrl.$onInit();

            expect(mockDeviceService.getProductDetailsCached).toHaveBeenCalledWith('TESTID');
        });

        it('Should use ImageService to get specified image.', function () {
            ctrl.$onInit();

            $rootScope.$digest();

            expect(mockImageService.findDeviceImage).toHaveBeenCalledWith('TEST', 1, '2');

            expect(ctrl.image).toBe(mockImage);
        });
    });
});
