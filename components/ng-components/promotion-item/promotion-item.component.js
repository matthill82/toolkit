angular.module('uitoolkit')
    .component('promotionItem', {
        bindings: {
            promotionImagePath: '@piImagePath',
            promotionTitle: '@piTitle',
            promotionOfferTitle: '@piOfferTitle',
            primotionOfferText: '@piOfferText'
        },
        controller: 'PromotionItemController',
        controllerAs: 'PromotionItemController',
        templateUrl: '/components/ng-components/promotion-item/promotion-item.html'
    });
