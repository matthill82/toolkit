angular
    .module('uitoolkit')
    .filter('htmlToPlaintext', htmlToPlaintextFilterFactory);

/**
 * @param {$document} $document
 */
function htmlToPlaintextFilterFactory($document) {
    /**
     * @param {string} text
     * @returns {string}
     */
    function htmlToPlaintextFilter(text) {
        var elem = $document[0].createElement('textarea');

        text = text ? String(text).replace(/<[^>]+>/gm, '') : '';

        elem.innerHTML = text;

        return elem.value;
    }

    return htmlToPlaintextFilter;
}
