angular
    .module('uitoolkit')
    .controller('SimpleHbFieldController', SimpleHbFieldController);

/**
 * @param {$rootScope.Scope} $scope
 * @param {UtilityService} UtilityService
 */
function SimpleHbFieldController($scope, UtilityService) {
    var $ctrl = this;
    var node = UtilityService.findUpScope($scope, 'node');

    if (node) {
        $ctrl.node = findHbNamedNode(node, $ctrl.nodeName);
    }

    function findHbNamedNode(node, fullName) {
        var prop;
        var result;

        if (node.fullName === fullName) {
            return node;
        }

        if (angular.isDefined(node.children)) {
            for (prop in node.children) {
                if (node.children.hasOwnProperty(prop)) {
                    result = findHbNamedNode(node.children[prop], fullName);

                    if (result) {
                        return result;
                    }
                }
            }
        }
    }
}
