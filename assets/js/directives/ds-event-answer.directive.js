/**
 * Sends selected answer to DS.
 *
 * Add to the wrapper element.
 *
 * @example
 *  <ANY
 *      ng-controller="QuestionAdvancedController"
 *      ds-event-answer="question_1_answer_value"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('dsEventAnswer', dsEventAnswerDirective);

/**
 * @param {DsEventService} DsEventService
 */
function dsEventAnswerDirective(DsEventService) {
    return {
        link: dsEventAnswerLink,
        restrict: 'A'
    };

    function dsEventAnswerLink(scope, iElement, iAttrs) {
        var initial = true;

        scope.$watch(function () {
            return scope.q.selectedAnswers.join('');
        }, function () {
            var answers = [];

            scope.q.selectedAnswers.forEach(function (answerKey) {
                answers.push(scope.q.answers[answerKey].image + scope.q.answers[answerKey].text);
            });

            if (initial) {
                initial = false;
            } else {
                DsEventService.sendEvent(iAttrs.dsEventAnswer, answers.sort().join('|'));
            }
        });
    }
}
