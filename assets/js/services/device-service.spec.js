describe('Device service: ', function () {
    var $httpBackend;
    /** @type {DeviceService} */
    var DeviceService;
    var mockConfig;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockConfig = {
            psi_url: 'http://PSI'
        };

        module(function ($provide) {
            $provide.value('config', mockConfig);
        });
    });

    beforeEach(inject(function (_$httpBackend_, _DeviceService_) {
        $httpBackend = _$httpBackend_;
        DeviceService = _DeviceService_;
    }));

    describe('.findAllProducts()', function () {
        it('should be defined', function () {
            expect(DeviceService.findAllProducts).toEqual(jasmine.any(Function));
        });
    });

    describe('.findAllPropositions()', function () {
        it('should be defined', function () {
            expect(DeviceService.findAllPropositions).toEqual(jasmine.any(Function));
        });
    });

    describe('.findAllFacets()', function () {
        it('should be defined', function () {
            expect(DeviceService.findAllFacets).toEqual(jasmine.any(Function));
        });
    });

    describe('.findProductsFiltered()', function () {
        it('should be defined', function () {
            expect(DeviceService.findProductsFiltered).toEqual(jasmine.any(Function));
        });
    });

    describe('.getProductDetails()', function () {
        it('should be defined', function () {
            expect(DeviceService.getProductDetails).toEqual(jasmine.any(Function));
        });
    });

    describe('.findProductsByName()', function () {
        it('should be defined', function () {
            expect(DeviceService.findProductsByName).toEqual(jasmine.any(Function));
        });
    });

    describe('.getAllPlansForDevice()', function () {
        it('should be defined', function () {
            expect(DeviceService.getAllPlansForDevice).toEqual(jasmine.any(Function));
        });
    });

    describe('.getUniquePlanForDevice()', function () {
        it('should be defined', function () {
            expect(DeviceService.getUniquePlanForDevice).toEqual(jasmine.any(Function));
        });
    });

    describe('.getUniquePlansForDevice()', function () {
        it('should be defined', function () {
            expect(DeviceService.getUniquePlansForDevice).toEqual(jasmine.any(Function));
        });
    });

    describe('.getAllFacetsForDevice()', function () {
        it('should be defined', function () {
            expect(DeviceService.getAllFacetsForDevice).toEqual(jasmine.any(Function));
        });
    });

    describe('.findPropositionById()', function () {
        it('should be defined', function () {
            expect(DeviceService.findPropositionById).toEqual(jasmine.any(Function));
        });
    });

    describe('.getAllPlansForDeviceAndFacets()', function () {
        it('should be defined', function () {
            expect(DeviceService.getAllPlansForDeviceAndFacets).toEqual(jasmine.any(Function));
        });
    });

    describe('.getProductDetailsCached()', function () {
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('Should query.', function () {
            $httpBackend.expect('POST', mockConfig.$psi_url).respond('');

            DeviceService.getProductDetailsCached('TEST');

            $httpBackend.flush();
        });

        it('Should return cache promise if available.', function () {
            var promise;

            $httpBackend.expect('POST', mockConfig.$psi_url).respond('');

            promise = DeviceService.getProductDetailsCached('TEST');

            $httpBackend.flush();

            expect(DeviceService.getProductDetailsCached('TEST')).toBe(promise);
        });

        it('Should resolve results.', function () {
            var queryResult = [{device: 'TEST'}];
            var promiseResponse;

            $httpBackend.expect('POST', mockConfig.$psi_url).respond({queryResult: queryResult});

            DeviceService.getProductDetailsCached('TEST').then(function (response) {
                promiseResponse = response;
            });

            $httpBackend.flush();

            expect(promiseResponse).toEqual(queryResult);
        });
    });
});
