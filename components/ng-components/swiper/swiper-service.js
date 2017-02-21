angular
    .module('uitoolkit')
    .service('SwiperService', SwiperService);

/**
 * @param $rootScope
 * @param {function=BasketAttachment} BasketAttachment
 * @param {function=BasketBundle} BasketBundle
 * @param {BasketService} BasketService
 * @param EventEnums
 * @param JrdService
 * @constructor
 */
function SwiperService(
    $rootScope,
    BasketAttachment,
    BasketBundle,
    BasketService,
    EventEnums,
    JrdService
) {
    var bundleCache = {};
    var OFFERINGTYPE = 'fullPrice';

    this.isDisabled = isDisabled;
    this.isSelected = isSelected;
    this.loadBundleProducts = loadBundleProducts;
    this.loadData = loadData;
    this.removeAll = removeAll;
    this.select = select;
    this.selectBundle = selectBundle;

    /**
     * @param {string[]} disabledGroupArray
     * @returns {boolean}
     */
    function isDisabled(disabledGroupArray) {
        var basket = BasketService.getBasket();
        var i;
        var j;

        if (basket.attachments.length) {
            for (i = 0; i < disabledGroupArray.length; i++) {
                for (j = 0; j < basket.attachments.length; j++) {
                    if (basket.attachments[j].data.grouping === disabledGroupArray[i]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * @param {BasketAttachment} attachment
     * @param {BasketBundle[]=} bundles Supply bundles collection to enable bundle mode.
     * @returns {boolean}
     */
    function isSelected(attachment, bundles) {
        var attachments;
        var basket = BasketService.getBasket();

        // If we are working with bundles the actual attachment will never be
        // added to the basket, only a bundle which contains a reference to it.
        if (bundles && bundles.length) {
            attachments = basket.findAttachmentsByDisplayType(attachment.displayType);
            if (attachments.length) {
                return attachments[0].hasAttachmentId(attachment.id);
            }
        }

        return basket.hasAttachment(attachment);
    }

    /**
     * @param journey
     * @param categoryFilter
     * @param categoryType
     * @param displayType
     * @returns {BasketBundle[]}
     */
    function loadBundleProducts(journey, categoryFilter, categoryType, displayType) {
        var basket = BasketService.getBasket();
        var bundles;

        if (bundleCache[journey+categoryFilter]) {
            return bundleCache[journey+categoryFilter];
        }

        bundles = JrdService.get(journey, categoryFilter);

        bundles = bundles.map(function (bundle) {
            var basketBundle = basket.findAttachmentById(bundle.productCode);

            if (angular.isUndefined(basketBundle)) {
                basketBundle = _constructBasketBundle(bundle, displayType, categoryType);
            }

            return basketBundle;
        });

        bundleCache[journey + categoryFilter] = bundles;

        return bundles;
    }

    /**
     * @param {string} journey
     * @param {string} property
     * @param {string} category
     * @param {string} displayType
     * @returns {BasketAttachment[]}
     */
    function loadData(journey, property, category, displayType) {
        var attachment;
        var basket = BasketService.getBasket();
        var products = JrdService.get(journey, property);

        if (products) {
            products = products.filter(function (item) {
                return item.productGrouping === category;
            });
            return products.map(function (product) {
                attachment = basket.findAttachmentById(product.productSKU);

                if (angular.isUndefined(attachment)) {
                    attachment = _constructBasketAttachment(product, displayType, category);
                }

                return attachment;
            });
        }

        return [];
    }

    /**
     * Remove all attachments from the basket (if they are in the basket)
     *
     * @param {BasketAttachment[]} attachments
     */
    function removeAll(attachments) {
        var basket = BasketService.getBasket();

        attachments.forEach(function (attachment) {
            if (basket.hasAttachment(attachment)) {
                basket.removeAttachment(attachment);
            }
        });
    }

    /**
     * Do not use with bundles.
     *
     * @param {BasketAttachment} attachment
     * @param {boolean} selectSingle Select single mode (not compatible with bundle mode)
     * @param {number} itemIndex
     */
    function select(attachment, selectSingle, itemIndex) {
        var basket = BasketService.getBasket();

        if (isSelected(attachment)) {
            // Remove
            $rootScope.$broadcast(EventEnums.ENUMS.UNSELECT_ATTACHMENT, {
                attachment: attachment,
                filterCategory: attachment.data.grouping,
                itemIndex: itemIndex
            });

            basket.removeAttachment(attachment);
            return;
        }

        if (selectSingle) {
            basket.findAttachmentsByDisplayType(attachment.displayType).forEach(function (attachment) {
                basket.removeAttachment(attachment);
            });
        }

        $rootScope.$broadcast(EventEnums.ENUMS.SELECT_ATTACHMENT, {
            attachment: attachment,
            filterCategory: attachment.data.grouping,
            itemIndex: itemIndex
        });

        basket.addAttachment(attachment);
    }

    /**
     * If bundles are in use then selectBundle must be used.
     *
     * @param {BasketAttachment} attachment
     * @param {BasketAttachment[]} attachments All attachments in this group (as they will be removed if present in any already selected bundle).
     * @param {BasketBundle[]} bundles bundles collection
     * @param {number} itemIndex
     */
    function selectBundle(attachment, attachments, bundles, itemIndex) {
        var attachmentIds = [];
        var basket = BasketService.getBasket();
        var bundle;
        var removeIds;
        var selected = isSelected(attachment, bundles);

        // Which attachment IDs are needed?
        // If there is no bundle then just this one otherwise get them from the
        // current bundle.
        bundle = basket.findAttachmentsByDisplayType(attachment.displayType)[0];

        if (bundle) {
            // There is already a bundle in the basket.
            // Remove it, will need to find a replacement bundle.
            basket.removeAttachment(bundle);

            // Need to remove any of these IDs from attachmentIds.
            removeIds = attachments.map(function (attachment) {
                return attachment.id;
            });

            attachmentIds = bundle.attachmentIds.filter(function (id) {
                return removeIds.indexOf(id) === -1;
            });
        }

        if (!selected) {
            // This attachment is being added.
            $rootScope.$broadcast(EventEnums.ENUMS.SELECT_ATTACHMENT, {
                attachment: attachment,
                filterCategory: attachment.data.grouping,
                itemIndex: itemIndex
            });

            attachmentIds.push(attachment.id);
        } else {
            // Its being removed.
            $rootScope.$broadcast(EventEnums.ENUMS.UNSELECT_ATTACHMENT, {
                attachment: attachment,
                filterCategory: attachment.data.grouping,
                itemIndex: itemIndex
            });
        }

        if (!attachmentIds.length) {
            // There is nothing to add.
            return;
        }

        // Find the bundle that has all the IDs we need.
        bundle = bundles.find(function (bundle) {
            return bundle.hasAttachmentIds(attachmentIds);
        });

        if (bundle) {
            basket.addAttachment(bundle);
        }
    }

    /**
     * @param {object} product
     * @param {string} displayType
     * @param {string} categoryType
     * @returns {BasketAttachment}
     */
    function _constructBasketAttachment(product, displayType, categoryType) {
        return new BasketAttachment(
            {
                id: product.productSKU,
                name: product['jcr:title'],
                grouping: categoryType,
                separatePrice: product.separateSellingPrice,
                offering: [
                    {
                        id: OFFERINGTYPE,
                        offeringType: OFFERINGTYPE,
                        upfrontPrice: {
                            net: {
                                value: product.productPrice
                            }
                        }
                    }
                ],
                device: {
                    imagery: [
                        {
                            url: product.imageUrl
                        }
                    ]
                },
                productBenefit1: product.productBenefit1 !== '-' ? product.productBenefit1 : null,
                productBenefit2: product.productBenefit2 !== '-' ? product.productBenefit2 : null,
                productBenefit3: product.productBenefit3 !== '-' ? product.productBenefit3 : null,
                productBenefit4: product.productBenefit4 !== '-' ? product.productBenefit4 : null
            },
            displayType,
            OFFERINGTYPE,
            product.saving || 0,
            1
        );
    }

    /**
     * @param {object} bundle
     * @param {string} displayType
     * @param {string} categoryType
     * @returns {BasketBundle}
     */
    function _constructBasketBundle(bundle, displayType, categoryType) {
        return new BasketBundle(
            {
                id: bundle.productCode,
                name: bundle.productDescription,
                grouping: categoryType,
                offering: [
                    {
                        id: OFFERINGTYPE,
                        offeringType: OFFERINGTYPE,
                        upfrontPrice: {
                            net: {
                                value: bundle.bundlePrice
                            }
                        }
                    }
                ],
                device: {
                    imagery: [
                        {
                            url: bundle.productImagePath
                        }
                    ]
                },
                bundleItem1: bundle.bundleItem1 !== '-' ? bundle.bundleItem1 : null,
                bundleItem2: bundle.bundleItem2 !== '-' ? bundle.bundleItem2 : null,
                bundleItem3: bundle.bundleItem3 !== '-' ? bundle.bundleItem3 : null,
                upsellAddMore: bundle.upsellAddMore !== '-' ? bundle.upsellAddMore : null,
                productPrice: bundle.productPrice
            },
            displayType,
            OFFERINGTYPE,
            bundle.productPrice - bundle.bundlePrice,
            1
        );
    }
}
