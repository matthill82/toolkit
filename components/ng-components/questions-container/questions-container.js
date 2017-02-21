angular
    .module('uitoolkit')
    .component('questionsContainer', {
        bindings: {
            allowTransition: '@qcAllowTransition',
            childReadOnly: '@qcChildReadOnly',
            closeModalIcon: '@qcCloseModalIcon',
            cta: '@qcCta',
            hintEnabled: '@qcHintEnabled',
            hintIcon: '@qcHintIcon',
            hintToastIcon: '@qcHintToastIcon',
            hintToastText: '@qcHintToastText',
            items: '@qcItems',
            modalType: '@qcModalType',
            questionId: '@qcQuestionId',
            rememberState: '@qcChildRememberState',
            smallSize: '@qcSmall',
            theme: '@qcTheme',
            title: '@qcTitle',
            toastText: '@qcToastText',
            transitionCount: '@qcTransitionCount'
        },
        controller: 'QuestionsContainerComponentController',
        templateUrl: '/components/ng-components/questions-container/questions-container.html'
    });
