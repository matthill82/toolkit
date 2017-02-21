angular
    .module('uitoolkit')
    .controller('HttpLoggerViewerController', HttpLoggerViewerController);

/**
 * @param {HttpLoggerService} HttpLoggerService
 * @constructor
 */
function HttpLoggerViewerController(HttpLoggerService) {
    var $ctrl = this;
    var _orderBy;

    $ctrl.filter = {};
    $ctrl.isEnabled = HttpLoggerService.isEnabled();
    $ctrl.log = HttpLoggerService.get();

    $ctrl.getResponseTimeType = getResponseTimeType;
    $ctrl.setUrlFilter = setUrlFilter;

    // Magic orderBy property, alternates between value, -value and undefined.
    Object.defineProperty($ctrl, 'orderBy', {
        get: function () {
            return _orderBy;
        },
        set: function (value) {
            if (_orderBy === value) {
                _orderBy = '-' + value;
            } else if (_orderBy === '-' + value) {
                _orderBy = undefined;
            } else {
                _orderBy = value;
            }
        }
    });

    /**
     * @param {object} log
     * @returns {string}
     */
    function getResponseTimeType(log) {
        if (log.status !== 200 || log.time > 500) {
            return 'danger';
        } else if (log.time > 200) {
            return 'warn';
        } else if (log.time > -1) {
            return 'fine';
        }

        return '';
    }

    /**
     * Filter down by this log item, first by its hostname then add its
     * pathname, then reset.
     *
     * @param {object} log
     */
    function setUrlFilter(log) {
        if (log) {
            if ($ctrl.filter.hostname === log.hostname) {
                // Remove if pathname matches, add pathname if not.
                if ($ctrl.filter.pathname === log.pathname) {
                    $ctrl.filter.hostname = undefined;
                    $ctrl.filter.pathname = undefined;
                } else {
                    $ctrl.filter.pathname = log.pathname;
                }
            } else {
                $ctrl.filter.hostname = log.hostname;
            }
        } else {
            $ctrl.filter.hostname = undefined;
            $ctrl.filter.pathname = undefined;
        }
    }
}
