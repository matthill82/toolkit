describe('DeviceHelperService', function () {
    /** @type {DeviceHelperService} */
    var DeviceHelperService;
    var mock$state;
    var mock$window;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$state = {
            go: jasmine.createSpy()
        };

        mock$window = {
            ENUMS: {
                DEVICE_KEYS: {
                    DEVICE: 'DEVICE',
                    PRESELECTED_DEVICE: 'PRESELECTED_DEVICE'
                }
            }
        };

        mockStateManagement = {
            setDevice: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('$state', mock$state);
            $provide.value('$window', mock$window);
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_DeviceHelperService_) {
        DeviceHelperService = _DeviceHelperService_;
    }));

    describe('.getCategoryRedirectUrl()', function () {
        it('Should get redirect URL for product\'s category1.', function () {
            expect(DeviceHelperService.getCategoryRedirectUrl(
                {device: {category1: 'TEST_CATEGORY'}},
                {'TEST_CATEGORY': 'test/url'}
            )).toEqual('test/url');
        });

        it('Should just return the url if it is configured as a string rather than a map.', function () {
            expect(DeviceHelperService.getCategoryRedirectUrl(
                {device: {category1: 'TEST_CATEGORY'}},
                'test/url'
            )).toEqual('test/url');
        });

        it('Should return undefined for an invalid device.', function () {
            expect(DeviceHelperService.getCategoryRedirectUrl(
                {},
                {'TEST_CATEGORY': 'test/url'}
            )).toBeUndefined();
        });
    });

    describe('.goToDevice()', function () {
        beforeEach(function () {
            String.prototype.replaceHTMLSuffix = function () {
                return this;
            };
        });

        it('Should set the device in state management', function () {
            DeviceHelperService.goToDevice({device: {category1: 'TEST_CATEGORY'}}, {'TEST_CATEGORY': 'test/url'});

            expect(mockStateManagement.setDevice).toHaveBeenCalled();
        });

        it('Should update the $state', function () {
            DeviceHelperService.goToDevice({device: {category1: 'TEST_CATEGORY'}}, {'TEST_CATEGORY': 'test/url'});

            expect(mock$state.go).toHaveBeenCalled();
        });
    });
});
