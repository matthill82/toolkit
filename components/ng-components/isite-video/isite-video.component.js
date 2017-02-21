angular.module('uitoolkit')
    .component('isiteVideo', {
        bindings: {
            border: '@isiteVideoBorder',
            scrolling: '@isiteVideoScrolling',
            seamless: '@isiteVideoSeamless',
            width: '@isiteVideoWidth',
            height: '@isiteVideoHeight',
            allowFullScreen: '@isiteVideoAllowFullScreen',
            frameBorder: '@isiteVideoFrameBorder',
            srcUrl: '@isiteVideoSource'
        },
        controller: 'IsiteVideoController',
        templateUrl: '/components/ng-components/isite-video/isite-video.html'
    });
