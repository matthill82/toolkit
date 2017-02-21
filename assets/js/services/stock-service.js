angular
    .module('uitoolkit')
    .service('StockService', StockService);

/**
 * @param {$http} $http
 * @param {$q} $q
 * @param {$rootScope.Scope} $rootScope
 * @param {$window} $window
 * @param {EventApiService} EventApiService
 * @param {ToastService} ToastService
 * @param {UserService} UserService
 * @param config
 * @constructor
 */
function StockService ($http, $q, $rootScope, $window, EventApiService, ToastService, UserService, config) {
    var listenerOpen;
    var stock = {};
    var DEVICE_STOCK_WS_EVENT = 'device:stock';

    this.getStockForLocationAndIds = getStockForLocationAndIds;
    this.listenForStock = listenForStock;


    /**
     *
     * @param productId
     * @returns {{}}
     */
    function listenForStock (productId) {
        if (!listenerOpen) {
            openListener();
        }

        if (angular.isUndefined(stock[productId])) {
            stock[productId] = null;
            EventApiService.send({
                ws_channel: DEVICE_STOCK_WS_EVENT,
                data: {
                    productId: productId
                }
            });
        }

        return stock;
    }

    /**
     *
     */
    function openListener () {
        var locationId = UserService.getLocation();

        EventApiService.onMessage(function (message) {

            var device = angular.fromJson(message.data).data.device;

            var stockMatch = device.location.find(function (stockItem) {
                // find entry for locationId and only save that
                return stockItem.id === locationId;
            }, this);

            stock[device.id] = stockMatch.quantity;

        }, new RegExp(DEVICE_STOCK_WS_EVENT));

        listenerOpen = true;
    }


    /**
     * @param {Number} locationId
     * @param {Number[]|Number} deviceIds Array of device IDs or single device ID.
     * @returns {Promise}
     */
    function getStockForLocationAndIds (locationId, deviceIds) {
        var postData;

        if (!angular.isArray(deviceIds)) {
            deviceIds = [deviceIds];
        }

        postData = {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                'device.location.id': locationId
                            }
                        }
                    ],
                    filter: {
                        terms: {
                            'device.id': deviceIds
                        }
                    }
                }
            },
            size: deviceIds.length
        };

        if (config && !config.stock_url) {
            $q.reject('A url have not been provided.')
        }

        return $http({
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            url: config.stock_url,
            data: postData,
            params: {
                action: 'post'
            }
        }).then(_handleSuccess, _handleError);
    }

    function _handleSuccess (response) {
        // I transform the successful response, unwrapping the application data
        // from the API response payload.

        if (response.status === 200) {
            return $q.resolve(response.data);
        } else {
            return $q.reject(response && response.statusText ?
                response.statusText :
                'The stock service was unable to respond correctly. Error: ', response.statusText);
        }
    }

    function _handleError (response) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (!angular.isObject(response.data) || !response.data.message) {
            ToastService.error('Error loading Stock ', 'An unknown error occurred.', { timeOut: 2000 });

            return ($q.reject('An unknown error occurred.'));
        }

        // Otherwise, use expected error message.
        ToastService.error('Error loading Stock ', 'Stock could not be loaded', { timeOut: 5000 });

        return ($q.reject(response.data.message));
    }
}
