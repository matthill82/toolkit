angular
    .module('uitoolkit')
    .filter('decNumber', decNumberFilterFactory);

function decNumberFilterFactory() {
    /**
     * @param {*} input
     * @param {string|number} places
     * @returns {string}
     */
    function decNumberFilter(input, places) {
        places = parseInt(places) || 2;

        return parseFloat(input).toFixed(places).split('.')[1];
    }

    return decNumberFilter;
}
