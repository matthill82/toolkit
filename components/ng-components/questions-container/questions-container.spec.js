describe('Questions Container: ', function () {
    var $componentController;
    var ctrl;
    var mock$window;
    var mockQuestionsContainerService;
    var $rootScope;
    var mock$filter;
    var mock$state;
    var mockConfig;
    var mockStateManagement;
    var mockGetDataValue;


    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$window = {
            ENUMS: {
                EVENTS: {
                    RECEIVE: {
                        CLEAR_SESSION_DATA_CONTAINER: 'clear-session-data-container'
                    }
                }
            }
        };

        mockQuestionsContainerService = {
            updateLocalStorage: angular.noop
        };

        mock$filter = function () {
            return function (string) {
                return string;
            };
        };

        mock$state = {
            go: jasmine.createSpy()
        };

        mockConfig = {
            allowTransition: 'true',
            childReadOnly: 'false',
            closeModalIcon: 'cwsicon cwsicon-close',
            cta: 'device-selector',
            hintEnabled: 'false',
            hintIcon: 'cwsicon cwsicon-circle-info',
            hintToastText: 'Hint mode active',
            items: '[[{\\x22iconClass\\x22:\\x22cwsicon  cwsicon\\u0026#45;games\\x22,\\x22title\\x22:\\x22Games\\x22,\\x22image\\x22:\\x22\\x22,\\x22hint\\x22:\\x22\/content\/phonegap\/recommend\/en_gb\/overlay\\u0026#45;pages\/hints\/games.partials.html\\x22,\\x22features\\x22:[{\\x22attribute\\x22:\\x22Processor and Memory || RAM\\x22,\\x22rule\\x22:\\x22gte\\x22,\\x22value\\x22:\\x221\\x22}]},{\\x22iconClass\\x22:\\x22cwsicon  cwsicon\\u0026#45;camera\\x22,\\x22title\\x22:\\x22Camera\\x22,\\x22image\\x22:\\x22\\x22,\\x22hint\\x22:\\x22\/content\/phonegap\/recommend\/en_gb\/overlay\\u0026#45;pages\/hints\/camera.partials.html\\x22,\\x22features\\x22:[{\\x22attribute\\x22:\\x22Camera || Camera quality\\x22,\\x22rule\\x22:\\x22gte\\x22,\\x22value\\x22:\\x228\\x22},{\\x22attribute\\x22:\\x22device.manufacturer\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x22Apple\\x22}]},{\\x22iconClass\\x22:\\x22cwsicon  cwsicon\\u0026#45;music\\x22,\\x22title\\x22:\\x22Muisc\\x22,\\x22image\\x22:\\x22\\x22,\\x22hint\\x22:\\x22\/content\/phonegap\/recommend\/en_gb\/overlay\\u0026#45;pages\/hints\/music.partials.html\\x22,\\x22features\\x22:[{\\x22attribute\\x22:\\x22Music and entertainment || Music player\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x22T\\x22}]},{\\x22iconClass\\x22:\\x22cwsicon  cwsicon\\u0026#45;film\\x22,\\x22title\\x22:\\x22Tv \\u0026 Film\\x22,\\x22image\\x22:\\x22\\x22,\\x22hint\\x22:\\x22\/content\/phonegap\/recommend\/en_gb\/overlay\\u0026#45;pages\/hints\/film.partials.html\\x22,\\x22features\\x22:[{\\x22attribute\\x22:\\x22Connectivity || Internet data connection\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x22T\\x22},{\\x22attribute\\x22:\\x22Processor and Memory || RAM\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x221.5\\x22}]},{\\x22iconClass\\x22:\\x22cwsicon  cwsicon\\u0026#45;work\\x22,\\x22title\\x22:\\x22Work\\x22,\\x22image\\x22:\\x22\\x22,\\x22hint\\x22:\\x22\/content\/phonegap\/recommend\/en_gb\/overlay\\u0026#45;pages\/hints\/work.partials.html\\x22,\\x22features\\x22:[{\\x22attribute\\x22:\\x22Call || Speakerphone\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x22T\\x22},{\\x22attribute\\x22:\\x22Processor and memory || Processor speed\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x221.2\\x22}]},{\\x22iconClass\\x22:\\x22cwsicon  cwsicon\\u0026#45;social\\x22,\\x22title\\x22:\\x22Social\\x22,\\x22image\\x22:\\x22\\x22,\\x22hint\\x22:\\x22\/content\/phonegap\/recommend\/en_gb\/overlay\\u0026#45;pages\/hints\/social.partials.html\\x22,\\x22features\\x22:[{\\x22attribute\\x22:\\x22Connectivity || 4G\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x22T\\x22},{\\x22attribute\\x22:\\x22tariff.textAllowance.number\\x22,\\x22rule\\x22:\\x22gte\\x22,\\x22value\\x22:\\x22100\\x22},{\\x22attribute\\x22:\\x22tariff.offering.regularInstallmentAmount.net.value\\x22,\\x22rule\\x22:\\x22lte\\x22,\\x22value\\x22:\\x2230\\x22},{\\x22attribute\\x22:\\x22device.manufacturer\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x22Samsung\\x22}]},{\\x22iconClass\\x22:\\x22cwsicon cwsicon\\u0026#45;internet\\x22,\\x22title\\x22:\\x22Internet\\x22,\\x22image\\x22:\\x22\\x22,\\x22hint\\x22:\\x22\/content\/phonegap\/recommend\/en_gb\/overlay\\u0026#45;pages\/hints\/internet.partials.html\\x22,\\x22features\\x22:[{\\x22attribute\\x22:\\x22Connectivity || Internet data connection\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x22T\\x22},{\\x22attribute\\x22:\\x22tariff.dataAllowance.number\\x22,\\x22rule\\x22:\\x22gte\\x22,\\x22value\\x22:\\x22300\\x22}]},{\\x22iconClass\\x22:\\x22cwsicon  cwsicon\\u0026#45;group\\x22,\\x22title\\x22:\\x22Chat\\x22,\\x22image\\x22:\\x22\\x22,\\x22hint\\x22:\\x22\/content\/phonegap\/recommend\/en_gb\/overlay\\u0026#45;pages\/hints\/chat.partials.html\\x22,\\x22features\\x22:[{\\x22attribute\\x22:\\x22tariff.textAllowance.number\\x22,\\x22rule\\x22:\\x22gte\\x22,\\x22value\\x22:\\x22200\\x22},{\\x22attribute\\x22:\\x22tariff.talkAllowance.number\\x22,\\x22rule\\x22:\\x22gte\\x22,\\x22value\\x22:\\x22100\\x22}]}]]',
            modalType: 'info',
            questionId: '1',
            rememberState: 'true',
            title: 'Select Two Things You Regularly Use Your Phone For',
            transitionCount: '2'
        };

        mockStateManagement = {
            getData: function () {
                return mockGetDataValue;
            }
        };

        module(function ($provide) {
            $provide.value('$window', mock$window);
            $provide.value('QuestionsContainerService', mockQuestionsContainerService);
            $provide.value('$filter', mock$filter);
            $provide.value('$state', mock$state);
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
    }));

    describe('module:', function () {
        beforeEach(function () {
            mockGetDataValue = 'title1:::"feature1"|--|title2:::"feature2"';
        });

        it('should have methods defined', function () {
            ctrl = $componentController('questionsContainer');

            expect(ctrl.updateQuestionContainer).toBeDefined();
            expect(ctrl.isAnswerActive).toBeDefined();
            expect(ctrl.isMaximumSelected).toBeDefined();
            expect(ctrl.isHintAnswer).toBeDefined();
            expect(ctrl.changeHintMode).toBeDefined();
            expect(ctrl.closeModal).toBeDefined();
            expect(ctrl.setItems).toBeDefined();
            expect(ctrl.getActiveAnswers).toBeDefined();
        });

        it('should initialise with defaults', function () {
            ctrl = $componentController('questionsContainer', {$scope: $rootScope}, mockConfig);

            delete ctrl.cta;
            delete ctrl.modalType;
            delete ctrl.transitionCount;

            ctrl.$onInit();

            expect(ctrl.transitionCount).toBe(6);
            expect(ctrl.cta).toBe('home');
            expect(ctrl.modalType).toBe('info');
        });

        it('should initialise and retrieve questions from storage', function () {
            ctrl = $componentController('questionsContainer', {$scope: $rootScope}, mockConfig);

            expect(ctrl.selectedAnswers).toBe(undefined);

            ctrl.$onInit();

            expect(ctrl.selectedAnswers).toBe(2);

        });

        it('should listen for CLEAR_SESSION_DATA_CONTAINER event', function () {
            spyOn($rootScope, '$on');

            ctrl = $componentController('questionsContainer',{$scope: $rootScope});

            expect($rootScope.$on).toHaveBeenCalledWith(
                mock$window.ENUMS.EVENTS.RECEIVE.CLEAR_SESSION_DATA_CONTAINER,
                jasmine.any(Function)
            );
        });

        it('should reset on CLEAR_SESSION_DATA_CONTAINER event', function () {
            ctrl = $componentController('questionsContainer',{$scope: $rootScope}, {
                selectedAnswers: 999
            });
            expect(ctrl.selectedAnswers).toBe(999);

            $rootScope.$broadcast(mock$window.ENUMS.EVENTS.RECEIVE.CLEAR_SESSION_DATA_CONTAINER);

            $rootScope.$digest();

            expect(ctrl.selectedAnswers).toBe(0);
        });
    });

    describe('updateQuestionsContainer():', function () {
        beforeEach(function () {
            mockGetDataValue = null;
        });

        it('should initialise and call QuestionsContainerService service', function () {
            var mockParameters = {
                title: 'Tv \\u0026 Film',
                features: '[{\\x22attribute\\x22:\\x22Connectivity || Internet data connection\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x22T\\x22},{\\x22attribute\\x22:\\x22Processor and Memory || RAM\\x22,\\x22rule\\x22:\\x22eq\\x22,\\x22value\\x22:\\x221.5\\x22}]'
            };

            spyOn(mockQuestionsContainerService, 'updateLocalStorage');

            ctrl = $componentController('questionsContainer', {$scope: $rootScope}, mockConfig);

            ctrl.$onInit();

            ctrl.updateQuestionContainer(mockParameters);

            expect(mockQuestionsContainerService.updateLocalStorage)
                .toHaveBeenCalledWith('Tv\\u0026Film', mockParameters.features);
        });
    });

    describe('Modal:', function () {
        it('should close', function () {
            var e = {
                target: {
                    className: 'modal bootstrap-dialog fade in'
                }
            };

            ctrl = $componentController('questionsContainer', {$scope: $rootScope}, {
                modalOpen: true
            });

            ctrl.closeModal(e);

            expect(ctrl.modalOpen).toBeFalsy();

        });

        it('should not close', function () {
        var e = {
            target: {
                className: 'modal-dialog modal-lg type-normal'
            }
        };

        ctrl = $componentController('questionsContainer', {$scope: $rootScope}, {
            modalOpen: true
        });

        ctrl.closeModal(e);

        expect(ctrl.modalOpen).toBeTruthy();

    });
    });

    describe('Hint mode:', function () {
        it('should toggle', function () {
            ctrl = $componentController('questionsContainer');

            ctrl.changeHintMode();
            expect($rootScope.hintMode).toBeTruthy();
            ctrl.changeHintMode();
            expect($rootScope.hintMode).toBeFalsy();
            ctrl.changeHintMode();
            expect($rootScope.hintMode).toBeTruthy();
        });

        it('should open modal', function () {
        var qItems = [
            {
                title: 'title1',
                features: 'features1'
            }
        ];

        $rootScope.hintMode = true;

        ctrl = $componentController('questionsContainer',{$scope: $rootScope}, mockConfig);

        ctrl.$onInit();

        expect(ctrl.modalOpen).toBeFalsy();
        ctrl.updateQuestionContainer(qItems[0]);
        expect(ctrl.modalOpen).toBeTruthy();

        expect(ctrl.isHintAnswer(qItems[0].title)).toBeTruthy();
    });
    });

    describe('Maximum selected answers:', function () {
        it('should check if maximum selected questions has been reached', function () {
            ctrl = $componentController('questionsContainer');

            ctrl.selectedAnswers = 0;
            ctrl.transitionCount = 1;
            expect(ctrl.isMaximumSelected()).toBeFalsy();

            ctrl.selectedAnswers = 1;
            ctrl.transitionCount = 1;
            expect(ctrl.isMaximumSelected()).toBeTruthy();


            ctrl.selectedAnswers = 1;
            ctrl.transitionCount = 6;
            expect(ctrl.isMaximumSelected()).toBeFalsy();

            ctrl.selectedAnswers = 6;
            ctrl.transitionCount = 6;
            expect(ctrl.isMaximumSelected()).toBeTruthy();

            ctrl.selectedAnswers = 8;
            ctrl.transitionCount = 6;
            expect(ctrl.isMaximumSelected()).toBeTruthy();
        });

        it('should redirect if the maximum selected answers has been reached', function () {
            var qItems = [
                {
                    title: 'title1',
                    features: 'features1'
                },
                {
                    title: 'title2',
                    features: 'features2'
                }
            ];

            ctrl = $componentController('questionsContainer',{$scope: $rootScope}, mockConfig);

            ctrl.$onInit();

            ctrl.selectedAnswers = 0;
            ctrl.transitionCount = 2;

            expect(ctrl.isAnswerActive(qItems[0])).toBeFalsy();

            ctrl.updateQuestionContainer(qItems[0]);
            expect(ctrl.selectedAnswers).toBe(1);
            expect(mock$state.go).not.toHaveBeenCalled();
            expect(ctrl.isAnswerActive(qItems[0])).toBeTruthy();
            expect(ctrl.isAnswerActive(qItems[1])).toBeFalsy();

            ctrl.updateQuestionContainer(qItems[0]);
            expect(ctrl.selectedAnswers).toBe(0);
            expect(mock$state.go).not.toHaveBeenCalled();
            expect(ctrl.isAnswerActive(qItems[0])).toBeFalsy();

            ctrl.updateQuestionContainer(qItems[0]);
            expect(ctrl.selectedAnswers).toBe(1);
            expect(mock$state.go).not.toHaveBeenCalled();
            expect(ctrl.isAnswerActive(qItems[0])).toBeTruthy();
            expect(ctrl.isAnswerActive(qItems[1])).toBeFalsy();


            ctrl.updateQuestionContainer(qItems[1]);
            expect(ctrl.selectedAnswers).toBe(2);
            expect(mock$state.go).toHaveBeenCalled();
            expect(ctrl.isAnswerActive(qItems[0])).toBeTruthy();
            expect(ctrl.isAnswerActive(qItems[1])).toBeTruthy();
        });

        it('should not redirect if the maximum selected answers has been reached if allowTransition is false', function () {
            var qItems = [
                {
                    title: 'title1',
                    features: 'features1'
                },
                {
                    title: 'title2',
                    features: 'features2'
                }
            ];

            mockConfig.allowTransition = 'false';

            ctrl = $componentController('questionsContainer',{$scope: $rootScope}, mockConfig);

            ctrl.$onInit();

            ctrl.selectedAnswers = 1;

            expect(ctrl.allowTransition).toBeFalsy();

            ctrl.updateQuestionContainer(qItems[0]);
            expect(mock$state.go).not.toHaveBeenCalled();
        });
    });

});
