angular.module('uitoolkit')
    .filter('htmlEntities', htmlEntitiesFilterFactory);

/**
 * @param {$document} $document
 */
function htmlEntitiesFilterFactory($document) {
    function htmlEntitiesFilter(input) {
        var elm;

        if (angular.isString(input)) {
            input = input.replace(/\\\\u0026/g, '&');

            elm = $document[0].createElement('textarea');
            elm.innerHTML = input;

            return elm.value;
        }
    }

    return htmlEntitiesFilter;
}
