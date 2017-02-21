angular
    .module('uitoolkit')
    .factory('BasketBundle', basketBundleFactory);

/**
 * This is a special type of attachment that stores a reference to up to three
 * "bundled" item ids and some associated data.
 *
 * @param {function=BasketAttachment} BasketAttachment
 * @returns {function}
 */
function basketBundleFactory(BasketAttachment) {
    /**
     * @constructor
     * @extends BasketItem
     */
    function BasketBundle() {
        BasketAttachment.apply(this, arguments);

        this._attachmentIds = [];

        if (this.data.bundleItem1) {
            this._attachmentIds.push(this.data.bundleItem1);
        }

        if (this.data.bundleItem2) {
            this._attachmentIds.push(this.data.bundleItem2);
        }

        if (this.data.bundleItem3) {
            this._attachmentIds.push(this.data.bundleItem3);
        }
    }

    BasketBundle.prototype = Object.create(BasketAttachment.prototype);
    BasketBundle.prototype.constructor = BasketBundle;

    Object.defineProperty(BasketBundle.prototype, 'attachmentIds', {
        get: function () {
            return angular.copy(this._attachmentIds);
        }
    });

    Object.defineProperty(BasketBundle.prototype, 'productPrice', {
        get: function () {
            return this.data.productPrice;
        }
    });

    Object.defineProperty(BasketBundle.prototype, 'upsellAddMore', {
        get: function () {
            return this.data.upsellAddMore;
        }
    });

    /**
     * @param {string} id
     * @returns {boolean}
     */
    BasketBundle.prototype.hasAttachmentId = function (id) {
        return this._attachmentIds.indexOf(id) > -1;
    };

    /**
     * Does this contain the same set of IDs (in any order).
     *
     * @param {string[]} ids
     * @returns {boolean}
     */
    BasketBundle.prototype.hasAttachmentIds = function (ids) {
        var found = 0;

        if (ids.length !== this._attachmentIds.length) {
            return false;
        }

        ids.forEach(function (id) {
            if (this._attachmentIds.indexOf(id) > -1) {
                found++;
            }
        }, this);

        return found === ids.length;
    };

    return BasketBundle;
}
