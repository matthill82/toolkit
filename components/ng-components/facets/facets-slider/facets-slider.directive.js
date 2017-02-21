//<facets-slider
//        fs-title="Upfront cost"                                                    // [label]
//        fs-criteria="upfrontPrice.net.value"                                 // [data_point]
//        fs-query-logic="gte"                                                       // ["lt"|"lte"|"gte"|"gt"]
//        fs-steps="[{\x22label\x22: \x22Any\x22, \x22value\x22: \x22any\x22},...}]" // [array_of_encoded_json_objects: {label:[label],value:[number]}]
//    >
//</facets-slider>


angular.module('uitoolkit')
    .directive('facetsSlider', function($timeout, StateManagement) {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/facets/facets-slider/facets-slider.html',
            link: function (scope, element, attr) {

                scope.timer = {};

                scope.facetTitle = attr.fsTitle;

                scope.slider                = {};
                scope.slider.criteria       = attr.fsCriteria;
                scope.slider.queryLogic     = attr.fsQueryLogic;
                scope.slider.steps          = angular.fromJson(attr.fsSteps.replace(/\\x22/g, '"'));

                scope.slider.stepsLabels = [];
                scope.slider.stepsValues = [];

                var i;

                for (i=0; i<scope.slider.steps.length; i++) {
                    scope.slider.stepsLabels.push(scope.slider.steps[i].label);
                    scope.slider.stepsValues.push(scope.slider.steps[i].value);
                }

                scope.sliderValue = 0;

                // Find the closest value if session data is recorded
                if (scope.slider.criteria === 'tariff.dataAllowance.number') {
                    var KEY_DATA = window.ENUMS.DEVICE_KEYS.DATA_MB;
                    var dataAllowance = parseInt(StateManagement.getData(KEY_DATA));

                    for (i=0; i<scope.slider.stepsValues.length; i++) {
                        if (parseInt(scope.slider.stepsValues[i]) <= dataAllowance) {
                            scope.sliderValue = i;
                        }
                    }
                }

                scope.facets[scope.slider.criteria] = [];

                // Init slider directive
                scope.sliderConfig = {
                        value: scope.sliderValue,
                        options: {
                            stepsArray: scope.slider.stepsLabels,
                            onlyBindHandles: true,
                            showSelectionBar: true,
                            onChange: function () {
                                $timeout.cancel(scope.timer);
                                scope.timer = $timeout(updateFacets, 250);
                            }
                        }
                    };


                //
                // Handlers
                //
                function updateFacets() {
                    scope.facets[scope.slider.criteria] = [{
                            key: scope.slider.stepsValues[scope.sliderValue],
                            role: scope.slider.stepsValues[scope.sliderValue],
                            logic: scope.slider.queryLogic,
                            active: true
                        }];
                }

                updateFacets();


                //
                // Watchers
                //
                var watchedObject = 'facets["' + scope.slider.criteria + '"]';

                scope.$watch(watchedObject, function () {
                    if (scope.facets[scope.slider.criteria].length) {
                        var newSliderValue = scope.slider.stepsValues.indexOf(scope.facets[scope.slider.criteria][0].key);

                        if (scope.sliderValue !== newSliderValue && newSliderValue !== -1) {
                            scope.sliderValue = newSliderValue;
                        }
                    }
                }, true);
            }
        };
    });
