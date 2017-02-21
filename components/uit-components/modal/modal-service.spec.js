describe('UitModalService', function () {

    var UitModalService;

    beforeEach(module('uitoolkit'));
    beforeEach(module('/components/uit-components/modal/modal.html'));

    beforeEach(inject(function (_UitModalService_) {
        UitModalService = _UitModalService_;
    }));

    describe('showModal()', function () {

        it('should return a modal object with defaults populated', function () {

            var mockOptions = {
                params: {
                    title: 'mock title',
                    message: 'mock message'
                }
            };

            UitModalService.showModal(mockOptions);

            expect(mockOptions.params.title).toEqual('mock title');
            expect(mockOptions.params.title).toEqual('mock title');
            expect(mockOptions.params.message).toEqual('mock message');
            expect(mockOptions.params.submit).toBeDefined();
            expect(mockOptions.params.dismiss).toBeDefined();
            expect(mockOptions.type).toEqual('confirm');
            expect(mockOptions.size).toEqual('md');

        });

        it('should return a modal object with defaults overwritten', function () {

            var mockOptions = {
                size: 'sm',
                type: 'other type',
                params: {
                    title: 'mock title',
                    message: 'mock message'
                },
                component: 'uit-modal'
            };

            UitModalService.showModal(mockOptions);

            expect(mockOptions.params.title).toEqual('mock title');
            expect(mockOptions.params.message).toEqual('mock message');
            expect(mockOptions.params.submit).toBeDefined();
            expect(mockOptions.params.dismiss).toBeDefined();
            expect(mockOptions.type).toEqual('other type');
            expect(mockOptions.size).toEqual('sm');

        });

    });

});
