angular
    .module('uitoolkit')
    .filter('emptyTranslate', emptyTranslateFilterFactory);

function emptyTranslateFilterFactory() {
    function emptyTranslateFilter(titleDef) {
        var param = 'hb.';
        var title = titleDef.replace(/.label$/, '');

        if (title.indexOf(param) > -1) {
            return title.substr(title.lastIndexOf('.') + 1);
        }

        return title;
    }

    return emptyTranslateFilter;
}
