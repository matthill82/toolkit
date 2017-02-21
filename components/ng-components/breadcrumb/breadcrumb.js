/**
 * @example
 *  <breadcrumb
 *      br-defaults="build/essentials||build/setup||build/protection||build/accessories"
 *      br-labels="Essentials||Setup||Protection||Accessories"
 *      br-routes="\x22build/essentials||build/device||build/keyboard\x22, \x22build/setup\x22, \x22build/protection\x22, \x22build/accessories\x22"
 *  ></breadcrumb>
 */
angular
    .module('uitoolkit')
    .component('breadcrumb', {
        bindings: {
            defaults: '@brDefaults',
            labels: '@brLabels',
            icons: '@brIcons',
            routes: '@brRoutes',
            themeIcons: '@brThemeIcons',
            completeIcon: '@brCompleteIcon'
        },
        controller: 'BreadcrumbController',
        templateUrl: '/components/ng-components/breadcrumb/breadcrumb.html'
    });
