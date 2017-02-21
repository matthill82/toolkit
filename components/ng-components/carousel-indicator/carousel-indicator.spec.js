describe('carouselIndicator', function () {
    var $componentController;
    var mockCarouselContainerController;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockCarouselContainerController = {
            setIndicator: jasmine.createSpy()
        };
    });

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('.$onInit()', function () {
        it('Should publish itself to the container controller.', function () {
            var ctrl = $componentController('carouselIndicator', null, {
                CarouselContainerController: mockCarouselContainerController
            });

            ctrl.$onInit();

            expect(mockCarouselContainerController.setIndicator).toHaveBeenCalled();
        });
    });
});
