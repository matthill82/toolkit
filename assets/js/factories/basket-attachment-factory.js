angular
    .module('uitoolkit')
    .factory('BasketAttachment', basketAttachmentFactory);

/**
 * @param {function=BasketItem} BasketItem
 * @returns {function}
 */
function basketAttachmentFactory(BasketItem) {
    /**
     * @constructor
     * @extends BasketItem
     */
    function BasketAttachment() {
        BasketItem.apply(this, arguments);
    }

    BasketAttachment.prototype = Object.create(BasketItem.prototype);
    BasketAttachment.prototype.constructor = BasketAttachment;

    Object.defineProperty(BasketAttachment.prototype, 'propositionType', {
        get: function () {
            return this._data.propositionType || 'attachment';
        }
    });

    BasketAttachment.prototype._requiredProperties = ['device', 'id', 'offering'];

    /**
     * @param {object} data
     * @protected
     */
    BasketAttachment.prototype._validateData = function (data) {
        BasketItem.prototype._validateData.apply(this, arguments);

        if (!data.device.imagery
            || !data.device.imagery.length
            || !data.device.imagery[0]
            || !data.device.imagery[0].url
        ) {
            throw new Error('Unable to find valid image for device, must have at least one image with a valid URL.');
        }
    };

    return BasketAttachment;
}
