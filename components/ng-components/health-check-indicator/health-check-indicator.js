/**
 * Configuration:
 *  - level
 *      - danger
 *      - warn
 *      - fine
 *
 * @example
 *  <health-check-indicator
 *      level="danger"
 *  ></health-check-indicator>
 */
angular
    .module('uitoolkit')
    .component('healthCheckIndicator', {
        bindings: {
            level: '<'
        },
        template: '<div class="health-check-indicator health-check-indicator-{{ $ctrl.level }}"></div>'
    });
