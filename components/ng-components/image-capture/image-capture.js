angular.module('uitoolkit')
    .component('imageCapture', {
        bindings: {
            model: '='
        },
        controller: 'ImageCaptureController',
        templateUrl: '/components/ng-components/image-capture/image-capture.html'
    });
