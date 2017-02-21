angular
    .module('uitoolkit')
    .controller('PdfViewerController', PdfViewerController);

/**
 * @param {$rootScope.Scope} $scope
 * @constructor
 */
function PdfViewerController($scope) {

    // TODO - this is a limitation of the angular plugin to interface with pdf.js, ideally build our own implementation.
    $scope.pdfUrl = this.url;
}
