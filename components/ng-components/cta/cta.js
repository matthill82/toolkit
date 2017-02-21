/**
 * @example
 *  <cta
 *      cta-button-alignment="text-right" // css_class
 *      cta-button-direction="next"       // [back|next|'']
 *      cta-button-label="Next"           // label
 *      cta-button-path="/welcome"        // state_name
 *      cta-button-use-previous           // Fires history.back()
 *  ></cta>
 */
angular
    .module('uitoolkit')
    .component('cta', {
        bindings: {
            alignment: '@ctaButtonAlignment',
            direction: '@ctaButtonDirection',
            label: '@ctaButtonLabel',
            link: '@ctaButtonPath',
            usePrevious: '@ctaButtonUsePrevious'
        },
        controller: 'CtaController',
        templateUrl: '/components/ng-components/cta/cta.html'
    });
