angular
    .module('uitoolkit')
    .service('EligibleUpgradeService', EligibleUpgradeService);

function EligibleUpgradeService() {

    var STATUS_ELIGIBLE = 'eligible';
    var STATUS_EARLY = 'early';
    var STATUS_WINDOW = 'window';

    return {
        getEligibility: getEligibility,
        STATUS_EARLY: STATUS_EARLY,
        STATUS_WINDOW: STATUS_WINDOW
    };

    /**
     * Returns value indicating whether a customer is eligible for an upgrade, and amount of days
     *
     * @param eligibleDate
     * @param currentDate
     * @param upgradeWindow
     * @returns {{status: string, days: number}}
     */
    function getEligibility (eligibleDate, currentDate, upgradeWindow) {

        var timeDifference = eligibleDate.getTime() - currentDate.getTime();
        var daysUntilEligible = Math.ceil(timeDifference / (1000 * 3600 * 24));

        var eligibilityState = {
            eligibleDate: eligibleDate,
            status: STATUS_ELIGIBLE,
            days: daysUntilEligible
        };

        if (daysUntilEligible <= upgradeWindow && daysUntilEligible > 0) eligibilityState.status = STATUS_WINDOW;
        if (daysUntilEligible > upgradeWindow) eligibilityState.status = STATUS_EARLY;

        return eligibilityState;

    }
}
