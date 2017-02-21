angular
    .module('uitoolkit')
    .service('AverageUsageService', AverageUsageService);

function AverageUsageService(UtilityService) {

    var USAGE_HISTORY_MAPPINGS = {
        data: 'data',
        talk: 'minutes',
        text: 'texts'
    };

    return {
        getAverageUsage: getAverageUsage
    };

    /**
     *
     * @param {[]} usageHistory
     * @param {number} averageUsageWindow
     * @param {{}} dataTypeDetails
     * @returns {*}
     */
    function getAverageUsage(usageHistory, averageUsageWindow, dataTypeDetails) {
        var sumOfAllDataTypes = getSumOfAllDataTypes(usageHistory, averageUsageWindow, dataTypeDetails);
        var dataList = [];
        for (var dataType in dataTypeDetails) {
            if (dataTypeDetails.hasOwnProperty(dataType)) {
                dataList.push({
                    icon: dataTypeDetails[dataType].allowanceIcon,
                    label: dataTypeDetails[dataType].txAllowanceLabel,
                    amount: getAverageAndRoundUp(sumOfAllDataTypes[dataType], averageUsageWindow),
                    unit: dataTypeDetails[dataType].txAllowanceUnit
                });
            }
        }
        return dataList;
    }

    /**
     *
     * @param {[]} fullUsageHistory
     * @param {number} averageUsageWindow
     * @param {{}} dataTypeDetails
     * @returns {{data: number, talk: number, text: number}}
     */
    function getSumOfAllDataTypes(fullUsageHistory, averageUsageWindow, dataTypeDetails) {
        var usageHistory = orderAndFilterUsageHistory(fullUsageHistory, averageUsageWindow);
        var sum = {};
        usageHistory.forEach(function (usageItem) {
            for (var dataType in dataTypeDetails) {
                if (!sum.hasOwnProperty(dataType)) sum[dataType] = 0;
                sum[dataType] += UtilityService.getByPropertyValue(
                    usageItem.usageValues,
                    'allowanceType',
                    USAGE_HISTORY_MAPPINGS[dataType]
                ).amount;
            }
        });
        return sum;
    }

    /**
     *
     * @param {number} sum
     * @param {number} averageUsageWindow
     * @returns {number}
     */
    function getAverageAndRoundUp(sum, averageUsageWindow) {
        return Math.round(sum / averageUsageWindow);
    }

    /**
     *
     * @param {[]} fullUsageHistory
     * @param {number} averageUsageWindow
     * @returns {*}
     */
    function orderAndFilterUsageHistory(fullUsageHistory, averageUsageWindow) {
        var orderedList = fullUsageHistory.sort(function (a, b) {
            return new Date(b.usageDate).getTime() - new Date(a.usageDate).getTime()
        });
        return orderedList.slice(0, averageUsageWindow);
    }

}
