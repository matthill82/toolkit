angular.module('uitoolkit')
    .filter('htmlDecode', htmlDecodeFilterFactory);

/**
 * @param {$document} $document
 */
function htmlDecodeFilterFactory($document) {
    function htmlDecodeFilter(input) {
        var elm;

        if (angular.isString(input)) {
            input = input.replace(/x27/g, '\'');
            input = input.replace(/x26/g, '#');
            input = input.replace(/x22/g, '\"');

            elm = $document[0].createElement('textarea');
            elm.innerHTML = input;

            return elm.value;
        }
    }

    return htmlDecodeFilter;
}
