describe('emptyTranslate filter', function () {
    var $filter;
    var mock$window;

    beforeEach(function () {
        module('uitoolkit');
    });

    beforeEach(function () {
        mock$window = {
            location: {
                protocol: 'file:',
                pathname: 'TEST/www/SOMETHING'
            }
        };

        module(function ($provide) {
            $provide.value('$window', mock$window);
        });
    });

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('Should leave non-relative url as-is', function () {
        var url = 'http://www.test.com';

        expect($filter('relativeUrl')(url)).toEqual(url);
    });

    it('Should leave relative url as-is when not served on file:.', function () {
        var url = '/TEST.ME';

        mock$window.location.protocol = 'TEST:';

        expect($filter('relativeUrl')(url)).toEqual(url);
    });

    it('Should reformat relative url to work for phonegap.', function () {
        expect($filter('relativeUrl')('/TEST.ME')).toEqual('TEST/www/TEST.ME');
    });
});
