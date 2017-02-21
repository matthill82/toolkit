describe('Customer average usage component', function () {

    var $componentController;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('$onInit()', function () {

        it('should return and assign the account and customer average usage', function () {

            var mockedAccountData = {
                "propositions": [
                    {
                        "propositionType": "plan",
                        "offering": [
                            {
                                "offeringType": "one",
                                "usageHistory": [
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
                                                "amount": 300
                                            },
                                            {
                                                "allowanceType": "texts",
                                                "units": "texts",
                                                "amount": 50
                                            }
                                        ]
                                    }]
                            },
                            {
                                "offeringType": "two"
                            }
                        ]
                    }
                ]
            };

            var mockAverageUsageResponse = [
                {
                    dataAllowance: {
                        amount: 9,
                        icon: "tickswatch",
                        label: "per month"
                    }
                }
            ];

            var mockConfigData = {
                "data": {
                    "txAllowanceLabel": "Data",
                    "txAllowanceUnlimitedText": "Unlimited",
                    "txAllowanceUnit": "GB",
                    "allowanceIcon": "cwsicon cwsicon-usage-data",
                    "tariffMapping" : "dataAllowance"
                },
                "talk": {
                    "txAllowanceLabel": "Minutes",
                    "txAllowanceUnlimitedText": "Unlimited",
                    "txAllowanceUnit": "",
                    "allowanceIcon": "cwsicon cwsicon-usage-talk",
                    "tariffMapping" : "talkAllowance"
                },
                "text": {
                    "txAllowanceLabel": "Texts",
                    "txAllowanceUnlimitedText": "Unlimited",
                    "txAllowanceUnit": "",
                    "allowanceIcon": "cwsicon cwsicon-usage-text",
                    "tariffMapping" : "textAllowance"
                }
            };

            var component = $componentController('customerAverageUsage', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                UtilityService: {
                    getByPropertyValue: function () {
                        return mockedAccountData.propositions[0]
                    }
                },
                AverageUsageService: {
                    getAverageUsage: function () {
                        return mockAverageUsageResponse
                    }
                },
                ConfigService: {
                    get: function () {
                        return mockConfigData;
                    }
                }
            }, {
                propositions: ['phoneAndPlan', 'plan'],
                averageUsageWindow: 6
            });

            component.$onInit();

            expect(component.offering).toEqual(mockedAccountData.propositions[0].offering[0]);
            expect(component.averageUsageList).toEqual(mockAverageUsageResponse);

        });

    });

});
