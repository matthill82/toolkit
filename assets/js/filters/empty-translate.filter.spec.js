describe('emptyTranslate filter', function () {
    var $filter;

    beforeEach(function () {
        module('uitoolkit');
    });

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    it('Should leave string as is if no prefix', function () {
        expect($filter('emptyTranslate')('TEST.label')).toEqual('TEST');
    });

    it('Should remove prefix if present', function () {
        expect($filter('emptyTranslate')('hb.TEST.label')).toEqual('TEST');
    });

    it('Should remove up to last . if prefix present', function () {
        expect($filter('emptyTranslate')('hb.accountData.customer.selectedDevice.contract.signature.label')).toEqual('signature');
    });
});
