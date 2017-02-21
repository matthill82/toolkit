angular.module('uitoolkit')
    .component('protectionTiles', {
        bindings: {
            logoUrl: '@ptLogoUrl',
            journeyType: '@ptJourneyType',
            displayType: '@ptDisplayType',
            dataType: '@ptDataType',
            ctaSelectedText: '@ptSelectedCtaText',
            ctaSelectText: '@ptSelectCtaText',
            hintIcon: '@ptHintIcon',
            hintModalCloseIcon: '@ptHintModalCloseIcon',
            hintModalTitle: '@ptHintModalTitle',
            hintModalUrl: '@ptHintModalUrl',
            hintModalsize: '@ptHintModalSize',
            importantInfoText: '@ptImportantInfoText',
            infoModalCloseIcon: '@ptInfoModalCloseIcon',
            infoModalTitle: '@ptInfoModalTitle',
            infoModalUrl: '@ptInfoModalUrl',
            infoModalsize: '@ptInfoModalSize',
            basketImage: '@ptBasketImage',
            basketText: '@ptBasketText',
            terms: '@ptTerms'
        },
        controller: 'ProtectionTilesController',
        templateUrl: '/components/ng-components/protection-tiles/protection-tiles.html'
    });
