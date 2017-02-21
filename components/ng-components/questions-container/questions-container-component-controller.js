angular.module('uitoolkit')
    .controller('QuestionsContainerComponentController', QuestionsContainerComponentController);

/**
 *
 * @param $filter
 * @param {$rootScope.Scope} $rootScope
 * @param $scope
 * @param $state
 * @param $window
 * @param {QuestionsContainerService} QuestionsContainerService
 * @param {StateManagement} StateManagement
 * @param {ToastService} ToastService
 * @constructor
 */
function QuestionsContainerComponentController(
    $filter,
    $rootScope,
    $scope,
    $state,
    $window,
    QuestionsContainerService,
    StateManagement,
    ToastService
) {
    var $ctrl = this;
    var activeAnswers;
    var BASKET_SEPARATOR = '|--|';
    var hintAnswer;
    var hintText;
    var modalBackgroundClass = 'bootstrap-dialog';
    var SEPARATOR = ':::';

    // $rootScope.hintMode = true;

    $ctrl.updateQuestionContainer = updateQuestionContainer;
    $ctrl.isAnswerActive = isAnswerActive;
    $ctrl.isMaximumSelected = isMaximumSelected;
    $ctrl.isHintAnswer = isHintAnswer;
    $ctrl.changeHintMode = changeHintMode;
    $ctrl.closeModal = closeModal;
    $ctrl.setItems = setItems;
    $ctrl.getActiveAnswers = getActiveAnswers;


    $ctrl.$onInit = function () {
        $ctrl.questionId = 0;
        $ctrl.modalOpen = false;

        $ctrl.allowTransition = $ctrl.allowTransition === 'true';
        $ctrl.readOnly = $ctrl.childReadOnly === 'true';

        activeAnswers = {};
        $ctrl.selectedAnswers = 0;
        $ctrl.transitionCount = angular.isDefined($ctrl.transitionCount) ? parseInt($ctrl.transitionCount) : 6;
        $ctrl.cta = $ctrl.cta || 'home';
        $ctrl.modalType = $ctrl.modalType || 'info';
        hintText = $ctrl.hintToastText;

        $ctrl.setItems($ctrl.items);

        $ctrl.getActiveAnswers();
    };


    $scope.$on($window.ENUMS.EVENTS.RECEIVE.CLEAR_SESSION_DATA_CONTAINER, function () {
        activeAnswers = {};
        $ctrl.selectedAnswers = 0;
    });


    function closeModal(e) {
        var elementClass = e.target.className;

        if (elementClass.indexOf(modalBackgroundClass) !== -1) {
            $ctrl.modalOpen = false;
        }
    }

    function changeHintMode() {
        $rootScope.hintMode = !$rootScope.hintMode;

        if ($rootScope.hintMode) {
            ToastService.show($ctrl.modalType, hintText, '', {timeOut: 2000});
        }
    }

    function isMaximumSelected() {
        return $ctrl.selectedAnswers >= $ctrl.transitionCount;
    }

    function isAnswerActive(qItem) {
        var qTitle = qItem.title;
        var titleClean = $filter('htmlEntities')(qTitle);
        var titleNoSpaces = titleClean.replace(/\s/g, '');

        return activeAnswers[titleNoSpaces];
    }

    function isHintAnswer(title) {
        return title === hintAnswer && $ctrl.modalOpen;
    }

    function getActiveAnswers() {
        var answersData = StateManagement.getData('questions');
        var cleanQuestionName;
        var i;
        var questionName;

        if (answersData) {
            answersData = answersData.split(BASKET_SEPARATOR);

            for (i = 0; i < answersData.length; i++) {
                questionName = answersData[i].substr(0, answersData[i].indexOf(SEPARATOR));
                cleanQuestionName = $filter('htmlEntities')(questionName);
                activeAnswers[cleanQuestionName] = true;
                $ctrl.selectedAnswers++;
            }
        }
    }

    function setItems(questionItemsJson) {
        var answerCount = 1;
        var decodedString;
        var modJson = '"' + questionItemsJson.replace(/([^\\]|^)\\x/g, '$1\\u00') + '"';

        decodedString = angular.fromJson(modJson);
        decodedString = angular.fromJson(decodedString);
        $ctrl.itemJson = decodedString[0];

        angular.forEach($ctrl.itemJson, function (item) {
            item.id = 'q00' + $ctrl.questionId + 'a00' + answerCount;
            answerCount++;
        });
    }

    function updateQuestionContainer(qItem) {
        var qTitle;
        var titleClean;
        var titleNoSpaces;
        var qFeatures;


        if ($rootScope.hintMode) {
            openModal(qItem.hint);
            hintAnswer = qItem.title;
            return;
        }

        qTitle = qItem.title;
        titleClean =  $filter('htmlEntities')(qTitle);
        titleNoSpaces = titleClean.replace(/\s/g, '');

        if (activeAnswers[titleNoSpaces]) {
            $ctrl.selectedAnswers--;
        } else {
            $ctrl.selectedAnswers++;
        }
        activeAnswers[titleNoSpaces] = !activeAnswers[titleNoSpaces];

        qFeatures = qItem.features;
        QuestionsContainerService.updateLocalStorage(titleNoSpaces, qFeatures);

        if ($ctrl.allowTransition) {
            redirectToLink();
        }
    }

    function openModal(hintContent) {
        hintContent = hintContent || '';
        $ctrl.hintContent = $filter('htmlEntities')(hintContent);
        $ctrl.hintContent = $filter('relativeUrl')($ctrl.hintContent);

        $ctrl.modalOpen = true;
    }

    function redirectToLink() {
        if ($ctrl.cta && isMaximumSelected()) {
            $state.go($ctrl.cta.replaceHTMLSuffix());
        }
    }
}
