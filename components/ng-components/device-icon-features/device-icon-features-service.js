angular.module('uitoolkit')
    .service('DeviceIconFeaturesService', DeviceIconFeaturesService);

/**
 * @param JrdService
 * @constructor
 */
function DeviceIconFeaturesService(
    JrdService
) {
    var DATA_TYPE = 'feature-mappings';

    this.constructMappingData = constructMappingData;
    this.getChunkedMappingsForRows = getChunkedMappingsForRows;

    /**
     * @param {string} journeyType
     * @param {object} device
     * @param {object[]} featureList
     * @returns {object[]}
     */
    function constructMappingData(journeyType, device, featureList) {
        return featureList.map(function (feature) {
            return _getFeatureMapping(
                journeyType,
                feature.featureCategory,
                feature.featureName,
                _getFeatureValuesFromDevice(
                    device,
                    feature.featureCategory,
                    feature.featureName
                )
            );
        }).filter(function (mapping) {
            return !!mapping;
        });
    }

    /**
     * @param {object[]} mappings
     * @param {number} icons
     * @param {number} rows
     * @returns {array[]}
     */
    function getChunkedMappingsForRows(mappings, icons, rows) {
        var chunkedArray = [[]];
        var numberPerRow;
        var row = 0;
        var totalMapped = 0;

        numberPerRow = Math.ceil(icons / rows);

        mappings.forEach(function (mapping) {
            if (totalMapped < icons) {
                totalMapped++;

                if (chunkedArray[row].length === numberPerRow) {
                    row++;
                    chunkedArray[row] = [];
                }

                chunkedArray[row].push(mapping);
            }
        });

        return chunkedArray;
    }

    /**
     * @param {string} journeyType
     * @param {string} featureCategory
     * @param {string} featureName
     * @param {string[]} featureValues
     * @returns {?object} Map if found
     * @private
     */
    function _getFeatureMapping(journeyType, featureCategory, featureName, featureValues) {
        var maps = JrdService.get(journeyType, DATA_TYPE);

        if (maps) {
            return featureValues.map(function (featureValue) {
                return maps.find(function (map) {
                    return map.featureCategory === featureCategory &&
                        map.featureName === featureName &&
                        map.featureValue === featureValue;
                });
            }).find(function (map) {
                return !!map;
            });
        }
    }

    /**
     * @param {object} device
     * @param {string} featureCategory
     * @param {string} featureName
     * @returns {string[]}
     * @private
     */
    function _getFeatureValuesFromDevice(device, featureCategory, featureName) {
        var deviceValues = [];

        if (device && angular.isArray(device.features)) {
            device.features.forEach(function (feature) {
                if (feature.category === featureCategory && feature.name === featureName) {
                    deviceValues.push(feature.value);
                }
            });
        }

        return deviceValues;
    }
}
