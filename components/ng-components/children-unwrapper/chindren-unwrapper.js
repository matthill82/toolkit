/**
 * @example
 *  <div children-unwrap>
 *      ...
 *  </div>
 */
angular
    .module('uitoolkit')
    .directive('childrenUnwrap', function () {
        return {
            link: function (scope, element) {
                var children = element.children();
                var targetCssClass = 'section';

                angular.forEach(children, function (child) {
                    var $elm = angular.element(child);
                    var descendant;

                    if ($elm.hasClass(targetCssClass)) {
                        $elm.replaceWith(child.childNodes);
                    } else {
                        descendant = child.querySelectorAll('.' + targetCssClass);

                        if (descendant.length) {
                            $elm.replaceWith(descendant[0].childNodes);
                        }
                    }
                });
            }
        };
    });
