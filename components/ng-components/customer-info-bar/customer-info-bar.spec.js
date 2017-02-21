describe('Customer info bar component', function () {

    var $componentController;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('$onInit()', function () {

        it('should return and assign the customer object', function () {

            var mockedAccountData = {
                "preferences": {
                    "fullName": "Murray Goldberg",
                    "communication": [
                        {
                            "preferenceType": "mobile",
                            "preferenceValue": "079123123123"
                        }
                    ]
                }
            };

            var component = $componentController('customerInfoBar', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                }
            });

            component.$onInit();
            expect(component.account).toEqual(mockedAccountData);

        });

        it('should assign the mobile number', function () {

            var mockedAccountData = {
                "preferences": {
                    "fullName": "Murray Goldberg",
                    "communication": [
                        {
                            "preferenceType": "mobile",
                            "preferenceValue": "079123123123"
                        }
                    ]
                }
            };

            var component = $componentController('customerInfoBar', {
                StateManagement: {
                    getAccountData: function () {
                        return mockedAccountData
                    }
                },
                UtilityService: {
                    getByPropertyValue: function () {
                        return mockedAccountData.preferences.communication[0]
                    }
                }
            });

            component.$onInit();
            expect(component.mobileNumber).toEqual('079123123123');

        });

    });

});
