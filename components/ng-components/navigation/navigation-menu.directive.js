angular.module('uitoolkit')
.animation('.slide', function() {
    var NG_HIDE_CLASS = 'ng-hide';
        
    return {
        beforeAddClass: function(element, className, done) {
            if(className === NG_HIDE_CLASS) {
                jQuery(element).slideUp(done);
            }
        },
        beforeRemoveClass: function(element, className, done) {
            if(className === NG_HIDE_CLASS) {
                  jQuery(element).slideDown(done);
            }
        }
}});
