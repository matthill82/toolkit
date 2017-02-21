/**
 * @example
 *  <title-component
 *      tc-tag="h1"
 *      tc-title="Design"           Title is the content and not a title attribute.
 *      tc-alignment="classname"    Note that alignment is actually just the class attribute.
 *  ></title-component>
 */
angular
    .module('uitoolkit')
    .component('titleComponent', {
        bindings: {
            tag: '@tcTag',
            title: '@tcTitle',
            alignment: '@tcAlignment'
        },
        templateUrl: '/components/ng-components/title-component/title-component.html'
    });
