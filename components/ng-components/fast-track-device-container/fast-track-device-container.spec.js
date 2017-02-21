describe('Fast Track Device Container Component', function () {
    var $componentController;
    var $q;
    var $rootScope;
    var $scope;
    var ctrl;
    var deferred;
    var mockDevice;
    var mockDeviceService;
    var mockFindProductsByNameResponse;


    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDevice = {
            device: {
                id: '1',
                manufacturer: 'Apple',
                name: 'iPhone 7 Plus',
                imagery: [
                    {
                        url: 'http://test/APPLE-IPHONE-7-128GB_GOLD_1'
                    }
                ]
            }
        };

        mockFindProductsByNameResponse = {
            aggregations: {
                devices: {
                    buckets: [
                        {
                            item: {
                                hits: {
                                    hits: [
                                        {
                                            _source: mockDevice
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        };

        mockDeviceService = {
            findProductsByName: function () {
                return $q.resolve(mockFindProductsByNameResponse);
            }
        };

        module(function ($provide) {
            $provide.value('DeviceService', mockDeviceService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        $scope = _$rootScope_.$new();

        ctrl = $componentController('fastTrackDeviceContainer');
    }));

    describe('Get Device', function () {
        it('should get data from PSI and resolve/reject all promises', function () {
            var device1Response;
            var device2Response;

            expect(ctrl.componentVisible).toBe(undefined);

            ctrl.getDevice('1').then(function (data) {
                device1Response = data;
            }, function () {
                device1Response = null;
            });

            ctrl.getDevice('2').then(function (data) {
                device2Response = data;
            }, function () {
                device2Response = null;
            });

            $scope.$digest();

            expect(device1Response).toEqual(mockDevice);
            expect(device2Response).toBe(null);
            expect(ctrl.componentVisible).toBeTruthy();
        });
    });
});
