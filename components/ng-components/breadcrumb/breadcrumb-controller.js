angular
    .module('uitoolkit')
    .controller('BreadcrumbController', BreadcrumbController);

/**
 * @param {object} $state
 * @param {UtilityService} UtilityService
 * @constructor
 */
function BreadcrumbController($state, UtilityService) {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.goTo = goTo;

    function $onInit() {
        var i = 0;
        var items = {};

        $ctrl.breadcrumb = [];

        items.labels = UtilityService.pipeSeparatedList($ctrl.labels);
        items.defaults = UtilityService.pipeSeparatedList($ctrl.defaults);
        items.icons = UtilityService.pipeSeparatedList($ctrl.icons);
        items.routes = $ctrl.routes.split(',');

        for (; i < items.labels.length; i++) {
            items.routes[i] = items.routes[i].trim().replace(/\\x22/g,'').split(/\s*\|\|\s*/);

            $ctrl.breadcrumb.push({
                icon: items.icons[i],
                label: items.labels[i],
                routes: items.routes[i],
                default: items.defaults[i]
            });

            if (items.routes[i].indexOf($state.current.name) !== -1) {
                $ctrl.activeItemIndex = i;
            }
        }
    }

    /**
     * @param {number} index
     */
    function goTo(index) {
        var link;

        if (index <= $ctrl.activeItemIndex) {
            link = $ctrl.breadcrumb[index].default;
            link = link.replaceHTMLSuffix();

            $state.go(link);
        }
    }
}
