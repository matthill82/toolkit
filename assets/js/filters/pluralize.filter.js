angular.module('uitoolkit')
    .filter('pluralize', pluralizeFilterFactory);

function pluralizeFilterFactory() {
    function pluralizeFilter(input, count, irregularForm) {
        count = parseInt(count);

        if (count !== 1) {
            if (angular.isUndefined(irregularForm)) {
                return input + 's';
            }

            return irregularForm;
        }

        return input;
    }

    return pluralizeFilter;
}
