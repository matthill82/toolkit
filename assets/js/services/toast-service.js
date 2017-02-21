angular
    .module('uitoolkit')
    .service('ToastService', ToastService);

/**
 *
 * @param $rootScope
 * @param EventEnums
 * @constructor
 */
function ToastService($rootScope, EventEnums) {

    this.error = error;
    this.show = show;
    this.warn = warn;

    /**
     * 
     * @param type
     * @param title
     * @param message
     * @param options
     */
    function show(type, title, message, options) {
        options = options || {};

        $rootScope.$broadcast(EventEnums.ENUMS.SHOW_TOAST, {
            type: type,
            msg: message,
            title: title,
            options: options
        });
    }


    /**
     *
     * @param title
     * @param message
     * @param options
     */
    function error(title, message, options) {
        show('error', title, message, options);
    }


    /**
     *
     * @param title
     * @param message
     * @param options
     */
    function warn(title, message, options) {
        show('warning', title, message, options);
    }
}
