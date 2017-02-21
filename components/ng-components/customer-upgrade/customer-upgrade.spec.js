describe('Customer upgrade component', function () {

    var $componentController;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('$onInit()', function () {

        var mockedAccountData = {
            "propositions": [{
                "propositionType": "plan",
                "tariff": {
                    "offers": [
                        {
                            "offerType": "upgrade",
                            "startDate": "2017-11-01"
                        }
                    ]
                }
            }]
        };

        it('should return and assign the customer upgrade', function () {

            var component = $componentController('customerUpgrade', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                }
            }, {
                upgradeMessages: [
                    {type: 'early', message: 'message early', icon: 'early-icon'},
                    {type: 'eligible', message: 'message eligible', icon: 'eligible-icon'},
                    {type: 'window', message: 'message window', icon: 'window-icon'}
                ],
                upgradeWindow: 30,
                propositions: ['phoneAndPlan', 'plan']
            });

            component.$onInit();
            expect(component.proposition).toEqual(mockedAccountData.propositions[0]);

        });

        describe('should show upgrade content', function () {

            it('eligible: beyond the eligibility date', function () {

                var component = $componentController('customerUpgrade',
                    {
                        StateManagement: {
                            getAccountData: function () {
                                return mockedAccountData
                            }
                        },
                        EligibleUpgradeService: {
                            getEligibility: function () {
                                return {
                                    status: 'eligible',
                                    days: -273
                                }
                            }
                        }
                    },
                    {
                        upgradeWindow: 30,
                        upgradeMessages: [
                            {type: 'early', message: 'message early', icon: 'early-icon', image: '/early'},
                            {type: 'eligible', message: 'message eligible', icon: 'eligible-icon', image: '/eligible'}
                        ],
                        propositions: ['phoneAndPlan', 'plan']
                    });

                component.$onInit();

                expect(component.upgradeInfo).toEqual({
                    type: 'eligible',
                    message: 'message eligible',
                    icon: 'eligible-icon',
                    image: '/eligible'
                });

                it('early: within the upgrade window', function () {

                    var component = $componentController('customerUpgrade',
                        {
                            StateManagement: {
                                getAccountData: function () {
                                    return mockedAccountData
                                }
                            },
                            EligibleUpgradeService: {
                                getEligibility: function () {
                                    return {
                                        status: 'window',
                                        days: 20
                                    }
                                }
                            }
                        },
                        {
                            upgradeWindow: 30,
                            upgradeMessages: [
                                {type: 'early', message: 'message early', icon: 'early-icon', image: '/early'},
                                {
                                    type: 'eligible',
                                    message: 'message eligible',
                                    icon: 'eligible-icon',
                                    image: '/eligible'
                                }
                            ],
                            propositions: ['phoneAndPlan', 'plan']
                        });

                    component.$onInit();

                    expect(component.upgradeInfo).toEqual({
                        type: 'early',
                        message: 'message early',
                        icon: 'early-icon',
                        image: '/early'
                    });
                });

                it('early: outside of the upgrade window', function () {

                    var component = $componentController('customerUpgrade',
                        {
                            StateManagement: {
                                getAccountData: function () {
                                    return mockedAccountData
                                }
                            },
                            EligibleUpgradeService: {
                                getEligibility: function () {
                                    return {
                                        status: 'early',
                                        days: 200
                                    }
                                }
                            }
                        },
                        {
                            upgradeWindow: 30,
                            upgradeMessages: [
                                {type: 'early', message: 'message early', icon: 'early-icon', image: '/early'},
                                {
                                    type: 'eligible',
                                    message: 'message eligible',
                                    icon: 'eligible-icon',
                                    image: '/eligible'
                                }
                            ],
                            propositions: ['phoneAndPlan', 'plan']
                        });

                    component.$onInit();

                    expect(component.upgradeInfo).toEqual({
                        type: 'early',
                        message: 'message early',
                        icon: 'early-icon',
                        image: '/early'
                    });

                });
            });

        });

    });

});
