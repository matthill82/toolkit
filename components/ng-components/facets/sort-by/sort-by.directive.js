//<props-sort-by
//        psb-title="Sort by:"    // [label]
//        psb-options="[ { \\x22label\\x22: \\x22Network A-Z\\x22, \\x22criteria\\x22: \\x22serviceProvider\\x22, \\x22order\\x22: \\x22asc\\x22, \\x22default\\x22: \\x22no\\x22 },...]"    // [array_of_encoded_json_objects: {label:[label],criteria:[data_point],order:["asc"|"desc"],default:["yes"|"no"]}]
//    >
//</props-sort-by>


angular.module('uitoolkit')
    .directive('propsSortBy', function() {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/facets/sort-by/sort-by.html',
            link: function (scope, element, attr) {

                scope.title = attr.psbTitle;

                scope.sortByOptions = angular.fromJson(attr.psbOptions.replace(/[\\]+x22/g, '"'));

                scope.sortByOptionIndex = '0';

                for (var i = 0; i<scope.sortByOptions.length; i++) {
                    if (scope.sortByOptions[i].default === 'yes') {
                        scope.sortByOptionIndex = i.toString();
                        break;
                    }
                }

                scope.sortByOptionUpdate = function() {
                    scope.$parent.sort = scope.sortByOptions[scope.sortByOptionIndex];
                };

                scope.sortByOptionUpdate();
            }
        };
    });
