angular
    .module('uitoolkit')
    .directive('deviceCarousel', deviceCarouselDirective);

function deviceCarouselDirective() {
    return {
        scope: true,
        replace: true,
        templateUrl: '/components/ng-components/device-carousel/device-carousel.html',
        link: function (scope, element, attr) {
            scope.hideColorOptions = attr.drcHideColorOptions;
            scope.slidesToShow = attr.drcSlidesToShow;
            scope.slidesToScroll = attr.drcSlidesToScroll;
            scope.isCompare = attr.drcIsCompare;
            scope.deviceSwatchText = attr.drcDeviceSwatchText;
            scope.buttonLeftIcon = attr.drcButtonLeftIcon;
            scope.buttonRightIcon = attr.drcButtonRightIcon;
            scope.viewDetailsText = attr.drcViewDetailsText;
            scope.redirectUrl = attr.drcRedirectUrl;
            scope.addToCompareActive = attr.drcAddToCompareActive;
            scope.addToCompareInactive = attr.drcAddToCompareInactive;
            scope.removeCompareIcon = attr.drcRemoveCompareIcon;
            scope.noResultsMsg = attr.drcNoResultsMsg;
            scope.compareTitle = attr.drcCompareTitle;
            scope.compareResultsPath = attr.drcCompareResultsPath;
            scope.compareResultsPathLabel = attr.drcCompareResultsPathLabel;
            scope.isComparePage = scope.isComparePage = isComparePage;
            scope.deviceCategory = attr.drcDeviceCategory;
            scope.planType = attr.drcPlanType;
            scope.useQuestions = attr.drcUseQuestions;

            scope.getTimes = getTimes;
            scope.initOnload = false;


            scope.setPromotedDeviceConfig(scope.deviceCategory, attr.drcPromotedDeviceIndex);


            function isComparePage(isCompare) {
                return scope.isCompare === isCompare;
            }

            function getTimes() {
                var slidesToShowAsInt = parseInt(scope.slidesToShow);

                return new Array(slidesToShowAsInt);
            }
        }
    };
}
