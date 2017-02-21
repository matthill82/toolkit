angular
    .module('uitoolkit')
    .controller('DeviceTagsController', DeviceTagsController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {object} EventEnums
 * @param JrdService
 * @constructor
 */
function DeviceTagsController($scope, EventEnums, JrdService) {
    var $ctrl = this;
    var TAG_NAME = 'device-tags';

    $ctrl.deviceData = {};
    $ctrl.tagsData = [];

    $scope.$on(EventEnums.ENUMS.SELECTED_DEVICE, function (event, data) {
        var feature;
        var i;
        var j;
        var tag;
        var tags = JrdService.get($ctrl.journeyType, TAG_NAME);

        $ctrl.deviceData = data;

        if (tags) {
            for (i = 0; i < tags.length; i++) {
                tag = tags[i];
                for (j = 0; j < $ctrl.deviceData.features.length; j++) {
                    feature = $ctrl.deviceData.features[j];
                    if (feature.category === tag.featureCategory && feature.name === tag.featureName) {
                        if (tag.featureRule === 'equal-to') {
                            if (feature.value === tag.featureValue) {
                                $ctrl.tagsData.push(tag);
                                break;
                            }
                        }
                        if (tag.featureRule === 'not-empty') {
                            if ($ctrl.tagsData < 2) { //only up to two should be displayed
                                $ctrl.tagsData.push(tag);
                            }
                            break;
                        }
                    }
                }
            }
        }
    });
}
