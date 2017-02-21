/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .controller('DeviceStickersController', function (JrdService, $log, $scope, EventEnums) {
            var TAG_NAME = 'stickers';
            var vm = this;
            vm.stickerArr = []; 
            vm.deviceData = {};

            $scope.$on(EventEnums.ENUMS.SELECTED_DEVICE, function (event, data) {
                vm.deviceData = data.features;                
                var stickers = JrdService.get($scope.journeyType, TAG_NAME);

                if (stickers) {
                    vm.deviceData.forEach(function (feature) {
                        stickers.forEach(function (item) {
                                if (item.featureCategory === feature.category && item.featureName === feature.name) {
                                    if (item.featureRule === 'not-empty') {
                                        vm.stickerArr.push(item);
                                        return false;
                                    } else if (item.featureRule === 'equal-to') {
                                        if(item.featureValue === feature.value) {
                                            vm.stickerArr.push(item);
                                            return false;
                                        } else {
                                            return false;
                                        }
                                    }
                                } else {
                                    return false;
                                }
                            }
                        );
                    });
                }
    
            });
        })
;

