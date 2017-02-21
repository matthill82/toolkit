angular.module('uitoolkit')
    .directive('plan', planDirective);

function planDirective() {
    return {
        replace: true,
        scope: true,
        templateUrl: '/components/ng-components/plan/plan.html',
        controller: 'PlanController as pc'
    };
}
