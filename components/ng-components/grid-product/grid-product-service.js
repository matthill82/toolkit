angular
    .module('uitoolkit')
    .service('GridProductService', GridProductService);

/**
 * @param $filter
 * @param $q
 * @param {function=BasketAttachment} BasketAttachment
 * @param {BasketService} BasketService
 * @param {DeviceHelperService} DeviceHelperService
 * @param {DeviceService} DeviceService
 * @param JrdService
 * @param {StateManagement} StateManagement
 * @constructor
 */
function GridProductService(
    $filter,
    $q,
    BasketAttachment,
    BasketService,
    DeviceHelperService,
    DeviceService,
    JrdService,
    StateManagement
) {
    var productsArray = [];
    var RESULT_MAX_SIZE = 6;
    var PAGE_TYPE_DEAL = 'deals';
    var PAGE_TYPE_SKU = 'sku-mapper';
    var OFFERINGTYPE = 'fullPrice';

    this.isSelected = isSelected;
    this.select = select;
    this.getProductsById = getProductsById;
    this.loadProductsFromJson = loadProductsFromJson;

    /**
     * @param product
     * @param {string} pageType
     * @returns {boolean}
     */
    function isSelected(product, pageType) {
        if (pageType.indexOf(PAGE_TYPE_DEAL) > -1) {
            // Deal page goes through to the recommendations page so you never
            // see the button in a selected state.
            return false;
        } else if (pageType.indexOf(PAGE_TYPE_SKU) > -1) {
            return !!BasketService.getBasket().findAttachmentById(product.id.toString());
        }
    }

    /**
     * @param {object} product
     * @param {string} pageType
     * @param {string} redirectUrl
     * @param {string} displayType
     */
    function select(product, pageType, redirectUrl, displayType) {
        if (pageType.indexOf(PAGE_TYPE_DEAL) > -1) {
            DeviceHelperService.goToDevice(product, redirectUrl);
        } else if (pageType.indexOf(PAGE_TYPE_SKU) > -1) {
            _selectProductToggleBasket(product, displayType);
        }
    }

    /**
     * @param {string} productIds Comma separated list of product ids.
     * @returns {*}
     */
    function getProductsById(productIds) {
        productsArray = productIds.split(',');

        return DeviceService.findProductsByName(productsArray)
            .then(function (response) {
                return _applyDataSorted(response);
            });
    }

    /**
     * @param {string} journey
     * @param {string} pageType
     * @returns {*}
     */
    function loadProductsFromJson(journey, pageType) {
        var skuMapBySku = [];
        var skuMapByCategories = [];
        var cat1;
        var cat2;
        var deviceId = StateManagement.getDevice('device');
        var mappings = JrdService.get(journey, pageType);
        var regexp = /^"?(.+?)"?$/;
        var i;

        if (!mappings || !mappings.length) {
            return $q.reject();
        }

        deviceId = deviceId.replace(regexp, '$1');

        // mapToSKU  - device ID
        // targetSKU - keyboard/monitor ID
        for (i = 0; i < mappings.length; i++) {
            // Find direct mappings
            if (mappings[i].mapToSKU === deviceId) {
                skuMapBySku.push(mappings[i].targetSKU);
            }
        }

        if (skuMapBySku.length) {
            return  _getResults(skuMapBySku, null, null, RESULT_MAX_SIZE);
        }

        // Try mappings by category1&2
        return DeviceService.elasticQuery({query:[{'device.id':deviceId}]})
            .then(function (data) {
                if (data.queryResult && data.queryResult.length) {
                    cat1 = data.queryResult[0].device.category1;
                    cat2 = data.queryResult[0].device.category2;

                    for (i = 0; i < mappings.length; i++) {
                        // find direct mappings
                        if (mappings[i].category1 === cat1 && mappings[i].category2 === cat2 ) {
                            skuMapByCategories.push(mappings[i].targetSKU);
                        }
                    }

                    if (skuMapByCategories.length) {
                        return _getResults(skuMapByCategories, null, null, RESULT_MAX_SIZE);
                    }
                }

                return $q.reject('EMPTY');
            });
    }

    /**
     * @param {object} results
     * @param {number=} maxSize
     * @returns {Array}
     * @private
     */
    function _applyData(results, maxSize) {
        var productsList = [];
        var buckets = results.aggregations.devices.buckets;

        if (results.aggregations.devices.buckets.length) {
            buckets.forEach(function (bucket) {
                if (!maxSize || productsList.length < maxSize) {
                    productsList.push(bucket.item.hits.hits[0]._source);
                }
            });
        }

        return productsList;
    }

    function _applyDataSorted(response) {
        return _sortArrayByArray(_applyData(response), productsArray);
    }

    function _cleanArray(actual) {
        var newArray = [];
        var i;

        for (i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }

        return newArray;
    }

    /**
     * @param {object} product
     * @param {string} displayType
     * @private
     */
    function _constructBasketAttachment(product, displayType) {
        var offering;
        var saving = 0;

        offering = product.offering && product.offering.find(function (offering) {
            return offering.offeringType === OFFERINGTYPE;
        });

        if (offering && offering.previousUpfrontPrice && offering.upfrontPrice) {
            saving = offering.previousUpfrontPrice.net.value - offering.upfrontPrice.net.value;
        }

        return new BasketAttachment(
            product,
            displayType,
            offering && offering.id,
            saving,
            1
        );
    }

    function _getResults(deviceIds, cat1, cat2, size) {
        return DeviceService.getAllDevicesByCategoriesOrId(deviceIds, cat1, cat2, size)
            .then(function (results) {
                return _applyData(results, RESULT_MAX_SIZE);
            });
    }

    /**
     * @param {object} product
     * @param {string} displayType
     * @private
     */
    function _selectProductToggleBasket(product, displayType) {
        var attachment;
        var basket = BasketService.getBasket();

        attachment = basket.findAttachmentById(product.id.toString());

        if (angular.isUndefined(attachment)) {
            basket.addAttachment(_constructBasketAttachment(product, displayType));
        } else {
            basket.removeAttachment(attachment);
        }
    }

    function _sortArrayByArray(arrayToSort, leadArray) {
        var sortedArray = [];

        leadArray.forEach(function (id) {
            sortedArray.push(arrayToSort.find(function (proposition) {
                return proposition.id === id;
            }));
        });

        return _cleanArray(sortedArray);
    }
}
