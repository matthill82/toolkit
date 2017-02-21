describe('resumeJourney', function () {

    var $componentController;

    beforeEach(angular.mock.module('uitoolkit'));
    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('$onInit()', function () {

        it('should populate empty session storage with resume section/route ', function () {

            var mockSessionData = null;

            var mockedStateManagementService = {
                getSessionData: function () {
                    return mockSessionData;
                },
                setResumeJourney: angular.noop
            };

            spyOn(mockedStateManagementService, 'setResumeJourney');

            var controller = $componentController('resumeJourney', {
                    StateManagement: mockedStateManagementService
                },
                {
                    sectionType: ['phone'],
                    sectionRoute: 'phone-route'
                });

            controller.$onInit();

            var expectedResponse = [
                {
                    sectionType: 'phone',
                    sectionRoute: 'phone-route'
                }
            ];

            expect(mockedStateManagementService.setResumeJourney).toHaveBeenCalledWith(expectedResponse);

        });

        it('should update existing session storage with resume section/route ', function () {

            var mockSessionData =  [
                {
                    sectionType: 'phone',
                    sectionRoute: 'phone-route'
                },
                {
                    sectionType: 'plan',
                    sectionRoute: 'plan-route'
                }
            ];

            var mockedStateManagementService = {
                getSessionData: function () {
                    return mockSessionData;
                },
                setResumeJourney: angular.noop
            };

            spyOn(mockedStateManagementService, 'setResumeJourney');

            var controller = $componentController('resumeJourney', {
                    StateManagement: mockedStateManagementService
                },
                {
                    sectionType: ['plan'],
                    sectionRoute: 'plan-route-updated'
                });

            controller.$onInit();

            var expectedResponse = [
                {
                    sectionType: 'phone',
                    sectionRoute: 'phone-route'
                },
                {
                    sectionType: 'plan',
                    sectionRoute: 'plan-route-updated'
                }
            ];

            expect(mockedStateManagementService.setResumeJourney).toHaveBeenCalledWith(expectedResponse);

        });

        it('should update existing session storage with resume section/route when not in array', function () {

            var mockSessionData =  [
                {
                    sectionType: 'phone',
                    sectionRoute: 'phone-route'
                }
            ];

            var mockedStateManagementService = {
                getSessionData: function () {
                    return mockSessionData;
                },
                setResumeJourney: angular.noop
            };

            spyOn(mockedStateManagementService, 'setResumeJourney');

            var controller = $componentController('resumeJourney', {
                    StateManagement: mockedStateManagementService
                },
                {
                    sectionType: ['plan'],
                    sectionRoute: 'plan-route-updated'
                });

            controller.$onInit();

            var expectedResponse = [
                {
                    sectionType: 'phone',
                    sectionRoute: 'phone-route'
                },
                {
                    sectionType: 'plan',
                    sectionRoute: 'plan-route-updated'
                }
            ];

            expect(mockedStateManagementService.setResumeJourney).toHaveBeenCalledWith(expectedResponse);

        });

        it('should take an array of section types and session storage correct data', function () {

            var mockSessionData =  [
                {
                    sectionType: 'phone',
                    sectionRoute: 'phone-route'
                },
                {
                    sectionType: 'plan',
                    sectionRoute: 'plan-route'
                }
            ];

            var mockedStateManagementService = {
                getSessionData: function () {
                    return mockSessionData;
                },
                setResumeJourney: angular.noop
            };

            spyOn(mockedStateManagementService, 'setResumeJourney');

            var controller = $componentController('resumeJourney', {
                    StateManagement: mockedStateManagementService
                },
                {
                    sectionType: ['plan', 'phoneAndPlan'],
                    sectionRoute: 'route-updated'
                });

            controller.$onInit();

            var expectedResponse = [
                {
                    sectionType: 'phone',
                    sectionRoute: 'phone-route'
                },
                {
                    sectionType: 'plan',
                    sectionRoute: 'route-updated'
                },
                {
                    sectionType: 'phoneAndPlan',
                    sectionRoute: 'route-updated'
                }
            ];

            expect(mockedStateManagementService.setResumeJourney).toHaveBeenCalledWith(expectedResponse);

        });

    });

});
