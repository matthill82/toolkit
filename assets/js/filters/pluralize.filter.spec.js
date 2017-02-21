describe('Pluralize filter: ', function () {
    var $filter;

    beforeEach(function () {
        module('uitoolkit');
    });

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('several items - add +s', function () {
        expect($filter('pluralize')('foo', 3)).toEqual('foos');
    });

    it('0 items - add +s', function () {
        expect($filter('pluralize')('foo', 0)).toEqual('foos');
    });

    it('one item - no +s', function () {
        expect($filter('pluralize')('foo', 1)).toEqual('foo');
    });

    it('several items - display irregular plural', function () {
        expect($filter('pluralize')('foo', 3, 'foozzz')).toEqual('foozzz');
    });

    it('0 items - display irregular plural', function () {
        expect($filter('pluralize')('foo', 0, 'foozzz')).toEqual('foozzz');
    });

    it('one item - dont\'t display irregular plural', function () {
        expect($filter('pluralize')('foo', 1, 'foozzz')).toEqual('foo');
    });

    it('string count: several items - display irregular plural', function () {
        expect($filter('pluralize')('foo', '3', 'foozzz')).toEqual('foozzz');
    });

    it('string count: 0 items - display irregular plural', function () {
        expect($filter('pluralize')('foo', '0', 'foozzz')).toEqual('foozzz');
    });

    it('string count: one item - dont\'t display irregular plural', function () {
        expect($filter('pluralize')('foo', '1', 'foozzz')).toEqual('foo');
    });
});
