describe('carousel', function () {
    var $componentController;
    var $rootScope;
    var $timeout;
    var animationFrameCallback;
    var mock$document;
    var mock$element;
    var mock$window;
    var mockCarouselContainerController;
    var mockElementEvents;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$document = [
            {
                documentElement: {
                    style: {
                        scrollBehavior: true
                    }
                }
            }
        ];

        mock$element = {
            0: {
                childElementCount: 4,
                offsetWidth: 2000,
                scrollLeft: 0,
                scrollTo: jasmine.createSpy()
            },
            on: function (eventName, callback) {
                mockElementEvents[eventName] = callback;
            }
        };

        spyOn(mock$element, 'on').and.callThrough();

        mock$window = {
            cancelAnimationFrame: jasmine.createSpy(),
            requestAnimationFrame: function (callback) {
                animationFrameCallback = callback;

                return 1;
            }
        };

        spyOn(mock$window, 'requestAnimationFrame').and.callThrough();

        mockCarouselContainerController = {
            initializeCarousel: function (CarouselController) {
                this.CarouselController = CarouselController;
            },
            setItems: jasmine.createSpy(),
            setStatus: jasmine.createSpy()
        };

        spyOn(mockCarouselContainerController, 'initializeCarousel').and.callThrough();

        mockElementEvents = {};

        module(function ($provide) {
            $provide.value('$document', mock$document);
            $provide.value('$element', mock$element);
            $provide.value('$window', mock$window);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$timeout_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    describe('.$postLink()', function () {
        it('Should trigger auto advance.', function () {
            var ctrl = $componentController('carousel');

            spyOn(ctrl, 'autoAdvanceStart');

            ctrl.$postLink();

            expect(ctrl.autoAdvanceStart).toHaveBeenCalled();
        });

        it('Should bind element events.', function () {
            var ctrl = $componentController('carousel');

            expect(mockElementEvents.scroll).toBeUndefined();
            expect(mockElementEvents.touchend).toBeUndefined();
            expect(mockElementEvents.touchstart).toBeUndefined();

            ctrl.$postLink();

            expect(mockElementEvents.scroll).toBeDefined();
            expect(mockElementEvents.touchend).toBeDefined();
            expect(mockElementEvents.touchstart).toBeDefined();
        });

        it('Should initialize.', function () {
            var ctrl = $componentController(
                'carousel',
                {
                    $scope: $rootScope
                }, {
                    CarouselContainerController: mockCarouselContainerController,
                    slidesShown: '2'
                }
            );

            ctrl.$postLink();

            $rootScope.$digest();

            expect(mockCarouselContainerController.initializeCarousel).toHaveBeenCalledWith(ctrl, 4);

            expect(mockCarouselContainerController.setStatus).toHaveBeenCalledWith(true, false, [0, 1], undefined);
        });
    });

    describe('.autoAdvanceStart()', function () {
        it ('Should cancel any existing auto advance timeout.', function () {
            var ctrl = $componentController('carousel');

            spyOn(ctrl, 'autoAdvanceStop');

            ctrl.autoAdvanceStart();

            expect(ctrl.autoAdvanceStop).toHaveBeenCalled();
        });

        it('Should advance to next index.', function () {
            var ctrl = $componentController('carousel', null, {
                autoAdvance: '1'
            });

            spyOn(ctrl, 'scrollToIndex');

            ctrl.end = false;
            ctrl.visible = [0];
            ctrl.autoAdvanceStart();

            $timeout.flush();

            expect(ctrl.scrollToIndex).toHaveBeenCalledWith(1);
        });

        it('Should advance to first index on end.', function () {
            var ctrl = $componentController('carousel', null, {
                autoAdvance: '1'
            });

            spyOn(ctrl, 'scrollToIndex');

            ctrl.end = true;
            ctrl.autoAdvanceStart();

            $timeout.flush();

            expect(ctrl.scrollToIndex).toHaveBeenCalledWith(0);
        });

        it('Should not set up a timeout if there is no autoAdvance time configured.', function () {
            var ctrl = $componentController('carousel');

            $timeout.flush();

            ctrl.autoAdvanceStart();

            $timeout.verifyNoPendingTasks();
        });
    });

    describe('.autoAdvanceStop()', function () {
        it('Should cancel any autoAdvance timeout.', function () {
            var ctrl = $componentController('carousel', null, {
                autoAdvance: '1'
            });

            spyOn($timeout, 'cancel');

            ctrl.autoAdvanceStart();

            expect($timeout.cancel).not.toHaveBeenCalled();

            ctrl.autoAdvanceStop();

            expect($timeout.cancel).toHaveBeenCalled();
        });
    });

    describe('.scrollTo()', function () {
        it('Should call autoAdvanceStop.', function () {
            var ctrl = $componentController('carousel');

            spyOn(ctrl, 'autoAdvanceStop');

            ctrl.scrollTo(500);

            expect(ctrl.autoAdvanceStop).toHaveBeenCalled();
        });

        it('Should do nothing when already at the specified position.', function () {
            var ctrl = $componentController('carousel');

            mock$element[0].scrollLeft = 500;

            spyOn(ctrl, 'autoAdvanceStop');

            ctrl.scrollTo(500);

            expect(ctrl.autoAdvanceStop).not.toHaveBeenCalled();
        });

        describe('With browser support.', function () {
            it('Should use element\'s scrollTo method.', function () {
                var ctrl = $componentController('carousel');

                ctrl.scrollTo(500);

                expect(mock$element[0].scrollTo).toHaveBeenCalledWith({
                    behavior: 'smooth',
                    left: 500,
                    top: 0
                });
            });
        });

        describe('Without browser support.', function () {
            beforeEach(function () {
                jasmine.clock().install();
                jasmine.clock().mockDate(new Date());

                mock$document[0].documentElement.style = [];
            });

            afterEach(function () {
                jasmine.clock().uninstall();
            });

            it('Should scroll.', function () {
                var ctrl = $componentController('carousel');

                ctrl.animationDuration = 2;

                ctrl.scrollTo(500);

                expect(mock$window.requestAnimationFrame).toHaveBeenCalled();

                jasmine.clock().tick(1);

                animationFrameCallback();

                expect(mock$element[0].scrollLeft).toEqual(62.5);

                expect(mock$window.requestAnimationFrame.calls.count()).toBe(2);
            });

            it('Should re-start auto watch on complete.', function () {
                var ctrl = $componentController('carousel', null, {
                    CarouselContainerController: {
                        setStatus: jasmine.createSpy()
                    }
                });

                spyOn(ctrl, 'autoAdvanceStart');

                ctrl.animationDuration = 1;

                ctrl.scrollTo(500);

                expect(mock$window.requestAnimationFrame).toHaveBeenCalled();

                jasmine.clock().tick(1);

                animationFrameCallback();

                expect(mock$element[0].scrollLeft).toEqual(500);

                expect(mock$window.requestAnimationFrame.calls.count()).toBe(1);

                expect(ctrl.autoAdvanceStart).toHaveBeenCalled();
            });

            it('Should cancel any existing scroll.', function () {
                var ctrl = $componentController('carousel');

                ctrl.scrollTo(500);

                ctrl.scrollTo(500);

                expect(mock$window.cancelAnimationFrame).toHaveBeenCalled();
            });

            it('Should not over scroll.', function () {
                var ctrl = $componentController('carousel', null, {
                    CarouselContainerController: {
                        setStatus: jasmine.createSpy()
                    }
                });

                ctrl.animationDuration = 1;

                ctrl.scrollTo(500);

                jasmine.clock().tick(2);

                animationFrameCallback();

                expect(mock$element[0].scrollLeft).toEqual(500);
            });
        });
    });

    describe('.scrollToIndex()', function () {
        var ctrl;

        beforeEach(function () {
            ctrl = $componentController('carousel', null, {
                slidesShown: 2
            });

            spyOn(ctrl, 'scrollTo');
        });

        it('Should scroll to specified index.', function () {
            ctrl.scrollToIndex(1);

            expect(ctrl.scrollTo).toHaveBeenCalledWith(1000);
        });

        it('Should clamp scroll to 0 when specified index is less than 0.', function () {
            ctrl.scrollToIndex(-1);

            expect(ctrl.scrollTo).toHaveBeenCalledWith(0);
        });

        it('Should clamp scroll to last item when index is greater than items.', function () {
            ctrl.scrollToIndex(5);

            expect(ctrl.scrollTo).toHaveBeenCalledWith(2000);
        });
    });

    describe('Bound and Watch Events', function () {
        var ctrl;

        beforeEach(function () {
            // Emulate all these without browser support
            mock$document[0].documentElement.style = [];

            ctrl = $componentController(
                'carousel',
                {
                    $scope: $rootScope
                }, {
                    CarouselContainerController: mockCarouselContainerController,
                    slidesShown: '2'
                }
            );

            ctrl.$postLink();
        });

        describe('Watch', function () {
            it('Should update items if they change after initialization.', function () {
                $rootScope.$digest();

                expect(mockCarouselContainerController.setItems).not.toHaveBeenCalled();

                mock$element[0].childElementCount = 5;

                $rootScope.$digest();

                expect(mockCarouselContainerController.setItems).toHaveBeenCalled();
            });
        });

        describe('.on(scroll)', function () {
            it('should scroll detect.', function () {
                mockElementEvents.scroll();
            });
            //suppressNextScroll need to scrollto then check it is suppressed by erm well shit
            //if (!touching && !scrolling) { do nothing
        });

        describe('.on(touchend)', function () {
            it('should scroll detect.', function () {
                mockElementEvents.touchend();

                $timeout.flush();
                // erm?
            });

            describe('Scrolls to nearest snap point', function () {
                beforeEach(function () {
                    jasmine.clock().install();
                    jasmine.clock().mockDate(new Date());
                });

                afterEach(function () {
                    jasmine.clock().uninstall();
                });

                it('Should scroll down when previous point is closer to resting position.', function () {
                    // Scroll to a mid point.
                    mock$element[0].scrollLeft = 100;

                    ctrl.animationDuration = 1;

                    mockElementEvents.touchend();

                    $timeout.flush();

                    expect(mock$element[0].scrollLeft).toBe(100);

                    jasmine.clock().tick(1);

                    animationFrameCallback();

                    expect(mock$element[0].scrollLeft).toBe(0);
                });

                it('Should scroll down when previous point is closer to resting position.', function () {
                    // Scroll to a mid point.
                    mock$element[0].scrollLeft = 600;

                    ctrl.animationDuration = 1;

                    mockElementEvents.touchend();

                    $timeout.flush();

                    expect(mock$element[0].scrollLeft).toBe(600);

                    jasmine.clock().tick(1);

                    animationFrameCallback();

                    expect(mock$element[0].scrollLeft).toBe(1000);
                });
            });
        });

        describe('.on(touchstart)', function () {
            it('should stop autoAdvance.', function () {
                spyOn(ctrl, 'autoAdvanceStop');

                mockElementEvents.touchstart();

                expect(ctrl.autoAdvanceStop).toHaveBeenCalled();
            });

            it('Should cancel any scrolling animation.', function () {
                ctrl.scrollTo(500);

                mockElementEvents.touchstart();

                expect(mock$window.cancelAnimationFrame).toHaveBeenCalled();
            });
        });
    });
});
