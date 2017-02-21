angular.module('uitoolkit')
.component('uitModal', {
    transclude: true,
    templateUrl: '/components/uit-components/modal/modal.html',
    bindings: {
        type: '<',
        params: '<',
        size: '<'
    }
});
