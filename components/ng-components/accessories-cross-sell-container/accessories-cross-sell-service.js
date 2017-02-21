angular
    .module('uitoolkit')
    .service('AccessoriesCrossSellService', AccessoriesCrossSellService);

/**
 *
 * @param $q
 * @param {DeviceService} DeviceService
 * @param {JrdService} JrdService
 * @param {StateManagement} StateManagement
 * @constructor
 */
function AccessoriesCrossSellService($q, DeviceService, JrdService, StateManagement) {
    this.getMappedAccessories = getMappedAccessories;

    /**
     *
     * @param productCategory
     * @param accessoriesForCategories
     */
    function getMappedAccessories(productCategory, accessoriesForCategories) {
        var mappings = JrdService.get(productCategory, 'accessories-crosssell');
        var selectedDeviceId = StateManagement.getDevice('device');
        var shouldDeviceId = [];

        if (selectedDeviceId) {
            selectedDeviceId = selectedDeviceId.replace(/^"?(.+?)"?$/, '$1');
        }


        // Find configured mappings for that device ID/category
        mappings.map(function (item) {
            if (item.mapToSKU === selectedDeviceId
                && angular.isDefined(accessoriesForCategories[item.category2])) {
                //Find a match by SKU -> keep it
                accessoriesForCategories[item.category2] = item.targetSKU;
            } else if(item.mapToSKU === '-' && accessoriesForCategories[item.category2] === null) {
                // Find a match by category -> keep it if nothing's been added so far
                accessoriesForCategories[item.category2] = item.targetSKU;
            }
        });

        // Construct query 'should' collection
        Object.keys(accessoriesForCategories).forEach(function (cat) {
            if (accessoriesForCategories[cat]) {
                shouldDeviceId.push({
                    'device.id': accessoriesForCategories[cat]
                });
            }
        });

        // Get data for the mapped accessories
        if (shouldDeviceId.length) {
            return DeviceService.elasticQuery({
                query: [
                    {
                        minimum_should_match: 1,
                        should: shouldDeviceId
                    }
                ]
            }).then(function (data) {
                return data.queryResult;
            });
        }

        return $q.resolve([]);
    }
}
