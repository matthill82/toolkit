describe('AccessoriesCrossSellItemService', function () {
    var $componentController;
    var $q;
    var $rootScope;
    var ctrl;
    var deferredElasticQuery;
    var mockDeviceService;
    var mockGetDeviceResponse;
    var mockJrdGetResponse;
    var mockJrdService;
    var mockStateManagement;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDeviceService = {
            elasticQuery: function () {
                deferredElasticQuery = $q.defer();
                return deferredElasticQuery.promise;
            }
        };

        mockJrdService = {
            get: function () {
                return mockJrdGetResponse;
            }
        };

        mockStateManagement = {
            getDevice: function () {
                return mockGetDeviceResponse;
            }
        };


        module(function ($provide) {
            $provide.value('DeviceService', mockDeviceService);
            $provide.value('JrdService', mockJrdService);
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        ctrl = $componentController('accessoriesCrossSellContainer', null, {
            categoryCtaPath: 'test-category-cta-path',
            cssColumnClass: 'col-xs-3',
            imageCtaPath: 'test-image-cta-path',
            basketCtaSelectLabel: 'Add to Basket',
            basketCtaSelectedLabel: 'Remove from Basket'
        });
    }));

    describe('Methods', function () {
        beforeEach(function () {
            mockJrdGetResponse = [
                { 'index': 0, 'targetSKU': 'APPLE_12W_USB_POWER_ADAPTER',           'category1': 'accessory', 'category2': 'Power',            'mapToSKU': 'APPLE_IPHONE_6_16GB_SILVER'   },
                { 'index': 1, 'targetSKU': 'G4_IP6S_D30_COLOUR_MATCH',              'category1': 'accessory', 'category2': 'Cases',            'mapToSKU': 'APPLE_IPHONE_6_16GB_SILVER'   },
                { 'index': 2, 'targetSKU': 'GEAR4_D3O_ICEBOX_SHOCK_FOR_GALAXY_S7',  'category1': 'accessory', 'category2': 'Cases',            'mapToSKU': 'SAMSUNG_GALAXY_S7_32GB_WHITE' },
                { 'index': 3, 'targetSKU': 'TECH_GUARD_GALAXY_S7_SCREEN_PROTECTOR', 'category1': 'accessory', 'category2': 'Screen Protector', 'mapToSKU': 'SAMSUNG_GALAXY_S7_32GB_WHITE' },
                { 'index': 4, 'targetSKU': 'BEATS_WIRELESS_SOLO2_HEADPHONES',       'category1': 'accessory', 'category2': 'Audio',            'mapToSKU': '-'                            },
                { 'index': 5, 'targetSKU': 'KIT_ESSENTIAL_POWER_BANK_4K',           'category1': 'accessory', 'category2': 'Power',            'mapToSKU': '-'                            },
                { 'index': 7, 'targetSKU': 'JVC_GUMY_HEADPHONES',                   'category1': 'accessory', 'category2': 'Audio',            'mapToSKU': '-'                            }
            ];
        });

        it('$init should create category placeholder object', function () {
            mockGetDeviceResponse = null;
            mockJrdGetResponse = [];

            expect(ctrl.accessoriesForCategories).toBeUndefined();

            ctrl.$onInit();
            ctrl.getMappedAccessories();

            expect(ctrl.accessoriesForCategories).toEqual({});
            expect(ctrl.accessories).toBe(undefined);

            ctrl.getMappedAccessories();

            expect(ctrl.accessoriesForCategories).toEqual({});
            expect(ctrl.accessories).toBe(undefined);

            // AccessoriesCrossSellService should be mocked and some of these tests moved the service spec file
            // expect(AccessoriesCrossSellService.getMappedAccessories).not.toHaveBeenCalled();

        });

        it('should show nothing if no mappings are matching', function () {
            mockGetDeviceResponse = 'TEST_DEVICE_ID';

            ctrl.$onInit();

            ctrl.accessoriesForCategories['TEST_ACCESSORY_CATEGORY'] = null;


            ctrl.getMappedAccessories();

            $rootScope.$digest();

            expect(ctrl.accessoriesForCategories['TEST_ACCESSORY_CATEGORY']).toBe(null);

            expect(ctrl.accessories).toEqual([]);
            expect(mockDeviceService.elastiQuery).toBe(undefined);
        });

        it('should populate accessories by ID and category', function () {
            mockGetDeviceResponse = 'APPLE_IPHONE_6_16GB_SILVER';

            ctrl.$onInit();

            ctrl.accessoriesForCategories['Audio'] = null;
            ctrl.accessoriesForCategories['Power'] = null;
            ctrl.accessoriesForCategories['Cases'] = null;
            ctrl.accessoriesForCategories['Screen Protector'] = null;


            ctrl.getMappedAccessories();

            $rootScope.$digest();

            deferredElasticQuery.resolve({queryResult: []});

            $rootScope.$digest();

            expect(ctrl.accessories).toEqual([]);
            expect(ctrl.accessoriesForCategories['Power']).toBe('APPLE_12W_USB_POWER_ADAPTER');
            expect(ctrl.accessoriesForCategories['Cases']).toBe('G4_IP6S_D30_COLOUR_MATCH');
            expect(ctrl.accessoriesForCategories['Screen Protector']).toBe(null);
            expect(ctrl.accessoriesForCategories['Audio']).toBe('BEATS_WIRELESS_SOLO2_HEADPHONES');


        });

        it('should populate accessories by category', function () {
            mockGetDeviceResponse = 'TEST_DEVICE_ID';

            ctrl.$onInit();

            ctrl.accessoriesForCategories['Audio'] = null;
            ctrl.accessoriesForCategories['Power'] = null;
            ctrl.accessoriesForCategories['Cases'] = null;
            ctrl.accessoriesForCategories['Screen Protector'] = null;

            ctrl.getMappedAccessories();

            $rootScope.$digest();

            deferredElasticQuery.resolve({queryResult: []});
            $rootScope.$digest();

            expect(ctrl.accessories).toEqual([]);
            expect(ctrl.accessoriesForCategories['Power']).toBe('KIT_ESSENTIAL_POWER_BANK_4K');
            expect(ctrl.accessoriesForCategories['Cases']).toBe(null);
            expect(ctrl.accessoriesForCategories['Screen Protector']).toBe(null);
            expect(ctrl.accessoriesForCategories['Audio']).toBe('BEATS_WIRELESS_SOLO2_HEADPHONES');
        });

        it('should populate accessories for all categories', function () {
            mockGetDeviceResponse = 'SAMSUNG_GALAXY_S7_32GB_WHITE';

            ctrl.$onInit();

            ctrl.accessoriesForCategories['Audio'] = null;
            ctrl.accessoriesForCategories['Power'] = null;
            ctrl.accessoriesForCategories['Cases'] = null;
            ctrl.accessoriesForCategories['Screen Protector'] = null;

            ctrl.getMappedAccessories();

            $rootScope.$digest();

            deferredElasticQuery.resolve({
                queryResult: [
                    { device: { id: 'KIT_ESSENTIAL_POWER_BANK_4K'} },
                    { device: { id: 'GEAR4_D3O_ICEBOX_SHOCK_FOR_GALAXY_S7'} },
                    { device: { id: 'TECH_GUARD_GALAXY_S7_SCREEN_PROTECTOR'} },
                    { device: { id: 'BEATS_WIRELESS_SOLO2_HEADPHONES'} }
                ]
            });
            $rootScope.$digest();

            expect(ctrl.accessoriesForCategories['Power']).toBe('KIT_ESSENTIAL_POWER_BANK_4K');
            expect(ctrl.accessoriesForCategories['Cases']).toBe('GEAR4_D3O_ICEBOX_SHOCK_FOR_GALAXY_S7');
            expect(ctrl.accessoriesForCategories['Screen Protector']).toBe('TECH_GUARD_GALAXY_S7_SCREEN_PROTECTOR');
            expect(ctrl.accessoriesForCategories['Audio']).toBe('BEATS_WIRELESS_SOLO2_HEADPHONES');

            expect(ctrl.accessories.length).toBe(4);
        });

    });
});


