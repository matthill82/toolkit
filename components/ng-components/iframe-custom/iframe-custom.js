angular
    .module('uitoolkit')
    .component('iframeCustom', {
        bindings: {
            url: '@iframeUrl',
            width: '@iframeWidth',
            height: '@iframeHeight',
            enableScrollbars: '@iframeEnableScrollbars'
        },
        controller: 'iframeCustomController',
        templateUrl: '/components/ng-components/iframe-custom/iframe-custom.html'
    }
);
