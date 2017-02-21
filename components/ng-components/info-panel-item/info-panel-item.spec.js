describe('directive: panel-item', function () {
    var element, scope;

    beforeEach(module('uitoolkit'));

    beforeEach(module('/components/ng-components/info-panel-item/info-panel-item.html'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();

        element = '<info-panel-item pnl-spacing="{{spacing}}" pnl-title="{{title}}" pnl-theme="{{theme}}" pnl-icon="{{icon}}" pnl-colour="{{colour}}" pnl-text="{{text}}"></info-panel-item>';

        scope.title = '1. About You';
        element = $compile(element)(scope);
        scope.$digest();


    }));


    it('should create a title for the panel-item....', function () {
        var titles = element.find('.info-panel-item--title');

        expect(titles.length).toBe(1);
        expect(titles.eq(0).text()).toBe('1. About You');
    });


    it('should applied template....', function () {
        expect(element.html()).not.toEqual('');
    });
});

