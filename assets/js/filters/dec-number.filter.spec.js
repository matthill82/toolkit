describe('absNumberFilter', function () {
    var decNumberFilter;

    beforeEach(function () {
        module('uitoolkit');
    });

    beforeEach(inject(function ($filter) {
        decNumberFilter = $filter('decNumber');
    }));

    describe('Format numbers', function () {
        it('Should format 1', function () {
            expect(decNumberFilter(1)).toEqual('00');
        });

        it('Should format -1', function () {
            expect(decNumberFilter(-1)).toEqual('00');
        });

        it('Should format 1.1111', function () {
            expect(decNumberFilter(1.1111)).toEqual('11');
        });

        it('Should format -1.009', function () {
            expect(decNumberFilter(-1.009)).toEqual('01');
        });

        it('Should format 0', function () {
            expect(decNumberFilter(0)).toEqual('00');
        });

        it('Should format "0"', function () {
            expect(decNumberFilter('0')).toEqual('00');
        });

        it('Should format "0.009"', function () {
            expect(decNumberFilter('0.009')).toEqual('01');
        });
    });
});
