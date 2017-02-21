/*global angular, beforeEach, describe, expect, inject, it, module*/
describe("RichText", function () {

    beforeEach(angular.mock.module('uitoolkit'));

    var controller,
    scope;

    beforeEach(angular.mock.inject(function ($componentController, $rootScope) {
        scope = $rootScope.$new();
        controller = $componentController('richText', {$scope: scope}, {initialHeight: '', readMore: '', childClass: ''});
    }));

    describe('bindings', function () {

        it('should be attached to the scope', function() {
            expect(scope.$ctrl).toBe(controller);
        });

        it("should accept a height", function () {
            controller.initialHeight = '600px';

            expect(controller.initialHeight).toBeDefined();
            expect(controller.initialHeight).toEqual('600px');

            controller.initialHeight = '400px';
            expect(controller.initialHeight).toEqual('400px');
        });

        it("should have a label text", function () {
            controller.readMore = 'Read More';

            expect(controller.readMore).toBeDefined();
            expect(controller.readMore).toEqual('Read More');
        });

        it("should have a true or false", function () {
            controller.childClass = "feature";

            expect(controller.childClass).toBeDefined();
            expect(controller.childClass).toEqual("feature");
        });
    });

    describe('.$onInit()', function () {

        it('should set a value to false', function () {

            controller.$onInit();

            expect(controller.showMoreContent).toBe(false);
        });
    });

});
