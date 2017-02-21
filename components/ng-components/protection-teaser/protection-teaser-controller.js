angular.module('uitoolkit')
    .controller('ProtectionTeaserController', ProtectionTeaserController);

/**
 * @param {$rootScope.Scope} $scope
 * @param EventEnums
 * @param {ProtectionTeaserService} ProtectionTeaserService
 * @constructor
 */
function ProtectionTeaserController(
    $scope,
    EventEnums,
    ProtectionTeaserService
) {
    var $ctrl = this;

    $ctrl.$onInit = ProtectionTeaserController$onInit;

    function ProtectionTeaserController$onInit() {
        $scope.$on(EventEnums.ENUMS.PRODUCT_OFFERINGS, function (event, data) {
            $ctrl.price = ProtectionTeaserService.getPrice(
                parseInt(data.upfrontPrice.net.value),
                $ctrl.journeyType,
                $ctrl.term
            );

            $ctrl.textParts = ProtectionTeaserService.getTextParts($ctrl.text);
        });
    }
}
