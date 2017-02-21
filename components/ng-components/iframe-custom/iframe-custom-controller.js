angular
    .module('uitoolkit')
    .controller('iframeCustomController', iframeCustomController);

/**
 *
 * @param $sce
 */
function iframeCustomController($sce) {
    var $ctrl = this;

    $ctrl.trustSrc = trustSrc;

    function trustSrc(src) {
        return $sce.trustAsResourceUrl(src);
    }
}
