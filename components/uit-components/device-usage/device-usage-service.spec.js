describe('DeviceUsageService', function () {

    var DeviceUsageService;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_DeviceUsageService_) {
        DeviceUsageService = _DeviceUsageService_;
    }));

    it('should return "eligible" if eligible upgrade date is in the past', function () {

        var mockPlanDetails = {
            "data": {
                "txAllowanceLabel": "Data",
                "txAllowanceUnlimitedText": "Unlimited data",
                "txAllowanceUnit": "GB",
                "allowanceIcon": "cwsicon cwsicon-usage-data",
                "tariffMapping": "dataAllowance"
            },
            "talk": {
                "txAllowanceLabel": "Minutes",
                "txAllowanceUnlimitedText": "Unlimited talk",
                "txAllowanceUnit": "",
                "allowanceIcon": "cwsicon cwsicon-usage-talk",
                "tariffMapping": "talkAllowance"
            },
            "text": {
                "txAllowanceLabel": "Texts",
                "txAllowanceUnlimitedText": "Unlimited text",
                "txAllowanceUnit": "",
                "allowanceIcon": "cwsicon cwsicon-usage-text",
                "tariffMapping": "textAllowance"
            }
        };
        var mockTariff = {
            talkAllowance: {
                number: 1200,
                units: "minutes",
                unlimited: false
            },
            textAllowance: {
                number: 10000000,
                units: "texts",
                unlimited: true
            }
        };
        var mockDataTypes = ['talk', 'text'];
        var mockExpectedResult = [
            {
                icon: 'cwsicon cwsicon-usage-talk',
                label: 'Minutes',
                amount: 1200,
                unit: ''
            },
            {
                icon: 'cwsicon cwsicon-usage-text',
                label: 'Texts',
                amount: 'Unlimited text',
                unit: ''
            }
        ];
        var result = DeviceUsageService.getDeviceDataList(mockPlanDetails, mockTariff, mockDataTypes);

        expect(result).toEqual(mockExpectedResult);

    });
});
