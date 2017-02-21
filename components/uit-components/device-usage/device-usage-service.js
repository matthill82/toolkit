angular
    .module('uitoolkit')
    .factory('DeviceUsageService', DeviceUsageService);

function DeviceUsageService() {

    return {
        getDeviceDataList: getDeviceDataList
    };

    function getDeviceDataList(planDetails, tariff, dataTypes) {
        var dataList = [];
        dataTypes.forEach(function (dataType) {
            var currentDataType = planDetails[dataType];
            dataList.push({
                icon: currentDataType.allowanceIcon,
                label: currentDataType.txAllowanceLabel,
                amount: tariff[currentDataType.tariffMapping].unlimited
                    ? currentDataType.txAllowanceUnlimitedText : tariff[currentDataType.tariffMapping].number,
                unit: currentDataType.txAllowanceUnit
            });
        });
        return dataList;
    }
}
