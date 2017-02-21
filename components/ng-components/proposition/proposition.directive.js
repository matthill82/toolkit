angular.module('uitoolkit')
    .directive('proposition', function() {

        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/proposition/proposition.html',
            controller: 'PropositionController as propc'
        }

});
