
angular.module('uitoolkit')
    .controller('IsiteVideoController', IsiteVideoController);

function IsiteVideoController($document, $sce, $scope) {
    var $ctrl = this;

    $ctrl.givenUrl =  $sce.trustAsResourceUrl($ctrl.srcUrl);


    //If the video plays on fullscreen and you press the device back button -> exit fullscreen
    $scope.$on('$stateChangeStart', function (event) {
        if ($document[0].webkitFullscreenElement) {
            event.preventDefault();
            $document[0].webkitExitFullscreen();
        }
    });

}
