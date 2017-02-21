//<specs-slider
//        ss-panel-title="Here is what we think you need" // label
//        ss-panel-width="66%"                            // css_width_value
//        ss-close-icon="cwsicon cwsicon-close"           // css_class_names
//        ss-reset-icon="cwsicon cwsicon-close"           // css_class_names
//        ss-cta-label="Select"                           // label
//        ss-cta-path="build/desktop/recommendations"     // path
//        ss-toggle-icon="cwsicon cwsicon-close"  // css_class_names
//        ss-overlay-path="/overlays/path.html"   // path
//    >
//</specs-slider>

angular.module('uitoolkit')
    .directive('specsSlider', specsSlider);

/**
 *
 * @param $rootScope
 * @param $state
 * @param $timeout
 * @param EventBroadcastService
 * @param EventEnums
 * @param config
 * @returns {{replace: boolean, scope: boolean, templateUrl: string, link: link}}
 */
function specsSlider($rootScope, $state, $timeout, EventBroadcastService, EventEnums, config) {
    return {
        replace: true,
        scope: true,
        templateUrl: '/components/ng-components/specs-slider/specs-slider/specs-slider.html',
        link: function (scope, element, attr) {
            scope.title = attr.ssPanelTitle;
            scope.panelWidth = attr.ssPanelWidth;
            scope.closeIconClass = attr.ssCloseIcon;
            scope.resetIconClass = attr.ssResetIcon;
            scope.overlayPath = attr.ssOverlayPath;
            scope.ctaLabel = attr.ssCtaLabel;
            scope.ctaPath = attr.ssCtaPath;
            scope.toggleIcon = attr.ssToggleIcon;
            scope.visible = false;
            scope.data = {};


            //
            // Click helpers
            //
            scope.open = function () {
                scope.$root.$broadcast(EventEnums.ENUMS.SPECS_SLIDER_OPENED);

                scope.visible = config.wcm_mode !== 'EDIT' && config.wcm_mode !== 'DESIGN';
            };

            scope.close = function () {
                scope.visible = false;

                if (scope.data.brackets) {
                    scope.$root.$broadcast(
                        EventEnums.ENUMS.SPECS_SLIDER_RECOMMENDATION_COUNT,
                        scope.data.brackets[0].length
                    );
                }

                scope.$root.$broadcast(EventEnums.ENUMS.SPECS_SLIDER_CTA, scope.data);

                scope.$root.$broadcast(EventEnums.ENUMS.SPECS_SLIDER_CLOSED);

            };

            scope.reset = function () {

                EventBroadcastService.publish(EventEnums.ENUMS.SPECS_SLIDER_RESET);

            };

            scope.goTo = function (link) {
                link = link.replaceHTMLSuffix();

                if (link !== $state.current.name) {
                    $state.go(link);
                } else {
                    scope.close();
                }
            };


            //
            // Listeners
            //
            EventBroadcastService.subscribe(EventEnums.ENUMS.RECOMMENDATIONS_RESULTS_UPDATE, function (data){
                scope.data = data;

                if (!scope.visible) {
                    $rootScope.$broadcast(EventEnums.ENUMS.SPECS_SLIDER_CTA, data);
                }
            });


            //
            // Init
            //
            $timeout(scope.open, 0);

        }
    };
}
