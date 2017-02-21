describe('absNumberFilter', function () {
    var absNumberFilter;

    beforeEach(function () {
        module('uitoolkit');
    });

    beforeEach(inject(function ($filter) {
        absNumberFilter = $filter('absNumber');
    }));

    describe('Format numbers', function () {
        it('Should format 1', function () {
            expect(absNumberFilter(1)).toEqual('1');
        });

        it('Should format number 1000', function () {
            expect(absNumberFilter(1000)).toEqual('1,000');
        });

        it('Should format number 1000 with custom groupSep', function () {
            expect(absNumberFilter(1000, 'X')).toEqual('1X000');
        });

        it('Should format 1000.666', function () {
            expect(absNumberFilter(1000.666)).toEqual('1,000');
        });

        it('Should format -1000.666', function () {
            expect(absNumberFilter(-1000.666)).toEqual('-1,000');
        });

        it('Should format "-1000.666"', function () {
            expect(absNumberFilter('-1000.666')).toEqual('-1,000');
        });

        it('Should allow empty string groupSep', function () {
            expect(absNumberFilter(1000, '')).toEqual('1000');
        });
    });
});
