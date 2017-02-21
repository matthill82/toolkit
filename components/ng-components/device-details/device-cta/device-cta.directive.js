angular
    .module('uitoolkit')
    .directive('deviceCta', deviceCtaDirective);

function deviceCtaDirective() {
    return {
        replace: true,
        scope: true,
        templateUrl: '/components/ng-components/device-details/device-cta/device-cta.html',
        link: function (scope, element, attr) {
            scope.ctaPath = attr.dctaPath;
            scope.ctaLabel = attr.dctaLabel;
        }
    };
}
