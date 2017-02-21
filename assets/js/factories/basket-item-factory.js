angular
    .module('uitoolkit')
    .factory('BasketItem', basketItemFactory);

function basketItemFactory() {
    /**
     * @throws Error on invalid input data.
     * @abstract
     * @param {object} data
     * @param {string} displayType
     * @param {string} offeringId
     * @param {number=0} saving
     * @param {number=1} quantity
     * @constructor
     */
    function BasketItem(data, displayType, offeringId, saving, quantity) {
        if (this.constructor === BasketItem) {
            throw new Error('Can\'t instantiate abstract class!');
        }

        this._data = data;
        this._displayType = displayType;
        this._quantity = parseInt(quantity) || 1;
        this._saving = parseFloat(saving) || 0;

        this._selectOffering(offeringId);

        this._validateData(data);
    }

    Object.defineProperty(BasketItem.prototype, 'cashbackPrice', {
        get: function () {
            return this._cashbackPrice;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'data', {
        get: function () {
            return this._data;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'displayType', {
        get: function () {
            return this._displayType;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'id', {
        get: function () {
            return this.data.id;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'imageUrl', {
        get: function () {
            return this.data.device ? this.data.device.imagery[0].url : null;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'name', {
        get: function () {
            return this.data.name || (this.data.device ? this.data.device.name : '');
        }
    });

    Object.defineProperty(BasketItem.prototype, 'price', {
        get: function () {
            return this._price;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'propositionType', {
        get: function () {
            return this._data.propositionType;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'quantity', {
        get: function () {
            return this._quantity;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'recurringPrice', {
        get: function () {
            return this._recurringPrice;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'saving', {
        get: function () {
            return this._saving;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'selectedOffering', {
        get: function () {
            return this._selectedOffering;
        }
    });

    Object.defineProperty(BasketItem.prototype, 'selectedOfferingId', {
        get: function () {
            return this._selectedOffering.id;
        }
    });

    /**
     * If a specific item type has a different upfront price from its display
     * price this may be utilised.
     */
    Object.defineProperty(BasketItem.prototype, 'upfrontPrice', {
        get: function () {
            return this._upfrontPrice;
        }
    });

    /**
     * @returns {object}
     */
    BasketItem.prototype.serialize = function () {
        return {
            data: this._data,
            displayType: this._displayType,
            quantity: this._quantity,
            selectedOfferingId: this._selectedOffering.id,
            saving: this._saving,
            type: this.constructor.name
        };
    };

    BasketItem.prototype._requiredProperties = ['id', 'offering'];

    /**
     * @param {string} id
     * @private
     */
    BasketItem.prototype._selectOffering = function (id) {
        if (this._data.offering && this._data.offering.length) {
            this._data.offering.forEach(function (offering) {
                if (offering.id === id) {
                    this._selectedOffering = offering;
                }
            }, this);
        }

        if (!this._selectedOffering) {
            throw new Error('No offering with specified id found in offering array.');
        }

        this._updateTotals();
    };

    BasketItem.prototype._updateTotals = function () {
        this._cashbackPrice = this._selectedOffering.residualLeaseValue
            ? parseFloat(this._selectedOffering.residualLeaseValue.net.value)
            : 0.0;

        this._recurringPrice = this._selectedOffering.regularInstallmentAmount
            ? parseFloat(this._selectedOffering.regularInstallmentAmount.net.value)
            : 0.0;

        this._upfrontPrice = [
            this._selectedOffering.optionalDownPayment ? this._selectedOffering.optionalDownPayment.net.value : 0,
            this._selectedOffering.securityDeposit ? this._selectedOffering.securityDeposit.net.value : 0,
            this._selectedOffering.upfrontPrice ? this._selectedOffering.upfrontPrice.net.value : 0
        ].reduce(function (a, b) {
            return a + parseFloat(b);
        }, 0.0);

        this._price = this.recurringPrice + this.upfrontPrice;
    };

    /**
     * @param {object} data
     * @protected
     */
    BasketItem.prototype._validateData = function (data) {
        this._requiredProperties.forEach(function (property) {
            if (!data[property]) {
                throw new Error('Missing ' + property + ' from data.');
            }
        });
    };

    return BasketItem;
}
