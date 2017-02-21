angular
    .module('uitoolkit')
    .component('pdfViewer', {
            bindings: {
                url: '@'
            },
            controller: 'PdfViewerController',
            templateUrl: '/components/ng-components/pdf-viewer/pdf-viewer.html'
        }
    );
