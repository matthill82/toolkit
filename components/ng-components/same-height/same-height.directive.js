angular.module('uitoolkit')
    .directive('sameHeight', function ($timeout, $window) {
        var sameHeight = {
            restrict: 'A',
            groups: {},
            link: function (scope, element, attrs) {

                var resetTimeout;
                var getHighestTimeout;

                angular.element($window).bind('resize', getHighestDelayed);

                getHighestDelayed(); // make sure angular has proceeded the binding

                function getHighestDelayed() {
                    if (getHighestTimeout) {
                        $timeout.cancel(getHighestTimeout);
                    }
                    getHighestTimeout = $timeout(getHighest, 0);
                }

                function getHighest() {
                    if (!sameHeight.groups[attrs.sameHeight]) { // if not exists then create the group
                        sameHeight.groups[attrs.sameHeight] = {
                            height: 0,
                            elems: []
                        };
                    }
                    sameHeight.groups[attrs.sameHeight].elems.push(element);
                    $(element).css('height', ''); // make sure we capture the origin height


                    if (sameHeight.groups[attrs.sameHeight].height < $(element).outerHeight()) {
                        sameHeight.groups[attrs.sameHeight].height = $(element).outerHeight();
                    }

                    if (isItOrParentParentLast(scope)) {
                        // set the max height to all the elements
                        angular.forEach(sameHeight.groups[attrs.sameHeight].elems, function (elem) {
                            $(elem).css('height', sameHeight.groups[attrs.sameHeight].height);
                        });

                        // reset the max height
                        // sameHeight.groups[attrs.sameHeight].height = 0;
                        if (resetTimeout) {
                            $timeout.cancel(resetTimeout);
                        }
                        resetTimeout = $timeout(reset, 0);
                    }
                }

                function isItOrParentParentLast(scp) {
                    if (scp.$last) {
                        return true;
                    }
                    if (scp.$parent) {
                        return isItOrParentParentLast(scp.$parent);
                    }
                    return false;
                }

                function reset() {

                    sameHeight.groups[attrs.sameHeight].height = 0;

                }
            }
        };

        return sameHeight;
    });
