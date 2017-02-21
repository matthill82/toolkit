//<facets-group
//        fg-title="Brand"                          // [label]
//        fg-criteria="device.manufacturer"         // [data_point]
//        fg-select-any-enabled="true"              // ["true"|"false"] default: false
//        fg-select-any-icon="cwsicon cwsicon-any"  // [css_class_names]
//        fg-select-any-label="Any"                 // [label]
//        fg-select-mode="single"                   // ["single"|"multi"] default: "multi" for "buttons", "single" for "dropdown"
//        fg-show-icons="true"                      // ["true"|"false"] default: "false"
//        fg-show-more-icon="cwsicon cwsicon-plus"  // [css_class_names]
//        fg-show-more-label="More"                 // [label]
//        fg-show-less-icon="cwsicon cwsicon-minus" // [css_class_names]
//        fg-show-less-label="Less"                 // [label]
//        fg-show-hide-limit="2"                    // [number] default: 99999
//        fg-display-mode="dropdown"                // ["dropdown"|"buttons"] default: "buttons"
//        fg-dd-label="Select an option"            // [label]
//        fg-dd-icon="cwsicon cwsicon-arrow-down"   // [css_class_names]
//    >
//</facets-group>


angular.module('uitoolkit')
    .directive('facetsGroup', function() {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/facets/facets-group/facets-group.html',
            link: function (scope, element, attr) {

                scope.facetGroupTitle = attr.fgTitle;
                scope.facetGroupCriteria = attr.fgCriteria;

                scope.showIcons = attr.fgShowIcons === 'true';

                scope.selectAnyEnabled = attr.fgSelectAnyEnabled === 'true';
                scope.selectAnyIcon = attr.fgSelectAnyIcon;
                scope.selectAnyLabel = attr.fgSelectAnyLabel;

                scope.displayMode = attr.fgDisplayMode || 'buttons';

                if (scope.displayMode === 'dropdown') {
                    scope.selectMode = attr.fgSelectMode || 'single';
                } else {
                    scope.selectMode = attr.fgSelectMode || 'multi';
                }

                scope.dropdownLabel = attr.fgDdLabel;
                scope.dropdownIcon = attr.fgDdIcon;

                scope.optionsVisible = scope.displayMode === 'buttons';

                scope.showMoreIcon = attr.fgShowMoreIcon;
                scope.showMoreLabel = attr.fgShowMoreLabel;
                scope.showLessIcon = attr.fgShowLessIcon;
                scope.showLessLabel = attr.fgShowLessLabel;

                scope.showHideLimit = attr.fgShowHideLimit ? parseInt(attr.fgShowHideLimit) : 99999;

                // Show hide button initial state
                scope.showHideTempLimit = scope.showHideLimit;
                scope.showHideIcon = scope.showMoreIcon;
                scope.showHideLabel = scope.showMoreLabel;
                scope.showHideAction = 'show';

                // Create a group in the facets collection
                scope.facets[scope.facetGroupCriteria] = [];

                // Add 'Any' button to the collection
                if (scope.selectAnyEnabled) {
                    scope.facets[scope.facetGroupCriteria].push({
                            'key': scope.selectAnyLabel,
                            'active': true,
                            'role': 'any'
                        });
                    scope.selectedOption = scope.facets[scope.facetGroupCriteria][0];
                }


                //
                // Click handlers
                //
                scope.toggleActive = function (targetIndex) {
                    var fg = scope.facets[scope.facetGroupCriteria];
                    var item = fg[targetIndex];

                    var deselectAll = function () {
                        for (var i=0; i<fg.length; i++) {
                            fg[i].active = false;
                        }
                    }

                    var countActive = function () {
                        var count = 0;
                        for (var i=0; i<fg.length; i++) {
                            if (fg[i].active) {
                                count++;
                            }
                        }
                        return count;
                    }


                    if (scope.selectMode === 'single'){
                        var newState = !item.active;
                        deselectAll();
                        item.active = newState;
                    } else {
                        // multi select mode
                        if (targetIndex === 0 && scope.selectAnyEnabled) {
                            // 'Any' selected
                            deselectAll();
                            fg[0].active = true;
                        } else if (targetIndex !== 0 && scope.selectAnyEnabled) {
                            item.active = !item.active;
                            fg[0].active = false;
                        } else {
                            item.active = !item.active;
                        }
                    }

                    // Select 'Any' if it's enabled and everything else gets deselected
                    if (countActive() === 0 && scope.selectAnyEnabled) {
                        fg[0].active = true;
                    }

                    // Hide dropdown
                    if (scope.displayMode === 'dropdown') {
                        scope.toggleDropdown();
                    }
                }

                scope.showHide = function () {
                    if (scope.showHideAction === 'show') {
                        scope.showHideAction = 'hide';
                        scope.showHideTempLimit = scope.facets[scope.facetGroupCriteria].length;
                        scope.showHideIcon = scope.showLessIcon;
                        scope.showHideLabel = scope.showLessLabel;
                    } else {
                        scope.showHideAction = 'show';
                        scope.showHideTempLimit = scope.showHideLimit;
                        scope.showHideIcon = scope.showMoreIcon;
                        scope.showHideLabel = scope.showMoreLabel;
                    }
                }

                scope.toggleDropdown = function () {
                    scope.optionsVisible = !scope.optionsVisible;
                }


                //
                // Watchers
                //
                scope.$watch('facets', function(){
                    if (scope.displayMode === 'dropdown') {
                        scope.selectedOption = scope.dropdownLabel;

                        var fg = scope.facets[scope.facetGroupCriteria];

                        for (var i=0; i<fg.length; i++) {
                            if (fg[i].active) {
                                scope.selectedOption = fg[i];
                                break;
                            } else {
                                scope.selectedOption = null;
                            }
                        }
                    }
                }, true);


                //
                // Helpers
                //
                scope.stringToClass = function (str) {
                    var className;
                    className = angular.lowercase(str)
                    className = className.replace(/\s+/g, '_');

                    return className;
                }
            }
        };
    });
