describe('Customer plan component', function () {

    var $componentController;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('$onInit()', function () {

        it('should return and assign the customer selected plan', function () {

            var mockedSelectedPlan = [{
                data: {
                    tariff: {
                        id: 'VZ102',
                        name: 'monthly phone plan',
                        dataAllowance: {
                            category: 'NEW',
                            units: 'GB',
                            unlimited: false,
                            number: 10
                        },
                        textAllowance: {
                            number: 10000000,
                            units: 'text',
                            unlimited: true
                        },
                        talkAllowance: {
                            number: 1200,
                            units: 'minutes',
                            unlimited: false
                        },
                        outOfBundleCharges: [{
                            price: {
                                net: {
                                    value: 1
                                },
                                currencyCode: 'USD'
                            },
                            chargeType: 'data',
                            chargeUnit: 'GB'
                        }],
                        serviceProvider: 'Verizon',
                        serviceProviderCode: 'VZ',
                        details: '',
                        offers: [{
                            offerType: 'upgrade',
                            startDate: '2017-11-01',
                            endDate: '2017-12-31'
                        }]
                    },
                    offering: [
                        {
                            offeringType: 'monthlyContract'
                        }
                    ]
                },
                selectedOffering: {
                    offeringType: 'monthlyContract'
                }
            }];
            var mockJrdData = [
                {
                    offeringType: 'monthlyLoanContract',
                    groupValue: 'loan contract'
                },
                {
                    offeringType: 'monthlyContract',
                    groupValue: 'contract'
                }
            ];
            var mockConfigData = {
                data: {
                    txAllowancePerMonthLabel: 'per month',
                    txAllowanceUnlimitedText: 'Unlimited'
                },
                talk: {
                    txAllowanceUnlimitedText: 'Unlimited',
                    allowanceIcon: 'talk-icon',
                    tariffMapping: 'talkAllowance'
                },
                text: {
                    txAllowanceUnlimitedText: 'Unlimited',
                    allowanceIcon: 'text-icon',
                    tariffMapping: 'textAllowance'
                }
            };

            var component = $componentController('uitBasketBuilderPlan', {
                BasketService: {
                    getBasket: function () {
                        return {
                            findPropositionsWithTariffs: function () {
                                return mockedSelectedPlan;
                            }
                        };
                    }
                },
                JrdService: {
                    get: function () {
                        return mockJrdData;
                    }
                },
                ConfigService: {
                    get: function () {
                        return mockConfigData;
                    }
                },
                BasketBuilderPlanService : {
                    getOfferingType: function () {
                        return 'contract';
                    }
                }
            });

            component.$onInit();

            expect(component.tariffProposition).toEqual(mockedSelectedPlan[0].data);
            expect(component.deviceUsage[0].amount).toEqual('Unlimited');
            expect(component.deviceUsage[1].amount).toEqual(1200);
            expect(component.contractLabel).toEqual('contract');
        });

    });

});
