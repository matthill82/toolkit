/**
 * @example
 *  <simple-hb-submit
 *      fallback
 *      text="Submit"
 *  ></simple-hb-submit>
 */
angular
    .module('uitoolkit')
    .component('simpleHbSubmit', {
        bindings: {
            fallback: '@',
            hidden: '@',
            text: '@',
            triggerEvent: '@'
        },
        controller: 'SimpleHbSubmitController',
        template: '<ng-switch on="$ctrl.triggerEvent ? \'EVENT\' : \'SUBMIT\'">\
                <input ng-switch-when="EVENT" class="btn simpleHbSubmit" ng-if="$ctrl.display" type="submit" value="{{ :: $ctrl.text }}" ng-click="$ctrl.submit($event)">\
                <input ng-switch-when="SUBMIT" class="btn simpleHbSubmit" ng-if="$ctrl.display" type="submit" value="{{ :: $ctrl.text }}">\
            </ng-switch>'
    });
