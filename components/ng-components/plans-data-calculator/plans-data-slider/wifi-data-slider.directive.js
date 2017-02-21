angular.module('uitoolkit')
    .directive('wifiDataSlider', wifiDataSliderDirective);

/**
 * @param {$filter} $filter
 * @param {$timeout} $timeout
 * @param {$window} $window
 * @param {StateManagement} StateManagement
 */
function wifiDataSliderDirective($filter, $timeout, $window, StateManagement) {

        return {
            replace: true,
            scope: true,
            priority: 1,
            require: '^ngController',
            templateUrl: '/components/ng-components/plans-data-calculator/plans-data-slider/plans-data-slider.html',
            link: function (scope, element, attr) {
                var maxValueNum;
                var minValueNum;
                var sliderStoredData;
                var startValue;
                var updatePromise;

                scope.divider = attr.wdsMaxPercentDivider;
                scope.sliderId = attr.pdsSliderId;
                scope.mainTitle = attr.pdsSliderTitle;
                scope.secondTitle = attr.pdsSliderTitleTwo;
                scope.units = attr.pdsSliderUnits;
                scope.increment = parseFloat(attr.pdsStep);
                if (scope.increment < 0) {
                    scope.increment = 1;
                }
                scope.minValue = attr.pdsSliderMinValue;
                scope.maxValue = attr.pdsSliderMaxValue;
                scope.showBubble = attr.pdsShowBubble;
                scope.dataConversion = attr.pdsSliderDataConversion;

                minValueNum = parseFloat(scope.minValue);
                maxValueNum = parseFloat(scope.maxValue);

                sliderStoredData = StateManagement.getDataUsage();

                if (sliderStoredData[scope.sliderId]) {
                    scope.startValue = parseFloat(sliderStoredData[scope.sliderId]);
                }

                if (!scope.startValue) {
                    scope.startValue = attr.pdsSliderStartValue;
                    if (parseFloat(scope.startValue) < minValueNum
                        || scope.startValue === null
                        || scope.startValue === 'undefined'
                        || scope.startValue === ''
                    ) {
                        scope.startValue = parseFloat(minValueNum / 2);
                    }

                    if (parseFloat(scope.startValue) > maxValueNum) {
                        scope.startValue = maxValueNum;
                    }
                }

                // These should live in the parent directive
                scope.graphMinUnit = 'MB';
                scope.graphMaxUnit = 'GB';
                scope.totalUsageInMB = 0;//scope.startValue;
                scope.totalUsageInGB = 0;//Math.round(scope.startValue/1024);
                scope.futureProofInGB = 0;
                scope.futureProofInMB = 0;
                startValue = parseFloat(scope.startValue);


                scope.slider = {
                    min: startValue,
                    value: startValue,
                    options: {
                        floor: minValueNum,
                        ceil: maxValueNum,
                        id: scope.sliderId,
                        onlyBindHandles: true,
                        showSelectionBar: true,
                        step: scope.increment,
                        getSelectionBarColor: function (value) {
                            value = null;
                            return 'orange';
                        },
                        getPointerColor: function (value) {
                            value = null;
                            return '#38C6F4';
                        },
                        translate: function (value) {
                            return value + ' ' + scope.units;
                        },
                        onEnd: function () {
                        },
                        onChange: function () {
                            if (updatePromise) {
                                $timeout.cancel(updatePromise);
                            }

                            updatePromise = $timeout(function () {
                                updateSlider();
                            }, 250);
                        },
                        onStart: function () {
                        }
                    }
                };

                function updateSlider() {
                    var dataConvNum = parseFloat(scope.dataConversion);
                    var calculated = scope.slider.min * dataConvNum;

                    scope.slider.value = calculated;
                    scope.$emit($window.ENUMS.EVENTS.EMIT.WIFI_SLIDER_UPDATE, {
                        sliderId: scope.sliderId,
                        divider: parseFloat(scope.divider),
                        sliderMin: scope.slider.min,
                        sliderVal: scope.slider.value,
                        dataConvNum: dataConvNum,
                        calculated: calculated
                    });
                    sliderStoredData[scope.sliderId] = scope.slider.min;
                    StateManagement.setDataUsage(scope.sliderId, scope.slider.min);
                }

                $timeout(updateSlider, 500);

                scope.$watch('pc.individuals', function (newVal) {
                    if (newVal) {
                        scope.slider.min = getSliderValue(newVal);
                        updateSlider();
                    }
                }, true);

                scope.$on('initialiseSlider', function (event, args) {
                    if (args) {
                        scope.slider.min = getSliderValue(args);
                        updateSlider();
                    }
                });

                function getSliderValue(newVal) {
                    var selectedCustomers = $filter('filter')(newVal, {selected: true}) || [];

                    if (scope.pc.multilineAllSame && selectedCustomers.length > 0) {
                        return selectedCustomers[0].selections.hBdataMBSliders[scope.sliderId];
                    }

                    return 0;
                }

            }
        };
}

