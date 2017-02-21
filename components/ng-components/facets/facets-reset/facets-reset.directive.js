//<facets-reset
//        fr-label='Reset'                // [label]
//        fr-icon='cwsicon cwsicon-reset' // [css_class_names]
//    >
//</facets-reset>


angular.module('uitoolkit')
    .directive('facetsReset', function() {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/facets/facets-reset/facets-reset.html',
            link: function (scope, element, attr) {

                scope.label = attr.frLabel;
                scope.icon  = attr.frIcon;

                scope.resetFilters = function() {
                        // Reset facets
                        for (var facetGroupName in scope.facets) {
                            var facetGroup = scope.facets[facetGroupName];

                            for (var i=0; i<facetGroup.length; i++) {
                                facetGroup[i].active = false;
                            }

                            if (facetGroup.length && facetGroup[0].role === 'any') {
                                facetGroup[0].active = true;
                            }

                            if (facetGroup.length && facetGroup[0].logic) {
                                facetGroup[0].key = 'any';
                                facetGroup[0].role = 'any';
                            }
                        }
                        // Reset pagination
                        scope.pagination.currentPage = 1;
                    };
            }
        };
    });
