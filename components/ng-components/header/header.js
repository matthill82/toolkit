angular
    .module('uitoolkit')
    .component('header', {
        bindings: {
            avatarMsg: '@headerAvatarMsg',
            burgerIcon: '@headerBurgerIcon',
            clearModalMsg: '@headerClearModalMsg',
            clearModalNoLabel: '@headerClearModalNoLabel',
            clearModalTitle: '@headerClearModalTitle',
            clearModalYesLabel: '@headerClearModalYesLabel',
            defaultAvatar: '@headerDefaultAvatar',
            headerClass: '@headerClass',
            headerTemplate: '@headerTemplate',
            hideAvatars: '@headerHideAvatars',
            homePageLink: '@headerHomePageLink',
            isModalHidden: '@headerHideModal',
            logoImg: '@headerLogoImg',
            useAvatars: '@headerUseAvatars',
            basketIcon: '@headerBasketIcon',
            basketLink: '@headerBasketLink',
            storeLabel: '@headerStoreLabel'
        },
        controller: 'HeaderController',
        templateUrl: '/components/ng-components/header/header.html'
    });
