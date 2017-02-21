angular.module('uitoolkit')
    .directive('plansDataCalculatorGraph', function () {

        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/plans-data-calculator/data-calculator-graph/data-calculator-graph.html',
            link: function (scope, element, attr) {
                var minFutureHeight = 22;
                var item_elem_height = 20;

                scope.futureProofLabel = attr.dcgFutureProofLabel;
                scope.futureProofButtonLabel = attr.dcgFutureProofButtonLabel;
                scope.usageResultTitle = attr.dcgUsageResultTitle;
                scope.usageResultText = attr.dcgUsageResultText;
                scope.suggestedAmountLabel = attr.dcgSuggestedAmountLabel;
                scope.suggestedAmountButtonLabel = attr.dcgSuggestedAmountButtonLabel;
                scope.graphMinUnit = attr.dcgGraphMinUnit;
                scope.graphMaxUnit = attr.dcgGraphMaxUnit;
                scope.futureProofRatio = attr.dcgFutureProofRatio;
                scope.totalUsageInMB = 0;
                scope.slidersValues = 0;
                scope.chartCurrentHeight = 0;
                scope.chartFutureHeight = minFutureHeight;
                scope.linkPath = attr.dcgLinkPath;
                scope.actionMode = attr.dcgActionMode;
                scope.pc.actionMode = scope.actionMode; //Generification of isMultiline flag

                scope.initialize(attr.dcgShowFutureProofDetail, attr.dcgFutureProofContentUrl);


                var futureProofRatio = parseFloat(scope.futureProofRatio);
                var cap_max_value = parseFloat(attr.dcgCapMaxValue);
                var increments = parseFloat(attr.dcgIncrements);
                var dc_height_max = document.getElementsByClassName('data-calc-chart-shadow')[0].scrollHeight;
                var incrementing_gbs = [];
                var items = cap_max_value / increments;
                scope.gb_step_padding = parseInt(dc_height_max / items - item_elem_height);

                scope.divider = 1;

                scope.additonal_memory_multiplier = 0;
                scope.totalSliderValues = {};

                scope.slidersObj = {};

                function setWifiMobileAdjust(mass) {
                    //if mobile data: 0, additonal_memory_multiplier should be 1.
                    //if mobile data: 100, additonal_memory_multiplier should be mass.devider.
                    scope.divider = mass.divider;
                    var step = mass.divider / 100;
                    scope.additonal_memory_multiplier = step * mass.sliderVal;// this is  each step per 1% e.g 0.02

                }

                scope.$on(window.ENUMS.EVENTS.RECEIVE.SLIDER_UPDATED, function (event, mass) {
                    scope.totalSliderValues[mass.sliderId] = mass.sliderVal;
                    scope.slidersObj[mass.sliderId] = mass.sliderMin;
                    mass.sliderValues = scope.totalSliderValues;
                    mass.divider = scope.divider;
                    mass.additonal_memory_multiplier = scope.additonal_memory_multiplier;
                    scope.$emit(window.ENUMS.EVENTS.EMIT.SLIDERS_UPDATED, mass);
                });



                scope.$on(window.ENUMS.EVENTS.RECEIVE.WIFI_SLIDER_UPDATED, function (event, mass) {
                    scope.slidersObj[mass.sliderId] = mass.sliderMin;
                    mass.sliderValues = scope.totalSliderValues;
                    setWifiMobileAdjust(mass);
                    mass.additonal_memory_multiplier = scope.additonal_memory_multiplier;
                    scope.$emit(window.ENUMS.EVENTS.EMIT.WIFI_SLIDERS_UPDATED, mass);
                });


                for (var i = cap_max_value; i > 0; i -= increments) {
                    if (i !== 0) {
                        incrementing_gbs.push(i);
                    }
                }

                scope.incrementing_gbs = incrementing_gbs;


                var updateGraph = function () {
                    var dc_pixel = dc_height_max / cap_max_value;//6.66; // Pixel to GB conversion on Y axis, per GB
                    var dc_pixel_calc_current = scope.totalUsageInGB * dc_pixel; // current calc
                    var dc_pixel_calc_future = (scope.totalUsageInGB * dc_pixel) * futureProofRatio; // future proof calc
                    if (dc_pixel_calc_future > dc_height_max) { // don't get future go off the chart
                        dc_pixel_calc_future = dc_height_max;
                    }
                    if (dc_pixel_calc_future < minFutureHeight) {
                        dc_pixel_calc_future = minFutureHeight;
                    }
                    scope.chartCurrentHeight = dc_pixel_calc_current.toFixed();
                    scope.chartFutureHeight = dc_pixel_calc_future.toFixed();
                };

                function getTotalSliderValues(mass) {
                    var sliderValues = 0;
                    for (var value in mass.sliderValues) {
                        sliderValues += scope.totalSliderValues[value];
                    }
                    return sliderValues;
                }

                function updateScopeWithValues(sliderValues) {
                    scope.totalUsageInMB = sliderValues.toFixed();
                    scope.totalUsageInGB = Math.round(sliderValues / 1024);
                    scope.futureProofInMB = (sliderValues * futureProofRatio).toFixed();
                    scope.futureProofInGB = Math.round(sliderValues / 1024 * futureProofRatio);


                    if (scope.totalUsageInMB < 1024) {//
                        scope.graphCurUnit = scope.graphMinUnit;
                        scope.totalUsageInMB_orGB = scope.totalUsageInMB;

                    } else {
                        scope.graphCurUnit = scope.graphMaxUnit;
                        scope.totalUsageInMB_orGB = scope.totalUsageInGB;
                    }

                    if (scope.futureProofInMB < 1024) {//
                        scope.graphFutureUnit = scope.graphMinUnit;
                        scope.futureProofInMB_orGB = scope.futureProofInMB;
                    } else {
                        scope.graphFutureUnit = scope.graphMaxUnit;
                        scope.futureProofInMB_orGB = scope.futureProofInGB;
                    }
                    updateGraph();
                }

                function calculateData(event, mass) {
                    scope.sliderValues = mass.sliderValues;
                    var sliderValues = getTotalSliderValues(mass);
                    var additonal_memory = 0;
                    var additonal_memory_multiplier = mass.additonal_memory_multiplier * sliderValues + sliderValues;
                    additonal_memory = additonal_memory_multiplier;
                    sliderValues = sliderValues + additonal_memory;
                    updateScopeWithValues(sliderValues);
                }

                scope.$on(window.ENUMS.EVENTS.RECEIVE.SLIDERS_UPDATED, function (event, mass) {
                    calculateData(event, mass);
                });

                scope.$on(window.ENUMS.EVENTS.RECEIVE.WIFI_SLIDERS_FINISHED_UPDATED, function (event, mass) {
                    calculateData(event, mass);
                });

                scope.showFutureProofDetail = true;
                scope.futureProofOpen = false;

                scope.toggleFutureProof = function () {
                    if (scope.showFutureProofDetail) {
                        scope.futureProofOpen = !scope.futureProofOpen;
                    }
                };

                function checkSelected(individuals) {
                    var individualSelected = false;
                    angular.forEach(individuals, function(individual){
                        if(individual.hasOwnProperty('selected')) {
                            if(individual.selected) {
                                individualSelected = true;
                            }
                        }
                    });
                    return individualSelected;
                }

                scope.$watch('pc.individuals', function(newVal){
                    if(newVal) {
                        scope.disableButtons = checkSelected(newVal);
                    }
                }, true);

            }
        };

    });
