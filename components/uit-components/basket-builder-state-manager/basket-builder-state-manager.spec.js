describe('Customer plan component', function () {

    var $componentController;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('$onInit()', function () {

        it('should be in progress if there is device in session', function () {
            var mockSessionData =  [
                {
                    sectionType: 'device',
                    sectionRoute: 'device-route'
                }
            ];

            var component = $componentController('uitBasketBuilderStateManager', {
                StateManagement: {
                    getSessionData: function (){
                        return mockSessionData;
                    }
                },
                $state: {
                    go: function (sectionRoute) {
                        expect(sectionRoute).toEqual('device-route');
                    }
                }
            });

            component.sectionType = 'device';
            component.inProgressLabel = 'In progress';

            component.$onInit(mockSessionData);
            component.handleClick();

            expect(component.inProgress).toEqual('In progress');
        });

        it('should be not started if there is no device in session', function () {
            var mockSessionData =  [];
            var component = $componentController('uitBasketBuilderStateManager', {
                StateManagement: {
                    getSessionData: function (){
                        return mockSessionData;
                    }
                },
                $state: {
                    go: function (sectionRoute) {
                        expect(sectionRoute).toEqual('device-route-not-started');
                    }
                }
            });

            component.sectionType = 'device';
            component.inProgressLabel = 'In progress';
            component.ctaLink = 'device-route-not-started';

            component.$onInit(mockSessionData);
            component.handleClick();

            expect(component.inProgress).toEqual('');
        });
    });

});
