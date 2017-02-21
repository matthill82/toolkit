angular.module('uitoolkit')
    .controller('RichTextController', RichTextController);

function RichTextController() {

    'use strict';

    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.showHiddenContent = showHiddenContent;

    function $onInit() {
        $ctrl.showMoreContent = false;
    }

    function showHiddenContent() {
        $ctrl.showMoreContent = true;
    }

}

