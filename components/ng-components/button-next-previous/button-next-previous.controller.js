angular
    .module('uitoolkit')
    .controller('ButtonNextPreviousController', ButtonNextPreviousController);

function ButtonNextPreviousController($state) {
    var $ctrl = this;

    $ctrl.goToPage = goToPage;
    $ctrl.$onInit = onInit;

    function onInit() {
        $ctrl.xOffsetStyle = 'top:' +  $ctrl.xOffset +  'px';
        $ctrl.iconStyle = 'font-size:' + $ctrl.iconSize + 'px';
    }

    function goToPage() {
        $state.go($ctrl.path.replaceHTMLSuffix());
    }
}
