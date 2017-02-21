describe('billingDetails component', function () {
    var $componentController;
    var mockStateManagement;
    var accountInSession = {
        customer: {
            billingName: {
                firstName: 'Matthew',
                lastName: 'Hill',
                phoneNumber: '07798766339',
                email: 'matthill82@live.com'
            },
            billingAddress: {
                line1: '2nd Floor',
                line2: 'Hill',
                city: 'London',
                zipCode: 'SE19 2LQ'
            }
        }
    };

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockStateManagement = {
            getAccountData: function () {
                return accountInSession;
            }
        };

        spyOn(mockStateManagement, 'getAccountData').and.callThrough();

        module(function ($provide) {
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('.$onInit()', function () {
        it('Should call getDataFromAccount', function () {
            var ctrl = $componentController('billingDetails');

            spyOn(ctrl, 'getDataFromAccount');
            ctrl.$onInit();
            expect(ctrl.getDataFromAccount).toHaveBeenCalled();
        });
    });

    describe('.getDataFromAccount()', function () {
        it('Should set account to the valid value', function () {
            var ctrl = $componentController('billingDetails');

            ctrl.getDataFromAccount();
            expect(ctrl.account).toEqual(accountInSession.customer);
        });
    });

});
