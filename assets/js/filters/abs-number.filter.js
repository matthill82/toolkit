angular
    .module('uitoolkit')
    .filter('absNumber', absNumberFilterFactory);

function absNumberFilterFactory() {
    /**
     * @param {*} input
     * @param {string} groupSep
     * @returns {string}
     */
    function absNumberFilter(input, groupSep) {
        if (angular.isUndefined(groupSep)) {
            groupSep = ',';
        }

        return parseInt(input).toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSep);
    }

    return absNumberFilter;
}
