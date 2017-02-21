angular
    .module('uitoolkit')
    .run(function ($q, $urlRouter, ConfigService, JrdService, RouteConfigFactory) {
        $q.all([
            RouteConfigFactory(app.stateProvider, app.urlRouterProvider),
            ConfigService.loadConfigFromAttribute(),
            JrdService.init()
        ]).then(function () {
            $urlRouter.sync();
            $urlRouter.listen();
        });
    });
