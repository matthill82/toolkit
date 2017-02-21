describe('EligibleUpgradeService', function () {

    var EligibleUpgradeService;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_EligibleUpgradeService_) {
        EligibleUpgradeService = _EligibleUpgradeService_;
    }));

    it('should return "eligible" if eligible upgrade date is in the past', function () {

        var eligibleDate = {
            getTime: function () {
                return 1453248000000;
            }
        };

        var currentDate = {
            getTime: function () {
                return 1484911917406;
            }
        };

        var upgradeWindow = 30;

        var expectedResponse = EligibleUpgradeService.getEligibility(eligibleDate, currentDate, upgradeWindow);
        expect(expectedResponse.status).toEqual( 'eligible');
        expect(expectedResponse.days).toEqual(-366);

    });

    it('should return "eligible" if eligible upgrade date is today', function () {

        var eligibleDate = {
            getTime: function () {
                return 1484870400000;
            }
        };

        var currentDate = {
            getTime: function () {
                return 1484911839779;
            }
        };


        var upgradeWindow = 30;

        var expectedResponse = EligibleUpgradeService.getEligibility(eligibleDate, currentDate, upgradeWindow);
        expect(expectedResponse.status).toEqual( 'eligible');
        expect(expectedResponse.days).toEqual(-0);

    });

    it('should return "window" if eligible upgrade date is in the future, and exact number of days of the upgradeWindow', function () {

        var eligibleDate = {
            getTime: function () {
                return 1487462400000;
            }
        };

        var currentDate = {
            getTime: function () {
                return 1484911982617;
            }
        };

        var upgradeWindow = 30;

        var expectedResponse = EligibleUpgradeService.getEligibility(eligibleDate, currentDate, upgradeWindow);
        expect(expectedResponse.status).toEqual( 'window');
        expect(expectedResponse.days).toEqual(30);

    });

    it('should return "window" if eligible upgrade date is in the future, and within the number of days of the upgradeWindow', function () {

        var eligibleDate = {
            getTime: function () {
                return 1485302400000;
            }
        };

        var currentDate = {
            getTime: function () {
                return 1484912031437;
            }
        };

        var upgradeWindow = 30;

        var expectedResponse = EligibleUpgradeService.getEligibility(eligibleDate, currentDate, upgradeWindow);
        expect(expectedResponse.status).toEqual( 'window');
        expect(expectedResponse.days).toEqual(5);

    });

    it('should return "early" if eligible upgrade date is in the future, and out of range of the upgradeWindow (31 days)', function () {

        var eligibleDate = {
            getTime: function () {
                return 1487548800000;
            }
        };

        var currentDate = {
            getTime: function () {
                return 1484912141337;
            }
        };

        var upgradeWindow = 30;

        var expectedResponse = EligibleUpgradeService.getEligibility(eligibleDate, currentDate, upgradeWindow);
        expect(expectedResponse.status).toEqual( 'early');
        expect(expectedResponse.days).toEqual31;

    });

});
