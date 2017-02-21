describe('carouselGoTo', function () {
    var $componentController;
    var mockCarouselContainerController;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockCarouselContainerController = {
            CarouselController: {
                scrollToIndex: jasmine.createSpy()
            },
            start: false,
            end: false,
            visible: [1]
        };
    });

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('.disabled()', function () {
        it('Should return false on unrecognised direction.', function () {
            var ctrl = $componentController('carouselGoTo');

            expect(ctrl.disabled()).toBeFalsy();
        });

        describe('When direction is "next"', function () {
            it('Should be disabled when container end is true.', function () {
                var ctrl;

                mockCarouselContainerController.end = true;

                ctrl = $componentController(
                    'carouselGoTo',
                    null,
                    {
                        CarouselContainerController: mockCarouselContainerController,
                        direction: 'next'
                    }
                );

                expect(ctrl.disabled()).toBeTruthy();
            });

            it('Should be enabled when container end is false.', function () {
                var ctrl = $componentController(
                    'carouselGoTo',
                    null,
                    {
                        CarouselContainerController: mockCarouselContainerController,
                        direction: 'next'
                    }
                );

                expect(ctrl.disabled()).toBeFalsy();
            });
        });

        describe('When direction is "previous"', function () {
            it('Should be disabled when container start is true.', function () {
                var ctrl;

                mockCarouselContainerController.start = true;

                ctrl = $componentController(
                    'carouselGoTo',
                    null,
                    {
                        CarouselContainerController: mockCarouselContainerController,
                        direction: 'previous'
                    }
                );

                expect(ctrl.disabled()).toBeTruthy();
            });

            it('Should be enabled when container start is false.', function () {
                var ctrl = $componentController(
                    'carouselGoTo',
                    null,
                    {
                        CarouselContainerController: mockCarouselContainerController,
                        direction: 'previous'
                    }
                );

                expect(ctrl.disabled()).toBeFalsy();
            });
        });
    });

    describe('.go()', function () {
        it('Should throw on unrecognised direction.', function () {
            var ctrl = $componentController('carouselGoTo');

            expect(function () {
                ctrl.go();
            }).toThrow();
        });

        describe('When direction is "next"', function () {
            it('Should go to visible 0 + 1.', function () {
                var ctrl = $componentController(
                    'carouselGoTo',
                    null,
                    {
                        CarouselContainerController: mockCarouselContainerController,
                        direction: 'next'
                    }
                );

                ctrl.go();

                expect(mockCarouselContainerController.CarouselController.scrollToIndex).toHaveBeenCalledWith(2);
            });
        });

        describe('When direction is "previous"', function () {
            it('Should go to visible 0 - 1.', function () {
                var ctrl = $componentController(
                    'carouselGoTo',
                    null,
                    {
                        CarouselContainerController: mockCarouselContainerController,
                        direction: 'previous'
                    }
                );

                ctrl.go();

                expect(mockCarouselContainerController.CarouselController.scrollToIndex).toHaveBeenCalledWith(0);
            });
        });
    });
});
