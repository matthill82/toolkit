angular
    .module('uitoolkit')
    .filter('addNumbers', addNumbersFilterFactory);

function addNumbersFilterFactory() {
    /**
     * @param {Array} input
     * @param {number} total
     * @returns {Array}
     */
    function addNumbersFilter(input, total) {
        var i = 0;

        total = parseInt(total);

        if (!angular.isArray(input) || !total) {
            return input;
        }

        for (; i < total; ++i) {
            input.push(i);
        }

        return input;
    }

    return addNumbersFilter;
}
