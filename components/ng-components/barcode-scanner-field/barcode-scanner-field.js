angular.module('uitoolkit')
    .component('barcodeScannerField', {
        bindings: {
            model: '='
        },
        controller: 'BarcodeScannerFieldController',
        templateUrl: '/components/ng-components/barcode-scanner-field/barcode-scanner-field.html'
    });
