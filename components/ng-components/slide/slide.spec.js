/**
 * Created by matthew on 09/01/2017.
 */
describe('Slide', function () {

    beforeEach(module('uitoolkit'));

    var scope,
        compile,
        element,
        elementString;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        compile = $compile;

        elementString = '<slide image-src="slide_carosel_image1.jpg" image-index="0" indicator-theme="light"></slide>';

        element = $compile(elementString)(scope);
    }));
});
