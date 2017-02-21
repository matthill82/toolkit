angular
    .module('uitoolkit')
    .factory('Basket', basketFactory);

/**
 * @param {function=BasketAttachment} BasketAttachment
 * @param {function=BasketProposition} BasketProposition
 * @returns {function} Basket constructor
 */
function basketFactory(BasketAttachment, BasketProposition) {
    /**
     * @constructor
     */
    function Basket() {
        this._attachments = [];
        this._propositions = [];
        this._total = 0;
        this._totalRecurring = 0;
        this._saving = 0;
        this._observers = [];
    }

    Object.defineProperty(Basket.prototype, 'attachments', {
        get: function () {
            return this._attachments;
        }
    });

    Object.defineProperty(Basket.prototype, 'propositions', {
        get: function () {
            return this._propositions;
        }
    });

    Object.defineProperty(Basket.prototype, 'total', {
        get: function () {
            return this._total;
        }
    });

    Object.defineProperty(Basket.prototype, 'totalRecurring', {
        get: function () {
            return this._totalRecurring;
        }
    });

    Object.defineProperty(Basket.prototype, 'saving', {
        get: function () {
            return this._saving;
        }
    });

    Basket.prototype.addObserver = function (observer) {
        this._observers.push(observer);
    };

    /**
     * @param {BasketAttachment} model
     * @returns {Basket}
     */
    Basket.prototype.addAttachment = function (model) {
        if (!(model instanceof BasketAttachment)) {
            throw new TypeError('Must be BasketAttachment');
        }

        this._attachments.push(model);

        this._updateTotal();
        this._updateSavings();

        this.notify();

        return this;
    };

    /**
     * @param {BasketProposition} model
     * @returns {Basket}
     */
    Basket.prototype.addProposition = function (model) {
        if (!(model instanceof BasketProposition)) {
            throw new TypeError('Must be BasketProposition');
        }

        this._propositions.push(model);

        this._updateTotal();
        this._updateSavings();

        this.notify();

        return this;
    };

    /**
     * @param {string} id
     * @returns {?BasketAttachment}
     */
    Basket.prototype.findAttachmentById = function (id) {
        var i;

        for (i = 0; i < this._attachments.length; i++) {
            if (this._attachments[i].data.id === id) {
                return this._attachments[i];
            }
        }
    };

    /**
     * @param {string} displayType
     * @returns {BasketAttachment[]}
     */
    Basket.prototype.findAttachmentsByDisplayType = function (displayType) {
        return this._attachments.filter(function (attachment) {
            return attachment.displayType === displayType;
        });
    };

    /**
     * @returns {BasketProposition[]}
     */
    Basket.prototype.findPropositionsWithDevices = function () {
        return this._propositions.filter(function (proposition) {
            return angular.isObject(proposition.data.device);
        });
    };

    /**
     * @returns {BasketProposition[]}
     */
    Basket.prototype.findPropositionsWithRecurring = function () {
        return this._propositions.filter(function (proposition) {
            return proposition.recurringPrice > 0;
        });
    };

    /**
     * @returns {BasketProposition[]}
     */
    Basket.prototype.findPropositionsWithTariffs = function () {
        return this._propositions.filter(function (proposition) {
            return angular.isObject(proposition.data.tariff);
        });
    };

    /**
     * @returns {BasketProposition[]}
     */
    Basket.prototype.findPropositionsWithUpfront = function () {
        return this._propositions.filter(function (proposition) {
            return proposition.upfrontPrice > 0;
        });
    };

    /**
     * @param {BasketAttachment} attachment
     * @returns {boolean}
     */
    Basket.prototype.hasAttachment = function (attachment) {
        return this._attachments.indexOf(attachment) > -1;
    };

    Basket.prototype.notify = function () {
        if (this._observers.length) {
            this._observers.forEach(function (observer) {
                observer(this);
            }, this);
        }
    };

    /**
     * @param {BasketAttachment} attachment
     * @returns {Basket}
     */
    Basket.prototype.removeAttachment = function (attachment) {
        var index = this._attachments.indexOf(attachment);

        if (index > -1) {
            this._attachments.splice(index, 1);
        } else {
            throw new Error('No such attachment in the basket');
        }

        this._updateTotal();
        this._updateSavings();

        this.notify();

        return this;
    };

    /**
     * @param {BasketProposition} proposition
     * @returns {Basket}
     */
    Basket.prototype.removeProposition = function (proposition) {
        var index = this._propositions.indexOf(proposition);

        if (index > -1) {
            this._propositions.splice(index, 1);
        } else {
            throw new Error('No such proposition in the basket');
        }

        this._updateTotal();
        this._updateSavings();

        this.notify();

        return this;
    };

    /**
     * @returns {object} Serialized version of the Basket.
     */
    Basket.prototype.serialize = function () {
        var serialized = {
            attachments: [],
            propositions: []
        };

        this._attachments.forEach(function (attachment) {
            serialized.attachments.push(attachment.serialize());
        });

        this._propositions.forEach(function (proposition) {
            serialized.propositions.push(proposition.serialize());
        });

        return serialized;
    };

    Basket.prototype._updateTotal = function () {
        this._total = 0;
        this._totalRecurring = 0;

        this._propositions.forEach(function (model) {
            this._total += model.upfrontPrice;
            this._totalRecurring += model.recurringPrice;
        }, this);

        this._attachments.forEach(function (model) {
            this._total += model.upfrontPrice;
            this._totalRecurring += model.recurringPrice;
        }, this);
    };

    Basket.prototype._updateSavings = function () {
        this._saving = 0;

        this._propositions.forEach(function (model) {
            this._saving += model.saving;
        }, this);

        this._attachments.forEach(function (model) {
            this._saving += model.saving;
        }, this);
    };

    return Basket;
}
