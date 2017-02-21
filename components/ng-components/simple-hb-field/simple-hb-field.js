/**
 * @example
 *  <simple-hb-field
 *      node-name="account.pin"
 *  ></simple-hb-field>
 */
angular
    .module('uitoolkit')
    .component('simpleHbField', {
        bindings: {
            nodeName: '@'
        },
        controller: 'SimpleHbFieldController',
        template: '<div hb-node="$ctrl.node" hb-field="$ctrl.node"></div>'
    });
