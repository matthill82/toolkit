angular.module('uitoolkit')
    .directive('deviceWave', function () {

        return {

            templateUrl: '/components/ng-components/device-wave/device-wave.html',
            controller: 'DeviceWaveController',
            controllerAs: 'DeviceWaveController',
            link: function (scope, element, attr) {

                scope.initialize(
                    attr.dwShowReflection,
                    attr.dwPulseTime,
                    attr.dwIntervalDelay,
                    attr.dwInitialDelay,
                    attr.dwWaveEnabled,
                    attr.dwProducts,
                    attr.dwAddress,
                    attr.dwExtraImgApiParams
                );

            }
        };

    });
