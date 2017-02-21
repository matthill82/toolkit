/**
 * @example
 * <basket-builder-device></basket-builder-device>
 */
angular.module('uitoolkit')
    .component('uitBasketBuilderDevice', {
        templateUrl: '/components/uit-components/basket-builder-device/basket-builder-device.html',
        controller: 'BasketBuilderDeviceController',
        bindings: {
            propositions: '@',
            difJourneyType: '@',
            numberFeatureIcons: '@',
            buttonLabel: '@',
            buttonLabelActive: '@',
            buttonActiveIcon: '@',
            detailsIcon: '@',
            detailsLabel: '@',
            detailsLink: '@',
            editLabel: "@",
            editIcon: '@',
            editLink: '@',
            panelOpen: '<',
            disabledState: '<',
            notStartedLabel: '@',
            ctaLink: '@',
            inProgressLabel: '@',
            sectionType: '@',
            imageLink: '@',
            imeiLink: '@'
        }
    });


