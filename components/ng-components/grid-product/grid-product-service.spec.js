describe('GridProductService', function () {
    var $q;
    var $rootScope;
    /** @type {GridProductService} */
    var GridProductService;
    var mockAttachment;
    var mockBasket;
    var mockBasketAttachment;
    var mockBasketService;
    var mockDeviceHelperService;
    var mockDeviceService;
    var mockDeviceServiceResponse;
    var mockElasticQueryResult;
    var mockJrdService;
    var mockJrdResponse;
    var mockProduct;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockAttachment = {

        };

        mockBasket = {
            addAttachment: jasmine.createSpy(),
            findAttachmentById: function () {
                return mockAttachment;
            },
            removeAttachment: jasmine.createSpy()
        };

        spyOn(mockBasket, 'findAttachmentById').and.callThrough();

        mockBasketAttachment = jasmine.createSpy();

        mockBasketService = {
            getBasket: function () {
                return mockBasket;
            }
        };

        spyOn(mockBasketService, 'getBasket').and.callThrough();

        mockDeviceHelperService = {
            goToDevice: jasmine.createSpy()
        };

        mockDeviceService = {
            elasticQuery: function () {
                return $q.resolve(mockElasticQueryResult);
            },
            findProductsByName: function () {
                return $q.resolve(mockDeviceServiceResponse);
            },
            getAllDevicesByCategoriesOrId: function () {
                return $q.resolve(mockDeviceServiceResponse);
            }
        };

        spyOn(mockDeviceService, 'elasticQuery').and.callThrough();
        spyOn(mockDeviceService, 'getAllDevicesByCategoriesOrId').and.callThrough();

        mockDeviceServiceResponse = {
            aggregations: {
                devices: {
                    buckets: [
                        {
                            item: {
                                hits: {
                                    hits: [
                                        {
                                            _source: mockProduct
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        };

        mockElasticQueryResult = {
            queryResult: [
                {
                    device: {
                        category1: 'C1',
                        category2: 'C2'
                    }
                }
            ]
        };

        mockJrdService = {
            get: function () {
                return mockJrdResponse;
            }
        };

        mockProduct = {
            id: 'ID',
            offering: [
                {
                    id: 'OFFERING_ID',
                    offeringType: 'fullPrice',
                    previousUpfrontPrice: {
                        net: {
                            value: 3
                        }
                    },
                    upfrontPrice: {
                        net: {
                            value: 2
                        }
                    }
                }
            ]
        };

        mockStateManagement = {
            getDevice: function () {
                return '1';
            }
        };

        module(function ($provide) {
            $provide.value('BasketAttachment', mockBasketAttachment);
            $provide.value('BasketService', mockBasketService);
            $provide.value('DeviceHelperService', mockDeviceHelperService);
            $provide.value('DeviceService', mockDeviceService);
            $provide.value('JrdService', mockJrdService);
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$q_, _$rootScope_, _GridProductService_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        GridProductService = _GridProductService_;
    }));

    describe('.isSelected()', function () {
        it('Should return falsy when page type "deals".', function () {
            expect(GridProductService.isSelected({}, 'deals')).toBeFalsy();
        });

        it('Should search basket for item when page type "sku-mapper".', function () {
            expect(GridProductService.isSelected({id: 'ID'}, 'sku-mapper')).toBeTruthy();

            expect(mockBasket.findAttachmentById).toHaveBeenCalled();
        });

        it('Should be undefined if unrecognised page type.', function () {
            expect(GridProductService.isSelected({}, '')).toBeUndefined();
        });
    });

    describe('.select()', function () {
        it('Should go to device when page type "deals".', function () {
            GridProductService.select({}, 'deals');

            expect(mockDeviceHelperService.goToDevice).toHaveBeenCalled();
        });

        it('Should toggle out a selected product when page type "sku-mapper".', function () {
            GridProductService.select(mockProduct, 'sku-mapper');

            expect(mockBasket.removeAttachment).toHaveBeenCalled();
        });

        it('Should toggle in an unselected product when page type "sku-mapper".', function () {
            mockAttachment = undefined;

            GridProductService.select(mockProduct, 'sku-mapper');

            expect(mockBasket.addAttachment).toHaveBeenCalled();
        });

        it('Should set the saving on a new BasketAttachment.', function () {
            mockAttachment = undefined;

            GridProductService.select(mockProduct, 'sku-mapper');

            expect(mockBasketAttachment).toHaveBeenCalledWith(
                mockProduct,
                undefined,
                mockProduct.offering[0].id,
                1,
                1
            );
        });

        it('Should be undefined if unrecognised page type.', function () {
            expect(GridProductService.select({}, '')).toBeUndefined();
            expect(mockDeviceHelperService.goToDevice).not.toHaveBeenCalled();
            expect(mockBasket.addAttachment).not.toHaveBeenCalled();
            expect(mockBasket.removeAttachment).not.toHaveBeenCalled();
        });
    });

    describe('.getProductsById()', function () {
        it('Should resolve products.', function () {
            var resolvedProducts;

            GridProductService.getProductsById('ID').then(function (products) {
                resolvedProducts = products;
            });

            $rootScope.$digest();

            expect(resolvedProducts).toEqual([mockProduct]);
        });

        it('Should resolve empty array if there are no results.', function () {
            var resolvedProducts;

            mockDeviceServiceResponse = {
                aggregations: {
                    devices: {
                        buckets: [
                        ]
                    }
                }
            };

            GridProductService.getProductsById('ID').then(function (products) {
                resolvedProducts = products;
            });

            $rootScope.$digest();

            expect(resolvedProducts).toEqual([]);
        });
    });

    describe('.loadProductsFromJson()', function () {
        it('Should reject on no mappings.', function () {
            var rejected;

            GridProductService.loadProductsFromJson().then(angular.noop, function () {
                rejected = true;
            });

            $rootScope.$digest();

            expect(mockDeviceService.getAllDevicesByCategoriesOrId).not.toHaveBeenCalled();
            expect(mockDeviceService.elasticQuery).not.toHaveBeenCalled();

            expect(rejected).toBeTruthy();
        });

        it('Should use mapBySku if set.', function () {
            var resolvedProducts;

            mockJrdResponse = [
                {
                    mapToSKU: '1',
                    targetSKU: '2'
                }
            ];

            GridProductService.loadProductsFromJson().then(function (products) {
                resolvedProducts = products;
            });

            $rootScope.$digest();

            expect(mockDeviceService.getAllDevicesByCategoriesOrId).toHaveBeenCalled();

            expect(resolvedProducts).toEqual([mockProduct]);
        });

        it('Should search for mappings.', function () {
            var resolvedProducts;

            mockJrdResponse = [
                {
                    category1: 'C1',
                    category2: 'C2',
                    targetSKU: '2'
                }
            ];

            GridProductService.loadProductsFromJson().then(function (products) {
                resolvedProducts = products;
            });

            $rootScope.$digest();

            expect(mockDeviceService.elasticQuery).toHaveBeenCalled();

            expect(resolvedProducts).toEqual([mockProduct]);
        });

        it('Should reject if data.queryResult.length.', function () {
            var rejected;

            mockElasticQueryResult.queryResult = [];

            GridProductService.loadProductsFromJson().then(angular.noop, function () {
                rejected = true;
            });

            $rootScope.$digest();

            expect(mockDeviceService.elasticQuery).toHaveBeenCalled();

            expect(rejected).toBeTruthy();
        });

        it('Should reject if no mappings found.', function () {
            var rejected;

            mockJrdResponse = [{}];

            GridProductService.loadProductsFromJson().then(angular.noop, function () {
                rejected = true;
            });

            $rootScope.$digest();

            expect(mockDeviceService.elasticQuery).toHaveBeenCalled();

            expect(rejected).toBeTruthy();
        });

        it('Should limit results to 6.', function () {
            var bucket = {
                item: {
                    hits: {
                        hits: [
                            {
                                _source: mockProduct
                            }
                        ]
                    }
                }
            };
            var resolvedProducts;

            mockDeviceServiceResponse.aggregations.devices.buckets = [
                bucket,
                bucket,
                bucket,
                bucket,
                bucket,
                bucket,
                bucket
            ];

            mockJrdResponse = [
                {
                    mapToSKU: '1',
                    targetSKU: '2'
                }
            ];

            GridProductService.loadProductsFromJson().then(function (products) {
                resolvedProducts = products;
            });

            $rootScope.$digest();

            expect(mockDeviceService.getAllDevicesByCategoriesOrId).toHaveBeenCalled();

            expect(resolvedProducts).toEqual(
                [mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct]
            );
        });
    });
});
