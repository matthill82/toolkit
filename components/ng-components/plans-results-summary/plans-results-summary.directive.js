//<div class="row" ng-controller="PlansResultsController as prc">
//    <plans-results-summary
//            prs-show-carriers="false"                 // [true,false] default: true
//            prs-separator=", "                        // [label] default: ', '
//            prs-carriers-label="Network"              // [label]
//            prs-carriers-label-pl="NETWORKS"          // [label] optional, adds 's' by default
//            prs-carriers-count="{{s.carriersCount}}"  // [number]
//            prs-plans-label="Plan"                    // [label]
//            prs-plans-label-pl="PLANS"                // [label] optional, adds 's' by default
//            prs-plans-count="{{s.plansCount}}"        // [number]
//        >
//    </plans-results-summary>
//</div>

angular.module('uitoolkit')
    .directive('plansResultsSummary', function() {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/plans-results-summary/plans-results-summary.html',
            link: function (scope, element, attr) {

                scope.showCarriers    = attr.prsShowCarriers === 'false' ? false : true;
                scope.plansLabel      = attr.prsPlansLabel;
                scope.plansLabelPl    = attr.prsPlansLabelPl;
                scope.separator       = attr.prsSeparator || ', ';
                scope.carriersLabel   = attr.prsCarriersLabel;
                scope.carriersLabelPl = attr.prsCarriersLabelPl;

                scope.facets.serviceProvider = scope.facets.serviceProvider || [];
                scope.facets['device.id']    = scope.facets['device.id'] || [];
            }
        };
    });
