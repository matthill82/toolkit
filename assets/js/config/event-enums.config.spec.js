describe('dsEventAnswer directive', function () {
    var EventEnums;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_EventEnums_) {
        EventEnums = _EventEnums_;
    }));

    it('Should create ENUMS.', function () {
        expect(EventEnums.ENUMS).toBeDefined();
    });
});
