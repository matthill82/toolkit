angular
    .module('uitoolkit')
    .service('SearchResultsGridService', SearchResultsGridService);

/**
 * @param $q
 * @param {DeviceService} DeviceService
 * @constructor
 */
function SearchResultsGridService($q, DeviceService) {
    var canceller;

    this.search = search;

    function search(query, maxResultsCount, deviceCategories) {
        if (canceller) {
            canceller.resolve();
        }

        canceller = $q.defer();

        return DeviceService.findByQueryAndCategories(
            {
                query: query,
                maxAmount: maxResultsCount
            },
            deviceCategories,
            canceller
        )
            .then(function (data) {
                return data.queryResult;
            });
    }
}
