angular
    .module('uitoolkit')
    .controller('UitBasketBuilderStateManagerController', UitBasketBuilderStateManagerController);

function UitBasketBuilderStateManagerController($state, StateManagement, UtilityService) {
    var KEY_RESUME_JOURNEY = 'hBresumeJourney';
    var $ctrl = this;
    var existingConfig;

    $ctrl.$onInit = $onInit;
    $ctrl.handleClick = handleClick;

    function $onInit() {
        var resumeData = angular.fromJson(StateManagement.getSessionData(KEY_RESUME_JOURNEY)) || [];

        existingConfig = UtilityService.getByPropertyValue(resumeData, 'sectionType', $ctrl.sectionType);
        $ctrl.inProgress = existingConfig ? $ctrl.inProgressLabel : '';
    }

    function handleClick() {
        if(!$ctrl.disabledState) {
            $state.go(existingConfig ? existingConfig.sectionRoute: $ctrl.ctaLink);
        }
    }
}
