describe('Customer average usage service', function () {

    var service;

    var mockPlanDetails = {
        "data": {
            "txAllowanceLabel": "Data",
            "txAllowanceUnlimitedText": "Unlimited",
            "txAllowanceUnit": "GB",
            "allowanceIcon": "cwsicon cwsicon-usage-data",
            "tariffMapping": "dataAllowance"
        },
        "talk": {
            "txAllowanceLabel": "Minutes",
            "txAllowanceUnlimitedText": "Unlimited",
            "txAllowanceUnit": "",
            "allowanceIcon": "cwsicon cwsicon-usage-talk",
            "tariffMapping": "talkAllowance"
        },
        "text": {
            "txAllowanceLabel": "Texts",
            "txAllowanceUnlimitedText": "Unlimited",
            "txAllowanceUnit": "",
            "allowanceIcon": "cwsicon cwsicon-usage-text",
            "tariffMapping": "textAllowance"
        }
    };

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (AverageUsageService) {
        service = AverageUsageService;

    }));

    describe('getAverageUsage()', function () {

        it('should return averaged values of correctly ordered data', function () {

            var mockedUsageHistory = [
                {
                    "usageDate": "2016-01-01",
                    "usageValues": [
                        {
                            "allowanceType": "data",
                            "units": "GB",
                            "amount": 4
                        },
                        {
                            "allowanceType": "minutes",
                            "units": "minutes",
                            "amount": 311
                        },
                        {
                            "allowanceType": "texts",
                            "units": "texts",
                            "amount": 70
                        }
                    ]
                },
                {
                    "usageDate": "2016-02-01",
                    "usageValues": [
                        {
                            "allowanceType": "data",
                            "units": "GB",
                            "amount": 3
                        },
                        {
                            "allowanceType": "minutes",
                            "units": "minutes",
                            "amount": 300
                        },
                        {
                            "allowanceType": "texts",
                            "units": "texts",
                            "amount": 51
                        }
                    ]
                }
            ];

            var expectedResponse = [
                {icon: 'cwsicon cwsicon-usage-data', label: 'Data', amount: 4, unit: 'GB'},
                {icon: 'cwsicon cwsicon-usage-talk', label: 'Minutes', amount: 306, unit: ''},
                {icon: 'cwsicon cwsicon-usage-text', label: 'Texts', amount: 61, unit: ''}
            ];

            var serviceResponse = service.getAverageUsage(mockedUsageHistory, 2, mockPlanDetails);
            expect(serviceResponse).toEqual(expectedResponse);

        });

        it('should return averaged values of data reordered and filtered by average usage window', function () {

            var mockedUsageHistory = [
                {
                    "usageDate": "2016-02-01",
                    "usageValues": [
                        {
                            "allowanceType": "data",
                            "units": "GB",
                            "amount": 3
                        },
                        {
                            "allowanceType": "minutes",
                            "units": "minutes",
                            "amount": 300
                        },
                        {
                            "allowanceType": "texts",
                            "units": "texts",
                            "amount": 51
                        }
                    ]
                },
                {
                    "usageDate": "2016-03-01",
                    "usageValues": [
                        {
                            "allowanceType": "data",
                            "units": "GB",
                            "amount": 1800
                        },
                        {
                            "allowanceType": "minutes",
                            "units": "minutes",
                            "amount": 554
                        },
                        {
                            "allowanceType": "texts",
                            "units": "texts",
                            "amount": 1236
                        }
                    ]
                },
                {
                    "usageDate": "2016-01-01",
                    "usageValues": [
                        {
                            "allowanceType": "data",
                            "units": "GB",
                            "amount": 4
                        },
                        {
                            "allowanceType": "minutes",
                            "units": "minutes",
                            "amount": 350
                        },
                        {
                            "allowanceType": "texts",
                            "units": "texts",
                            "amount": 55
                        }
                    ]
                }
            ];

            var expectedResponse = [
                {icon: 'cwsicon cwsicon-usage-data', label: 'Data', amount: 902, unit: 'GB'},
                {icon: 'cwsicon cwsicon-usage-talk', label: 'Minutes', amount: 427, unit: ''},
                {icon: 'cwsicon cwsicon-usage-text', label: 'Texts', amount: 644, unit: ''}
            ];

            var serviceResponse = service.getAverageUsage(mockedUsageHistory, 2, mockPlanDetails);
            expect(serviceResponse).toEqual(expectedResponse);

        });

    });

});
