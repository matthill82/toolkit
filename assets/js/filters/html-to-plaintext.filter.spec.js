describe('htmlToPlaintext filter: ', function () {
    var $filter;

    beforeEach(function () {
        module('uitoolkit');
    });

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('Should leave a plaintext string unchanged.', function () {
        expect($filter('htmlToPlaintext')('TEST')).toEqual('TEST');
    });

    it('Should ignore falsy input.', function () {
        expect($filter('htmlToPlaintext')(0)).toEqual('');
    });

    it('Should convert non-string input to a string.', function () {
        expect($filter('htmlToPlaintext')(1)).toEqual('1');
        expect($filter('htmlToPlaintext')(['ONE', 'TWO'])).toEqual('ONE,TWO');
        expect($filter('htmlToPlaintext')({property: 'VALUE'})).toEqual('[object Object]');
    });

    it('Should remove xml-like content from the string', function () {
        expect($filter('htmlToPlaintext')('SOME <span>THING</span>')).toEqual('SOME THING');
    });
});
