/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
    .controller('DeviceWaveController', function (DeviceService, $interval, $timeout, $scope, $rootScope, StateManagement, $state) {

        var vm = this;

        var defaultPhones = ['BLACKBERRY_PASSPORT', 'APPLE_IPHONE_6_PLUS_64GB', 'HUAWEI_P8', 'DORO_LIBERTO_820_MINI', 'MICROSOFT_LUMIA_550'];

        var deviceClicked = '';
        var delay;
        var pulseTime;
        var intervalDelay;
        var initDelay;
        var waveEnabled;
        var phoneLength;
        var middlePhone;
        var breakLoops = false;

        vm.clickHandler = clickHandler;
        vm.stripName = stripName;

        $scope.initialize = function (showReflection,
                                      pulseDuration,
                                      pulseDelay,
                                      initialDelay,
                                      waveEnabl,
                                      productNames,
                                      redirectAddress,
                                      apiParam) {
            vm.apiParam = apiParam;
            vm.redirectAddress = redirectAddress || 'product-details';
            vm.showReflection = showReflection !== 'false';
            intervalDelay =  !isNaN(parseInt(pulseDelay)) ? parseInt(pulseDelay) : 0;
            pulseTime = !isNaN(parseInt(pulseDuration)) ? parseInt(pulseDuration) : 1500;
            initDelay = !isNaN(parseInt(initialDelay)) ? parseInt(initialDelay) * 1000 : 5000;
            waveEnabled = waveEnabl !== 'false';

            var productsArray = productNames ? productNames.split(',') : defaultPhones;

            DeviceService.findProductsByName(productsArray)
                .then(
                    function (response) {
                        var phoneList = [];
                        var buckets = response.aggregations.devices.buckets.length > 0 ?
                            response.aggregations.devices.buckets :
                            defaultPhones;

                        buckets.forEach(function (bucket) {
                            bucket.item.hits.hits[0]._source.device.active = false;
                            phoneList.push(bucket.item.hits.hits[0]._source.device);
                        });
                        vm.phones = phoneList;
                        phoneLength = vm.phones.length;
                        delay = pulseTime / phoneLength;
                        middlePhone = vm.phones[Math.ceil(phoneLength / 2) - 1];
                        vm.activePhone = middlePhone.id;
                        if (waveEnabled) {
                            $timeout(
                                runInterval,
                                initDelay);
                        }
                    }
                );
        };

        function clickHandler(deviceId) {

            stopProcess();
            if (deviceClicked === deviceId) {
                goToAddress(deviceId);
            } else {
                deviceClicked = deviceId;
            }
            deviceClicked = deviceClicked || deviceId;

        }

        $(window).on('touchstart', function(){
            stopProcess();
        });


        function goToAddress(deviceId) {
            StateManagement.setDevice('device', deviceId);
            var link = vm.redirectAddress;
            link = link.replaceHTMLSuffix();
            $state.go(link);
        }


        function stripName(deviceName) {
            deviceName = deviceName || '';
            if (vm.apiParam) {
                var newName = deviceName.split('?')[0];
                return newName + '?' + vm.apiParam;
            } else {
                return deviceName;
            }
        }


        function runInterval() {
            runWave();
            $interval(runWave, 2 * phoneLength * delay + intervalDelay * 1000);
        }

        function stopProcess() {
            vm.running = '';
            breakLoops = true;
        }

        function runWave() {
            if (breakLoops) {
                return;
            }
            $timeout(function () {
                    vm.running = 'left-right';
                },
                delay
            );


            for (var i = 0; i <= phoneLength; i++) {
                applyActive(i, phoneLength);
            }

            $timeout(
                function () {
                    $timeout(function () {
                            vm.running = breakLoops ? '' : 'right-left';
                        },
                        delay
                    );
                    for (var i = phoneLength - 1; i >= -1; i--) {
                        if (breakLoops) {
                            break;
                        }
                        applyActiveReverse(i);
                    }
                },
                phoneLength * delay
            );
            if (intervalDelay > 1) {
                $timeout(function () {
                        vm.activePhone = middlePhone.id;
                        vm.running = '';
                    },
                    2 * phoneLength * delay + 100
                );
            }

        }

        function applyActive(index) {

            var timeout = delay * index;
            $timeout(
                function () {

                    if (breakLoops || index === phoneLength) {
                        return;
                    }
                    vm.activePhone = vm.phones[index].id;
                },
                timeout
            );
        }

        function applyActiveReverse(index) {

            var timeout = delay * (phoneLength - index);
            $timeout(
                function () {

                    if (breakLoops) {
                        return;
                    }

                    if (index >= 0) {
                        vm.activePhone = vm.phones[index].id;
                    }

                },
                timeout
            );

        }

        $rootScope.$watch(
            'hintMode',
            function handlehintModeChange( newValue ) {
                if(newValue){
                    stopProcess();
                }
            }
        );

    });
