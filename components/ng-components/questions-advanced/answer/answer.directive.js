angular.module('uitoolkit')
    .directive('answer', function () {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/questions-advanced/answer/answer.html',
            controller: 'QuestionAdvancedController',
            controllerAs: 'QuestionAdvancedController',
            link: function (scope, element, attr) {
                scope.answer = {
                    cta: attr.acCta,
                    dataPoints: attr.acDataPoints,
                    dataPointsRules: attr.acDataPointsRules,
                    defaultSelected: attr.acDefaultSelected,
                    icon: attr.acIcon ? attr.acIcon : '',
                    id: attr.acId,
                    image: attr.acImage ? attr.acImage : '',
                    imageSelected: attr.acImageSelected,
                    imageSize: attr.acImageSize,
                    role: attr.acRole,
                    text: attr.acText
                };

                scope.answers[scope.answer.id] = scope.answer;
            }
        };
    });
