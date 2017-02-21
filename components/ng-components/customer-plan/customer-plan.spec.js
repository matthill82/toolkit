describe('Customer plan component', function () {

    var $componentController;

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

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('$onInit()', function () {

        var mockedAccountData = {
            "propositions": [{
                "propositionType": "plan",
                "tariff": {
                    "name": "Unlimited Data Plan",
                    "dataAllowance": {
                        "category": "NEW",
                        "units": "GB",
                        "unlimited": false,
                        "number": 10
                    },
                    "textAllowance": {
                        "units": "texts",
                        "unlimited": true,
                        "number": 10000000
                    },
                    "talkAllowance": {
                        "units": "minutes",
                        "unlimited": false,
                        "number": 1200
                    },
                    "offers": [
                        {
                            "offerType": "upgrade",
                            "startDate": "2017-11-01"
                        }
                    ],
                    "features": [
                        {
                            "category": "Messaging",
                            "name": "MMS Video",
                            "unit": "MMS Video",
                            "value": "UK video message",
                            "id": null
                        },
                        {
                            "category": "Calls",
                            "name": "Call",
                            "unit": "Call",
                            "value": "Anytime to landlines",
                            "id": null
                        },
                        {
                            "category": "Calls",
                            "name": "Call",
                            "unit": "Call",
                            "value": "Call Anytime any network",
                            "id": null
                        }
                    ],
                    "customerTariffDetails": [
                        {
                            "propertyName": "mobileNumber",
                            "propertyValue": "01942342344"
                        }
                    ]
                },
                "offering": [
                    {
                        "offeringType": "monthlyContract",
                        "regularInstallmentAmount": {
                            "net": {
                                "value": 25
                            },
                            "currencyCode": "USD"
                        },
                        "termLength": "24",
                        "termLengthUnits": "month"
                    }
                ]
            }]
        };

        var mockJrdData = [
            {
                "offeringType": "monthlyLoanContract",
                "groupValue": "loan contract"
            },
            {
                "offeringType": "monthlyContract",
                "groupValue": "contract"
            }
        ];

        it('should return and assign the customer current plan', function () {

            var component = $componentController('customerPlan', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                JrdService: {
                    get: function () {
                        return mockJrdData
                    }
                },
                ConfigService: {
                    get: function () {
                        return mockConfigData;
                    }
                }
            }, {
                propositions: ['phoneAndPlan', 'plan']
            });

            component.$onInit();
            expect(component.tariff).toEqual(mockedAccountData.propositions[0].tariff);
            expect(component.offering).toEqual(mockedAccountData.propositions[0].offering[0]);

        });

        it('should render the correct offering type mapping', function () {

            var component = $componentController('customerPlan', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                JrdService: {
                    get: function () {
                        return mockJrdData
                    }
                },
                ConfigService: {
                    get: function () {
                        return mockConfigData;
                    }
                }
            }, {
                propositions: ['phoneAndPlan', 'plan']
            });

            component.$onInit();
            expect(component.offeringTypeMapping).toEqual('contract');

        });

        it('should return dataType list filtered to textAllowance/talkAllowance, with correct amount or unlimited text ', function () {

            var component = $componentController('customerPlan', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                JrdService: {
                    get: function () {
                        return mockJrdData
                    }
                },
                ConfigService: {
                    get: function () {
                        return mockConfigData;
                    }
                }
            }, {
                propositions: ['phoneAndPlan', 'plan']
            });

            var expectedResult = [
                { icon: 'cwsicon cwsicon-usage-text', label: 'Texts', amount: 'Unlimited', unit: '' },
                { icon: 'cwsicon cwsicon-usage-talk', label: 'Minutes', amount: 1200, unit: '' }
            ];

            component.$onInit();
            expect(component.deviceDataList).toEqual(expectedResult);

        });

        it('should return filtered list of features with icon', function () {

            var component = $componentController('customerPlan', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                JrdService: {
                    get: function () {
                        return mockJrdData
                    }
                },
                ConfigService: {
                    get: function () {
                        return mockConfigData;
                    }
                }
            }, {
                propositions: ['phoneAndPlan', 'plan'],
                featuresIcon: "featuresIcon"
            });

            var expectedResult = [
                { text: 'UK video message', icon: 'featuresIcon' },
                { text: 'Anytime to landlines', icon: 'featuresIcon' }
            ];

            component.$onInit();
            expect(component.featureList).toEqual(expectedResult);

        });

    });

});
