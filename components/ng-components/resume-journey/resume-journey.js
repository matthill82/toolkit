angular.module('uitoolkit')
    .component('resumeJourney', {
        bindings: {
            sectionType: '<',
            sectionRoute: '@'
        },
        controller: 'ResumeJourneyController'
    });
