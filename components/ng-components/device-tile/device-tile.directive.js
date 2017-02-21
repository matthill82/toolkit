angular
    .module('uitoolkit')
    .directive('deviceTile', deviceTileDirective);

function deviceTileDirective() {
    return {
        replace: true,
        scope: true,
        templateUrl: '/components/ng-components/device-tile/device-tile.html',
        controller: 'DeviceTileController',
        controllerAs: 'DeviceTileController'
    };
}
