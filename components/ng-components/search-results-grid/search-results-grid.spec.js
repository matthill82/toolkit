describe('component: searchResultsGrid', function () {
    var $componentController;
    var $rootScope;
    var $q;
    var mockDeviceHelperService;
    var mockSearchResultsGridService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDeviceHelperService = {
            goToDevice: jasmine.createSpy()
        };

        mockSearchResultsGridService = {
            search: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('DeviceHelperService', mockDeviceHelperService);
            $provide.value('SearchResultsGridService', mockSearchResultsGridService);
        });
    });

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {
        $componentController = _$componentController_;
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    describe('.query Search behaviour', function () {
        it('Should set and get the query value (short).', function () {
            var bindings = {searchAtCharacterCount: 2};
            var ctrl = $componentController('searchResultsGrid', null, bindings);

            ctrl.query = 'T';

            expect(ctrl.query).toEqual('T');
        });

        it('Should search when query value is required length.', function () {
            var bindings = {searchAtCharacterCount: 1, deviceCategoriesConfig: 'CATEGORY'};
            var ctrl = $componentController('searchResultsGrid', null, bindings);

            mockSearchResultsGridService.search.and.returnValue($q.when());

            ctrl.query = 'TEST';

            expect(mockSearchResultsGridService.search).toHaveBeenCalled();
        });

        describe('Using the mock service', function () {
            var bindings;
            var ctrl;
            var deferred;

            beforeEach(function () {
                bindings = {searchAtCharacterCount: 1, deviceCategoriesConfig: 'CATEGORY'};
                ctrl = $componentController('searchResultsGrid', null, bindings);
                deferred = $q.defer();

                mockSearchResultsGridService.search.and.returnValue(deferred.promise);
            });

            it('Should set pending flag while search is running.', function () {
                ctrl.query = 'TEST';

                expect(ctrl.pending).toBeTruthy();

                deferred.resolve([]);

                $rootScope.$apply();

                expect(ctrl.pending).toBeFalsy();
            });

            it('Should populate products from service call promise.', function () {
                var products = [{id: 'TEST'}];

                ctrl.query = 'TEST';

                expect(ctrl.products).toBeUndefined();

                deferred.resolve(products);

                $rootScope.$apply();

                expect(ctrl.products).toBe(products);
            });

            it('Should clear products if query is cleared.', function () {
                ctrl.query = 'TEST';

                expect(ctrl.products).toBeUndefined();

                deferred.resolve([]);

                $rootScope.$apply();

                expect(ctrl.products).toEqual([]);

                ctrl.query = '';

                expect(ctrl.products).toBeNull();
            });
        });
    });

    describe('.select()', function () {
        var bindings;
        var ctrl;

        beforeEach(function () {
            bindings = {searchAtCharacterCount: 1, deviceCategoriesConfig: 'CATEGORY'};
            ctrl = $componentController('searchResultsGrid', null, bindings);
        });

        it('Should broadcast the item', function () {
            spyOn($rootScope, '$broadcast');

            ctrl.select();

            expect($rootScope.$broadcast).toHaveBeenCalled();
        });

        it('Should call through to the DeviceHelperService.', function () {
            ctrl.select();

            expect(mockDeviceHelperService.goToDevice).toHaveBeenCalled();
        });
    });
});
