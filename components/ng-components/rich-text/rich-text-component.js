/**
 * usage: <rich-text
 * rt-initial-height="300px"
 * rt-feature="true || false"
 * rt-read-more="{typeOf} String">
 * </rich-text>
 *
 * configuration : height
 * configuration : text of label
 * configuration : featured class
 */

angular.module('uitoolkit')
    .component('richText', {
        bindings: {
            initialHeight: '@rtInitialHeight',
            readMore: "@rtReadMore",
            childClass: '@rtChildClass'
        },
        replace: true,
        transclude: true,
        templateUrl: '/components/ng-components/rich-text/rich-text.html',
        controller: 'RichTextController'
    });

