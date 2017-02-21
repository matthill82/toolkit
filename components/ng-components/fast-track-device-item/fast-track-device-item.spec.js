describe('Fast Track Device Item Component', function () {
    var $componentController;
    var $q;
    var $rootScope;
    var bindings;
    var ctrl;
    var deferred;
    var mock$state;
    var mock$window;
    var mockGetDeviceResponse;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$state = {
            go: jasmine.createSpy()
        };

        mock$window = {
            ENUMS: {
                DEVICE_KEYS: {
                    DEVICE: 'device'
                }
            }
        };

        mockGetDeviceResponse = {
            device: {
                name: 'iPhone 7 Plus',
                manufacturer: 'Apple',
                imagery: [
                    {
                        url: 'http://test/APPLE-IPHONE-7-128GB_GOLD_1'
                    }
                ]
            }
        };

        mockStateManagement = {
            setDevice: jasmine.createSpy()
        };


        bindings = {
            currencyConfig: '[{\x22currencySymbol\x22:\x22\\u0026#163;\x22,\x22currencyFormat\x22:\x220\x22,\x22decimalSymbol\x22:\x22.\x22,\x22digitsAfterDecimal\x22:2,\x22digitGroupingSymbol\x22:\x22,\x22,\x22digitGrouping\x22:\x221\x22}]',
            deviceId: 'IPHONE_7_PLUS',
            message: 'Camera with a f/1.7 aperture',
            path: 'device-details',
            price: '666',
            pricePrefix: 'From'
        };

        module(function ($provide) {
            $provide.value('$state', mock$state);
            $provide.value('$window', mock$window);
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        ctrl = $componentController('fastTrackDeviceItem', {$scope: $rootScope}, bindings);
        ctrl.FastTrackDeviceContainerController = {
            getDevice: function () {
                deferred = $q.defer();

                return deferred.promise;
            }
        };
    }));

    describe('Init', function () {
        it('should init with device data from elastic', function () {
            ctrl.$onInit();

            deferred.resolve(mockGetDeviceResponse);

            $rootScope.$digest();

            expect(ctrl.title).toBe(mockGetDeviceResponse.device.manufacturer + ' '
                + mockGetDeviceResponse.device.name
            );
            expect(ctrl.deviceImgUrl).toBe(mockGetDeviceResponse.device.imagery[0].url);
        });
    });

    describe('Transition', function () {
        it('should store the device ID and go to the page specified', function () {
            ctrl.goTo();

            expect(mockStateManagement.setDevice).toHaveBeenCalledWith(mock$window.ENUMS.DEVICE_KEYS.DEVICE, ctrl.deviceId);
            expect(mock$state.go).toHaveBeenCalledWith(ctrl.path);
        });
    });
});
