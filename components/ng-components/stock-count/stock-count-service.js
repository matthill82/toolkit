angular
    .module('uitoolkit')
    .service('StockCountService', StockCountService);

/**
 * @param {ConfigService} ConfigService
 * @param {StockService} StockService
 * @constructor
 */
function StockCountService (ConfigService, StockService) {
    var config = ConfigService.get('stock');
    var locationId;

    this.getStock = getStock;
    this.stockCountDecorator = stockCountDecorator;

    function getStock (locateId, productId) {
        locationId = locateId;

        return StockService.getStockForLocationAndIds(locationId, productId.toString())
            .then(successGetStock, errorGetStock);
    }

    function successGetStock (data) {
        var i;
        var locations;
        var matchQuantity;

        if (data && data.queryResult.length && data.queryResult[0].device.location.length) {
            locations = data.queryResult[0].device.location;

            // We have all locations for the product, find just the one we are looking for.
            for (i = 0; i < locations.length; i++) {
                if (locations[i].id === locationId) {
                    matchQuantity = locations[i].quantity;
                    break;
                }
            }
        }

        return matchQuantity;
    }

    function errorGetStock (error) {
        console.log('StockService, getStock', error);
    }

    function stockCountDecorator (amount) {
        if (angular.isDefined(amount) && amount > parseInt(config.threshold)) {
            return config.availableText
                + ' '
                + config.threshold.toString()
                + config.extraSign;
        }

        return config.unavailableText;
    }
}
