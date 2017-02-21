/**
 * @example
 *  <specs-slider-price-range
 *      ss-estimated-price-range-msg="Your estimated price range"                             // label
 *      ss-estimated-extras-msg="<p>Estimated <span class='text-danger'>£100-£200</span></p>" // markup
 *      ss-estimated-price-range-to-label="to"                                                // label
 *  ></specs-slider-price-range>
 */
angular.module('uitoolkit')
    .directive('specsSliderPriceRange', function ($state, $sce, EventBroadcastService, EventEnums) {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/specs-slider/specs-slider-price-range/specs-slider-price-range.html',
            link: function (scope, element, attr) {
                var estimatedExtrasMsg = attr.ssEstimatedExtrasMsg;

                scope.estimatedPriceRangeMsg = attr.ssEstimatedPriceRangeMsg;
                scope.estimatedPriceRangeToLabel = attr.ssEstimatedPriceRangeToLabel;
                scope.richtext = $sce.trustAsHtml(estimatedExtrasMsg);

                scope.range = {
                    min: 0,
                    max: 0
                };

                EventBroadcastService.subscribe(EventEnums.ENUMS.RECOMMENDATIONS_RESULTS_UPDATE, function (data) {
                    scope.range.min = data.range.min_price;
                    scope.range.max = data.range.max_price;
                });
            }
        };
    });
