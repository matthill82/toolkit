describe('Customer device component', function () {

    var $componentController;

    var mockUpgradeMessage = [
        { type: 'early', message: 'message early', icon: 'early-icon'},
        { type: 'eligible', message: 'message eligible', icon: 'eligible-icon'},
        { type: 'window', message: 'message window', icon: 'window-icon'}
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

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('$onInit()', function () {

        var mockedAccountData = {
            "propositions": [{
                "propositionType": "phone",
                "device": {
                    "offers": [
                        {
                            "offerType": "upgrade",
                            "startDate": "2017-11-01"
                        }
                    ]
                },
                "offering": [
                    {
                        "offeringType": "monthlyLoanContract",
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

        it('should return and assign the customer current device', function () {

            var component = $componentController('customerDevice', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                EligibleUpgradeService: {
                    getEligibility: function () {
                        return {
                            status: 'eligible',
                            days: 0,
                            eligibleDate: ''
                        }
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
                upgradeMessages: mockUpgradeMessage,
                upgradeWindow: 30,
                propositions: ['phoneAndPlan', 'phone']
            });

            component.$onInit();

            expect(component.proposition).toEqual(mockedAccountData.propositions[0]);
            expect(component.offering).toEqual(component.proposition.offering[0]);

        });

        it('should render the correct offering type mapping', function () {

            var component = $componentController('customerDevice', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                EligibleUpgradeService: {
                    getEligibility: function () {
                        return {
                            status: 'eligible',
                            days: 0,
                            eligibleDate: ''
                        }
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
                upgradeMessages: mockUpgradeMessage,
                upgradeWindow: 30,
                propositions: ['phoneAndPlan', 'phone']
            });

            component.$onInit();

            expect(component.offeringTypeMapping).toEqual('loan contract');

        });

        it('should render the eligible upgrade message/icon', function () {

            var component = $componentController('customerDevice', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                EligibleUpgradeService: {
                    getEligibility: function () {
                        return {
                            status: 'eligible',
                            days: 0,
                            eligibleDate: 'date'
                        }
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
                upgradeMessages: mockUpgradeMessage,
                upgradeWindow: 30,
                propositions: ['phoneAndPlan', 'phone']
            });

            component.$onInit();

            expect(component.upgradeMessage).toContain('message eligible');
            expect(component.upgradeIcon).toContain('eligible-icon');

        });

        it('should render the window upgrade message/icon', function () {

            var component = $componentController('customerDevice', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                EligibleUpgradeService: {
                    getEligibility: function () {
                        return {
                            status: 'window',
                            days: 10,
                            eligibleDate: 'date'
                        }
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
                upgradeMessages: mockUpgradeMessage,
                upgradeWindow: 30,
                propositions: ['phoneAndPlan', 'phone']
            });

            component.$onInit();

            expect(component.upgradeMessage).toContain('message window');
            expect(component.upgradeIcon).toContain('window-icon');

        });

        it('should render the early upgrade message/icon', function () {

            var component = $componentController('customerDevice', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                EligibleUpgradeService: {
                    getEligibility: function () {
                        return {
                            status: 'early',
                            days: 40,
                            eligibleDate: 'date'
                        }
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
                upgradeMessages: mockUpgradeMessage,
                upgradeWindow: 30,
                propositions: ['phoneAndPlan', 'phone']
            });

            component.$onInit();

            expect(component.upgradeMessage).toContain('message early');
            expect(component.upgradeIcon).toContain('early-icon');

        });

    });

});
