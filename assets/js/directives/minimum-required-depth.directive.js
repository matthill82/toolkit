/**
 * Removes element it is added to form the DOM if the user's depth level is
 * less than the specified value.
 *
 * @example
 *  <ANY
 *      minimum-required-depth="0"
 *  ></ANY>
 */
angular
    .module('uitoolkit')
    .directive('minimumRequiredDepth', minimumRequiredDepth);

/**
 * @param {UserService} UserService
 */
function minimumRequiredDepth(UserService) {
    return {
        link: minimumRequiredDepthLink,
        priority: 10000,
        restrict: 'A'
    };

    function minimumRequiredDepthLink(scope, iElement, iAttrs) {
        var depth = parseInt(iAttrs.minimumRequiredDepth);

        if (depth && angular.isDefined(UserService.getUser()) && UserService.getMaxDepth() < depth) {
            iElement.remove();
        }
    }
}
