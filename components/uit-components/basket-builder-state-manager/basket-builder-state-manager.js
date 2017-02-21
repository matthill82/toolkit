/**
 * @example
 * <uit-basket-builder-state-manager
 *     text-not-started="Find your perfect phone"
 *     in-progress-label="In progress"
 *     sectionType="device"
 *     CTA-link="#"
 *     disabled-state=false
 * ></uit-basket-builder-state-manager>
 */

angular.module('uitoolkit')
    .component('uitBasketBuilderStateManager', {
        templateUrl: '/components/uit-components/basket-builder-state-manager/basket-builder-state-manager.html',
        controller: 'UitBasketBuilderStateManagerController',
        bindings: {
            notStartedLabel: '@',
            inProgressLabel: '@',
            sectionType: '@',
            ctaLink: '@',
            disabledState: '<'
        }
    });
