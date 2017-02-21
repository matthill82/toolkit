angular
    .module('uitoolkit')
    .config(function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, config){
        if (config.wcm_mode !== 'EDIT' && config.wcm_mode !== 'DESIGN') { //check both versions (for aem)
            //HR-775 - remove rootpath / base href requirement for phonegap
            $locationProvider.html5Mode({requireBase: false});
        }

        app.stateProvider     = $stateProvider;
        app.urlRouterProvider = $urlRouterProvider;

        $httpProvider.defaults.withCredentials = true;
    });
