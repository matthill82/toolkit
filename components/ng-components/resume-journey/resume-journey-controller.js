angular.module('uitoolkit')
    .controller('ResumeJourneyController', ResumeJourneyController);

function ResumeJourneyController(StateManagement, UtilityService) {

    var KEY_RESUME_JOURNEY = 'hBresumeJourney';

    var $ctrl = this;

    $ctrl.$onInit = $onInit;

    function $onInit() {
        updateSession();
    }

    function updateSession() {
        var resumeData = angular.fromJson(StateManagement.getSessionData(KEY_RESUME_JOURNEY)) || [];
        $ctrl.sectionType.forEach(function (type) {
            var existingConfig = UtilityService.getByPropertyValue(resumeData, 'sectionType', type);
            (existingConfig) ? updateExistingSessionData(existingConfig) : addToSessionData(resumeData, type);
        });
        StateManagement.setResumeJourney(resumeData);
    }

    function updateExistingSessionData(existingConfig) {
        existingConfig.sectionRoute = $ctrl.sectionRoute;
    }

    function addToSessionData(resumeData, type) {
        resumeData.push({sectionType: type, sectionRoute: $ctrl.sectionRoute})
    }
}
