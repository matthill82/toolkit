/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .directive('plansDataSlider', function ($compile, StateManagement, $timeout, $filter) {

        return {
            replace: true,
            scope: true,
            require: '^ngController',
            templateUrl: '/components/ng-components/plans-data-calculator/plans-data-slider/plans-data-slider.html',
            link: function (scope, element, attr) {
                var updatePromise;

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

                var minValueNum = parseFloat(scope.minValue);
                var maxValueNum = parseFloat(scope.maxValue);

                var sliderStoredData = StateManagement.getDataUsage();

                if (sliderStoredData[scope.sliderId]) {
                    scope.startValue = parseFloat(sliderStoredData[scope.sliderId]);
                }

                if (!scope.startValue) {
                    scope.startValue = attr.pdsSliderStartValue;
                    if (parseFloat(scope.startValue) < minValueNum || scope.startValue === null || scope.startValue === 'undefined' || scope.startValue === '') {
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
                var startValue = parseFloat(scope.startValue);


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
                        translate: function (value) {
                            if (scope.units === '%') {
                                return value + ' ' + scope.units + ' true';
                            } else {
                                return value;
                            }
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
                    scope.$emit('sliderUpdate', {
                        sliderId: scope.sliderId,
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
                    else {
                        return 0;
                    }
                }

            }
        };

    })
;
