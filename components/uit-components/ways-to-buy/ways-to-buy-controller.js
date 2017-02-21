angular
    .module('uitoolkit')
    .controller('UitWaysToBuyController', UitWaysToBuyController);

/**
 * @constructor
 */
function UitWaysToBuyController() {
    var $ctrl = this;

    $ctrl.selectOfferingType = selectOfferingType;

    function selectOfferingType(offeringType) {
        $ctrl.selectedOfferingType = offeringType;
    }
}
