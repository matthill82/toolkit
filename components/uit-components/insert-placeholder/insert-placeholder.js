angular
    .module('uitoolkit')
    .component('uitInsertPlaceholder', {
        bindings: {
            sentence: '<uipSentence',
            replaceText: '<uipReplaceText',
            styleClass: '@uipStyleClass'
        },
        controller: UitInsertPlaceholderController,
        templateUrl: '/components/uit-components/insert-placeholder/insert-placeholder.html'
    });

function UitInsertPlaceholderController() {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;

    function $onInit() {

        if ($ctrl.sentence) {
            $ctrl.splitSentence = $ctrl.sentence.split(/{|}/);
        }

    }

}
