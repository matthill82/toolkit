describe('uitInsertPlaceholder', function () {

    var $componentController;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    it('should split the sentence on the placeholder', function () {

        var component = $componentController('uitInsertPlaceholder', {}, {
            sentence: 'this sentence needs to {replace} a placeholder'
        });

        component.$onInit();
        expect(component.splitSentence).toEqual(['this sentence needs to ', 'replace', ' a placeholder']);

    });
});
