describe('breadcrumb component', function () {
    var $componentController;
    var mock$state;
    var mockBreadcrumbs;
    var mockUtilityService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$state = {
            current: {
                name: 'route/4'
            },
            go: jasmine.createSpy()
        };

        mockBreadcrumbs = [
            {
                default: 'route/1',
                label: 'LABEL1',
                routes: ['route/1', 'route/2'],
                icon: 'icon1'
            }, {
                default: 'route/3',
                label: 'LABEL2',
                routes: ['route/3', 'route/4'],
                icon: 'icon2'
            }
        ];

        mockUtilityService = {
            pipeSeparatedList: function (string) {
                return string.split('||');
            }
        };

        spyOn(mockUtilityService, 'pipeSeparatedList').and.callThrough();

        module(function ($provide) {
            $provide.value('$state', mock$state);
            $provide.value('UtilityService', mockUtilityService);
        });
    });

    beforeEach(inject(function (_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('.$onInit()', function () {
        var ctrl;

        beforeEach(function () {
            ctrl = $componentController(
                'breadcrumb',
                null,
                {
                    defaults: 'route/1||route/3',
                    icons: 'icon1||icon2',
                    labels: 'LABEL1||LABEL2',
                    routes: 'route/1||route/2, route/3||route/4'
                }
            );

            ctrl.$onInit();
        });

        it('Should define breadcrumbs.', function () {
            expect(ctrl.breadcrumb).toEqual(mockBreadcrumbs);
        });

        it('Should set activeItemIndex.', function () {
            expect(ctrl.activeItemIndex).toEqual(1);
        });
    });

    describe('.goTo()', function () {
        var ctrl;

        beforeEach(function () {
            ctrl = $componentController('breadcrumb');

            ctrl.breadcrumb = mockBreadcrumbs;
        });

        it('Should go if less than or equal to', function () {
            ctrl.activeItemIndex = 1;

            ctrl.goTo(0);

            expect(mock$state.go).toHaveBeenCalled();
        });

        it('Should not go if greater than.', function () {
            ctrl.activeItemIndex = 1;

            ctrl.goTo(2);

            expect(mock$state.go).not.toHaveBeenCalled();
        });
    });
});
