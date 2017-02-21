describe('addNumbers filter', function () {
    var $filter;

    beforeEach(function () {
        module('uitoolkit');
    });

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('Should add to array.', function () {
        expect($filter('addNumbers')([], 3)).toEqual([0, 1, 2]);
    });

    it('Should ignore invalid input.', function () {
        expect($filter('addNumbers')('string', 3)).toEqual('string');
    });
});
