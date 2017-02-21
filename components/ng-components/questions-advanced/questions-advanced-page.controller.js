angular.module('uitoolkit')
    .controller('QuestionsAdvancedPageController', QuestionsAdvancedPageController);

function QuestionsAdvancedPageController($scope, EventEnums, StateManagement) {
    //
    // Init
    //
    var directionKeys = StateManagement.journeyGetDirectionKeys();

    $scope.questionsOnPage = $scope.questionsOnPage || {};

    StateManagement.journeySetStart('');


    updateNextButton();


    //
    // Helpers
    //
    function areAllQuestionsAnswered() {
        var areAllAnswered = true;

        for (var q in $scope.questionsOnPage) {
            if (!$scope.questionsOnPage[q].answered) {
                areAllAnswered = false;
            }
        }

        return areAllAnswered;
    }

    function areAllQuestionsHidden() {
        var areAllHidden = true;

        for (var q in $scope.questionsOnPage) {
            if ($scope.questionsOnPage[q].visible) {
                areAllHidden = false;
            }
        }

        return areAllHidden;
    }

    function getQuestionsCta() {

        for (var questionId  in $scope.questionsOnPage) {
            var q = $scope.questionsOnPage[questionId];

            for (var j=0; j<q.selectedAnswers.length; j++) {
                var selectedAnswer = q.selectedAnswers[j];

                if (q.answers[selectedAnswer] && q.answers[selectedAnswer].cta) {
                    return q.answers[selectedAnswer].cta;
                }
            }
        }

        return null;
    }

    function updateNextButton() {

        $scope.$root.$broadcast(EventEnums.ENUMS.CTA_BUTTON_UPDATE, { direction: directionKeys.NEXT, disabled: !areAllQuestionsAnswered(), link: getQuestionsCta() });

    }


    //
    // Watchers
    //
    $scope.$watch('questionsOnPage', function () {

        updateNextButton();

        if (Object.keys($scope.questionsOnPage).length && areAllQuestionsHidden()) {
            $scope.$root.$broadcast(EventEnums.ENUMS.CTA_BUTTON_TRIGGER, {
                direction: StateManagement.journeyGetDirection()
            });
        }

    }, true);
}
