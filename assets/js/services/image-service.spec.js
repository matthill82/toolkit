describe('ImageService', function () {
    /** @type {ImageService} */
    var ImageService;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_ImageService_) {
        ImageService = _ImageService_;
    }));

    describe('.findDeviceImage()', function () {
        var mockDevice;

        beforeEach(function () {
            mockDevice = {
                available_colours: [
                    {
                        imagery: [
                            {
                                url: 'http://test1'
                            }, {
                                url: 'http://test2'
                            }
                        ]
                    },
                    {
                        imagery: [
                            {
                                url: 'http://test3'
                            }
                        ]
                    }
                ],
                imagery: [
                    {
                        url: 'http://test4'
                    }, {
                        url: 'http://test5'
                    }
                ]
            };
        });

        it('Should return undefined if no device.', function () {
            expect(ImageService.findDeviceImage()).toBeUndefined();
        });

        it('Should return image by colour index.', function () {
            expect(ImageService.findDeviceImage(mockDevice, 0, 1)).toBe(mockDevice.available_colours[1].imagery[0]);
        });

        it('Should return image from device imagery if colour is undefined.', function () {
            expect(ImageService.findDeviceImage(mockDevice, 1)).toBe(mockDevice.imagery[1]);
        });

        it('Should return image from images if no available colours.', function () {
            mockDevice.available_colours = null;

            expect(ImageService.findDeviceImage(mockDevice, 1)).toBe(mockDevice.imagery[1]);
        });

        it('Should return undefined if no matching image', function () {
            mockDevice.available_colours = null;

            expect(ImageService.findDeviceImage(mockDevice, 2)).toBeUndefined();
        });

        it('Should return undefined if no images', function () {
            mockDevice.available_colours = null;
            mockDevice.imagery = null;

            expect(ImageService.findDeviceImage(mockDevice)).toBeUndefined();
        });

    });

    describe('.findImageUrlBySize()', function () {
        var mockImages;

        beforeEach(function () {
            mockImages = [
                {
                    description: 'TESTSM',
                    url: 'SM'
                }, {
                    description: 'TESTMD',
                    url: 'MD'
                }
            ];
        });

        it('Should find the image specified.', function () {
            expect(ImageService.findImageUrlBySize(mockImages, 'TESTMD')).toBe('MD');
        });

        it('Should default to the first if none found.', function () {
            expect(ImageService.findImageUrlBySize(mockImages, 'TESTLG')).toBe('SM');
        });

        it('Should default to the first if no size provided.', function () {
            expect(ImageService.findImageUrlBySize(mockImages)).toBe('SM');
        });

        it('Should reutrn empty string when no valid images.', function () {
            expect(ImageService.findImageUrlBySize([], 'TESTLG')).toBe('');
        });
    });
});
