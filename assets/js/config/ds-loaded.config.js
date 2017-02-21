angular
    .module('uitoolkit')
    .config(function ($windowProvider) {
        $windowProvider.$get().dsLoaded = angular.noop;
    });
