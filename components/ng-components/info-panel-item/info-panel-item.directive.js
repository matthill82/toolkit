angular.module('uitoolkit')
    .directive('infoPanelItem', InfoPanelItem);

function InfoPanelItem() {
    return {
        replace : true,
        scope: {},
        templateUrl: '/components/ng-components/info-panel-item/info-panel-item.html',
        link: function (scope, element, attr) {
            scope.title = attr.pnlTitle;
            scope.text = attr.pnlText;
            scope.icon = attr.pnlIcon;
            scope.theme = attr.pnlTheme;
            scope.spacing = attr.pnlSpacing;
            scope.background = attr.pnlBackground;
        }
    };
}
