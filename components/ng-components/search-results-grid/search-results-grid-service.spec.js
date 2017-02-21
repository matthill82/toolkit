describe('SearchResultsGridService', function () {
    var $q;
    var mockDeviceService;
    /** @type {SearchResultsGridService} */
    var SearchResultsGridService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockDeviceService = {
            findByQueryAndCategories: jasmine.createSpy()
        };

        module(function ($provide) {
            $provide.value('DeviceService', mockDeviceService);
        });
    });

    beforeEach(inject(function (_$q_, _SearchResultsGridService_) {
        $q = _$q_;
        SearchResultsGridService = _SearchResultsGridService_;
    }));

    describe('.search()', function () {
        it('Should call through to DeviceService and return a promise.', function () {
            var promise = $q.defer().promise;
            var resultPromise;

            mockDeviceService.findByQueryAndCategories.and.returnValue($q.defer().promise);

            resultPromise = SearchResultsGridService.search('TEST', 1, 'CATEGORY');

            expect(mockDeviceService.findByQueryAndCategories).toHaveBeenCalled();

            expect(resultPromise).toEqual(promise);
        });
    });
});
