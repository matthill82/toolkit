angular
    .module('uitoolkit')
    .controller('QuestionAdvancedController', QuestionAdvancedController);

/**
 * @param $filter
 * @param {$rootScope.Scope} $scope
 * @param $state
 * @param $timeout
 * @param {StateManagement} StateManagement
 * @constructor
 */
function QuestionAdvancedController($filter, $scope, $state, $timeout, StateManagement) {

    var currentStateName = $state.current.name;

    $scope.answers = $scope.answers || [];

    $scope.init = function () {
        var init = {};

        init.questionId = arguments[0];
        init.questionType = arguments[1];
        init.isRequired = arguments[2];
        init.preconditions = arguments[3] === '' ? [] : arguments[3].split(/\s*,\s*/);
        init.preconditionsRule = arguments[4];
        init.preconditionsLimit = arguments[5];

        $scope.questionsOnPage[init.questionId] = {
            id: init.questionId,
            required: init.isRequired === 'true',
            multi: init.questionType === 'true',
            preconditions: init.preconditions,
            preconditionsRule: init.preconditionsRule,
            preconditionsLimit: init.preconditionsLimit,
            selectedAnswers: [],
            answers: $scope.answers
        };

        $scope.q = $scope.questionsOnPage[init.questionId];


        $scope.updateSelectedAnswers();

        $scope.isQuestionVisible();

        $scope.isQuestionAnswered();

        $timeout($scope.updateDefaultSelectedAnswers);
    };

    $scope.openModal = function openModal(hintContent, closeIcon, modalTitle) {
        hintContent = hintContent || '';
        $scope.modalContentUrl = $filter('htmlEntities')(hintContent);
        $scope.modalContentUrl = $filter('relativeUrl')($scope.modalContentUrl );

        $scope.modalCloseIcon = closeIcon;

        $scope.modalTitle = modalTitle;
        $scope.modalOpen = true;
    };

    $scope.isQuestionVisible = function () {
        var isQuestionVisible;

        if ($scope.q.preconditions.length) {
            // Preconditions to check
            isQuestionVisible = false;
            var selectedAnswersIds = getAllAnswers();

            for (var i=0; i<$scope.q.preconditions.length; i++) {
                if (selectedAnswersIds.indexOf($scope.q.preconditions[i]) !== -1 ) {
                    isQuestionVisible = true;
                }
            }
        } else {
            // No preconditions
            isQuestionVisible = true;
        }

        // Remove selections for questions that become hidden
        if (!isQuestionVisible) {
            StateManagement.questionsRemove(currentStateName, $scope.q.id);
            $scope.updateSelectedAnswers();
        }

        $scope.q.visible = isQuestionVisible;
        return isQuestionVisible;
    };

    $scope.isQuestionAnswered = function () {
        var isAnswered = true;

        if ($scope.q.required && $scope.q.visible) {
            if ($scope.q.preconditionsRule === '>=') {
                isAnswered = Object.keys($scope.q.selectedAnswers).length >= $scope.q.preconditionsLimit;
            } else if ($scope.q.preconditionsRule === '=') {
                isAnswered = Object.keys($scope.q.selectedAnswers).length === $scope.q.preconditionsLimit;
            } else {
                isAnswered = !!Object.keys($scope.q.selectedAnswers).length;
            }
        }

        $scope.q.answered = isAnswered;

        return isAnswered;
    };

    $scope.toggleAnswer = function (aObj) {
        var selectedAnswers =  $scope.q.selectedAnswers;
        var i = selectedAnswers.indexOf(aObj.id);
        var answersIds = Object.keys($scope.q.answers);

        if (i === -1) {
            if (!$scope.q.multi || aObj.role === 'ANY') {
                // Single select - remove all the rest
                // or ANY answer
                StateManagement.questionsRemove(currentStateName, $scope.q.id);
            }

            //If it already exists and you are switching question branches
            if (aObj.cta) {
                StateManagement.questionsRemoveAfter(currentStateName, $scope.q.id);
            }

            //Remove ANY answers
            answersIds.forEach(function (answerId) {
                var answerRole = $scope.q.answers[answerId].role;

                if (answerRole === 'ANY') {
                    StateManagement.questionsRemove(currentStateName, $scope.q.id, answerId);
                }
            });

            //Add it
            StateManagement.questionsAdd(currentStateName, $scope.q.id, aObj);
        } else {
            //Remove it
            selectedAnswers.splice(i, 1);
            StateManagement.questionsRemove(currentStateName, $scope.q.id, aObj.id);
        }

        $scope.isQuestionAnswered();

        $scope.updateSelectedAnswers();

    };

    $scope.updateSelectedAnswers = function () {
        var selectedAnswersIds;
        var questions = StateManagement.questionsGet();
        var currentQuestionIndex = StateManagement.questionsFindIndex(questions, currentStateName);

        if (currentQuestionIndex !== null && questions[currentQuestionIndex][currentStateName][$scope.q.id]) {
            selectedAnswersIds = Object.keys(questions[currentQuestionIndex][currentStateName][$scope.q.id]);
            $scope.q.selectedAnswers = selectedAnswersIds;
        } else {
            $scope.q.selectedAnswers = [];
        }
    };

    $scope.updateDefaultSelectedAnswers = function () {
        var answersIds;

        // If no answers selected -> check for answers selected by default
        if (!$scope.q.selectedAnswers.length) {
            answersIds = Object.keys($scope.q.answers);

            answersIds.forEach(function (answerId) {
                var defaultSelected = $scope.q.answers[answerId].defaultSelected === 'true';

                if (defaultSelected) {
                    $scope.toggleAnswer($scope.q.answers[answerId]);
                }
            });
        }
    };

    $scope.isAnswerSelected = function (aId) {

        return  $scope.q.selectedAnswers.indexOf(aId) !== -1;

    };


    function getAllAnswers() {
        var qId;
        var page;
        var i;
        var answers = [];
        var url;

        var questions = StateManagement.questionsGet();

        for (i=0; i<questions.length; i++) {
            page = questions[i];

            for (url in page) {
                for (qId in page[url]) {
                    answers = answers.concat(Object.keys(page[url][qId]));
                }
            }
        }

        return answers;
    }


    $scope.$watch('questionsOnPage', function () {

        $scope.isQuestionVisible();

        $scope.isQuestionAnswered();

    }, true);
}
