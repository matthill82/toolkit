//<device-spec
//        dss-category="Call"                                                // category name used as a title and to query the object
//        dss-category-items="Voice recognition||Works in USA||Speakerphone" // ||-separated list of features in the group to show
//        dss-icon-position="left"                                           // [left|right] default: left
//        dss-icon-class="cwsicon cwsicon-call"                              // icon class name
//    >
//</device-spec>

angular.module('uitoolkit')
    .directive('deviceSpec',function() {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/device-details/device-spec/device-spec.html',
            link: function(scope, element, attr){
                scope.specCategory = attr.dssCategory;
                scope.iconPosition = attr.dssIconPosition || 'left';
                scope.iconClass = attr.dssIconClass;

                var specCategoryItems = attr.dssCategoryItems;

                if (typeof specCategoryItems !== 'undefined') {
                    if (specCategoryItems.indexOf('||') > -1) {
                        scope.specCategoryItemsArray = specCategoryItems.split('||');
                    } else {
                        scope.specCategoryItemsArray = specCategoryItems;
                    }
                }
            }
        };
});
