describe('BasketItem', function () {
    /** @type {BasketItem} */
    var BasketItem;
    var mockItem;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockItem = {
            device: {
                name: 'Device Name',
                imagery: [
                    {
                        url: 'http://test'
                    }
                ]
            },
            id: 'TEST',
            name: 'Test Attachment',
            offering: [
                {
                    id: 'fullPrice',
                    offeringType: 'fullPrice',
                    upfrontPrice: {
                        net: {
                            'value': 99.99
                        }
                    },
                    residualLeaseValue: {
                        net: {
                            value: 50.0
                        }
                    }
                }, {
                    id: 'monthlyContract',
                    offeringType: 'monthlyContract',
                    regularInstallmentAmount: {
                        net: {
                            'value': 9.99
                        }
                    }
                }
            ],
            propositionType: 'device'
        };
    });

    beforeEach(inject(function (_BasketItem_) {
        BasketItem = function () {
            _BasketItem_.apply(this, arguments);
        };

        BasketItem.prototype = Object.create(_BasketItem_.prototype);
        BasketItem.prototype.constructor = BasketItem;
    }));

    describe('.constructor()', function () {
        beforeEach(inject(function (_BasketItem_) {
            BasketItem = _BasketItem_;
        }));

        it('Should throw Error if constructed directly.', function () {
            expect(function () {
                new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);
            }).toThrow();
        });
    });

    describe('.cashbackPrice', function () {
        it('Should reutrn cashback', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.cashbackPrice).toEqual(mockItem.offering[0].residualLeaseValue.net.value);
        });
    });

    describe('.data', function () {
        it('Should return the data.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.data).toBe(mockItem);
        });
    });

    describe('.displayType', function () {
        it('Should return the displayType.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.displayType).toBe('TEST');
        });
    });

    describe('.id', function () {
        it('Should return the id.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.id).toEqual(mockItem.id);
        });
    });

    describe('.imageUrl', function () {
        it('Should return the image url from data object.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.imageUrl).toEqual(mockItem.device.imagery[0].url);
        });
    });

    describe('.name', function () {
        it('Should return the proposition name.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.name).toEqual(mockItem.name);
        });

        it('Should fall back to device name if the proposition does not have a name.', function () {
            var instance;

            mockItem.name = undefined;

            instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.name).toEqual(mockItem.device.name);
        });
    });

    describe('.price', function () {
        it('Should return the price from data object with offeringType of fullPrice.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.price).toEqual(99.99);
        });

        it('Should return the price from data object with offeringType of monthlyContract.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'monthlyContract', 0, 1);

            expect(instance.price).toEqual(9.99);
        });
    });

    describe('.propositionType', function () {
        it('Should return the proposition type.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.propositionType).toEqual(mockItem.propositionType);
        });
    });

    describe('.quantity', function () {
        it('Should return the quantity.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 3);

            expect(instance.quantity).toEqual(3);
        });
    });

    describe('.recurringPrice', function () {
        it('Should return the recurring price.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'monthlyContract', 0, 1);

            expect(instance.price).toEqual(9.99);
        });
    });

    describe('.selectedOffering', function () {
        it('Should return the selected offering.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 3);

            expect(instance.selectedOffering).toBe(mockItem.offering[0]);
        });
    });

    describe('.selectedOfferingId', function () {
        it('Should return the selected offering\'s id.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 3);

            expect(instance.selectedOfferingId).toEqual(mockItem.offering[0].id);
        });
    });

    describe('.serialize()', function () {
        it('Should serialize.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.serialize()).toEqual({
                data: mockItem,
                displayType: 'TEST',
                quantity: 1,
                selectedOfferingId: 'fullPrice',
                saving: 0,
                type: ''
            });
        });
    });

    describe('.upfrontPrice', function () {
        it('Should return the upfrontPrice from data object with offeringType of fullPrice.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'fullPrice', 0, 1);

            expect(instance.upfrontPrice).toEqual(99.99);
        });

        it('Should return upfrontPrice with offeringType of monthlyContract.', function () {
            var instance = new BasketItem(mockItem, 'TEST', 'monthlyContract', 0, 1);

            expect(instance.upfrontPrice).toEqual(0);
        });
    });
});
