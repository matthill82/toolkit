describe('HTML Entities to characters filter: ', function () {
    var $filter;
    var data;
    var i;

    beforeEach(function () {
        module('uitoolkit');
    });

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    data = [
        {
            input: '\u0026',
            output: '&'
        },
        {
            input: '&#x2d;',
            output: '-'
        },
        {
            input: '&pound;',
            output: '\u00A3' // £
        },
        {
            input: '&trade;',
            output: '\u2122' // ™
        },
        {
            input: '&reg;',
            output: '\u00AE' // ®
        },
        {
            input: '&ndash;',
            output: '–'
        },
        {
            input: '&quot;',
            output: '"'
        }
    ];

    function callHtmlEntitiesConversion(data) {
        it('should convert ' + data.input + ' to be converted to ' + data.output, function () {
            expect($filter('htmlEntities')(data.input)).toEqual(data.output);
        });
    }

    for (i = 0; i<data.length; i++) {
        callHtmlEntitiesConversion(data[i]);
    }

    it('Should ignore non-string input.', function () {
        expect($filter('htmlEntities')([])).toBeUndefined();
    });
});
