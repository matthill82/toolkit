angular
    .module('uitoolkit')
    .directive('setPageTitle', setPageTitleDirective);

/**
 * @param {StateManagement} StateManagement
 */
function setPageTitleDirective(StateManagement) {
    return {
        link: setPageTitleLink,
        restrict: 'A'
    };

    function setPageTitleLink(scope, iElement, iAttrs) {
        StateManagement.setPageTitle(iAttrs.setPageTitle);
    }
}
