angular.module('uitoolkit')
    .controller('SwiperGridController', SwiperGridController);

function SwiperGridController() {
    var $ctrl = this;
    var dividerSymbol = '||';

    $ctrl.noCourses = [];

    $ctrl.filterCategories = $ctrl.filterCategoriesString.split(dividerSymbol);

    $ctrl.hintContentUrl = $ctrl.hintContentUrlString.split(dividerSymbol);
    $ctrl.hintModalTitle = $ctrl.hintModalTitleString.split(dividerSymbol);
    $ctrl.hintModalSize = $ctrl.hintModalSizeString.split(dividerSymbol);
}

