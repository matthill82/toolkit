/**
 * Device Icon Features
 *
 * Config
 *  - dif-display: Rows to display
 *  - dif-features: Feature list to generate mapping
 *  - dif-journey-type: journey type
 *
 * @example
 *  <device-icon-features
 *      dif-display="3"
 *      dif-features="Search Attribute::Processor||Search Attribute::Memory||Search Attribute::Storage type||Search Attribute::Storage capacity||Search Attribute::Touchscreen||Search Attribute::Graphics"
 *      dif-journey-type="WINDOWS DESKTOPS"
 *  ></device-icon-features>
 */
angular
    .module('uitoolkit')
    .component('deviceIconFeatures', {
        bindings: {
            align: '@difAlign',
            display: '@difDisplay',
            featureList: '@difFeatures',
            journeyType: '@difJourneyType',
            numberFeatureIcons: '<'
        },
        controller: 'DeviceIconFeaturesController',
        templateUrl: '/components/ng-components/device-icon-features/device-icon-features.html'
    });
