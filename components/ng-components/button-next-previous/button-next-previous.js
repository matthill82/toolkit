/**
 * @example
 * <button-next-previous
 *     bb-button-path="device-selector"
 *     bb-button-label="back"
 *     bb-button-x-offset="260"
 *     bb-button-icon-size="80"
 *     bb-button-icon="cwsicon cwsicon-arrow-left"
 * ></button-next-previous>
 */
angular
    .module('uitoolkit')
    .component('buttonNextPrevious', {
        bindings: {
            label: '@bbButtonLabel',
            path: '@bbButtonPath',
            icon: '@bbButtonIcon',
            xOffset: '@bbButtonXOffset',
            iconSize: '@bbButtonIconSize'
        },
        controller: 'ButtonNextPreviousController',
        templateUrl: '/components/ng-components/button-next-previous/button-next-previous.html'
    });
