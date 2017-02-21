describe('Basket', function () {
    /** @type {Basket} */
    var Basket;
    var BasketAttachment;
    var BasketProposition;
    var mockAttachment;
    var mockProposition;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockAttachment = {
            device: {
                imagery: [
                    {
                        url: 'http://'
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
                            value: 99.99
                        }
                    }
                }
            ]
        };

        mockProposition = {
            device: {
                imagery: [
                    {
                        url: 'http://'
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
                            value: 99.99
                        }
                    }
                }
            ],
            propositionType: 'device'
        };
    });

    beforeEach(inject(function (_Basket_, _BasketAttachment_, _BasketProposition_) {
        Basket = _Basket_;
        BasketAttachment = _BasketAttachment_;
        BasketProposition = _BasketProposition_;
    }));

    describe('.addAttachment()', function () {
        var attachment;
        var instance;

        beforeEach(function () {
            attachment = new BasketAttachment(mockAttachment, 'foo', 'fullPrice', 10, 1);
            instance = new Basket();
        });

        it('Should add the attachment.', function () {
            expect(instance.attachments.length).toBe(0);

            instance.addAttachment(attachment);

            expect(instance.attachments.length).toBe(1);
            expect(instance.attachments[0]).toBe(attachment);
        });

        it('Should error on invalid attachment.', function () {
            expect(function () {
                instance.addAttachment(null);
            }).toThrow();
        });
    });

    describe('.addProposition()', function () {
        var proposition;
        var instance;

        beforeEach(function () {
            proposition = new BasketProposition(mockProposition, 'foo', 'fullPrice', 10, 1);
            instance = new Basket();
        });

        it('Should add the proposition.', function () {
            expect(instance.propositions.length).toBe(0);

            instance.addProposition(proposition);

            expect(instance.propositions.length).toBe(1);
            expect(instance.propositions[0]).toBe(proposition);
        });

        it('Should add the proposition total', function () {
            instance.addProposition(proposition);
            expect(instance.total).toEqual(mockProposition.offering[0].upfrontPrice.net.value);
        });

        it('Should add the proposition saving', function () {
            instance.addProposition(proposition);
            expect(instance.saving).toEqual(10);
        });

        it('Should error on invalid proposition.', function () {
            expect(function () {
                instance.addProposition(null);
            }).toThrow();
        });
    });

    describe('.findAttachmentById()', function () {
        it('Should find one attachment by ID.', function () {
            var attachment = new BasketAttachment(mockAttachment, 'foo', 'fullPrice');
            var instance = new Basket();

            instance.addAttachment(attachment);

            expect(instance.findAttachmentById('TEST')).toBe(attachment);
        });

        it('Should return undefined if nothing found.', function () {
            var attachment = new BasketAttachment(mockAttachment, 'foo', 'fullPrice');
            var instance = new Basket();

            instance.addAttachment(attachment);

            expect(instance.findAttachmentById('TESTDOESNTEXIST')).toBeUndefined();
        });
    });

    describe('.findAttachmentsByDisplayType()', function () {
        it('Should find attachments with matching display type.', function () {
            var attachment = new BasketAttachment(mockAttachment, 'foo', 'fullPrice');
            var instance = new Basket();

            instance.addAttachment(attachment);
            instance.addAttachment(new BasketAttachment(mockAttachment, 'bar', 'fullPrice'));

            expect(instance.attachments.length).toBe(2);
            expect(instance.findAttachmentsByDisplayType('foo')).toEqual([attachment]);
        });
    });

    describe('.findPropositionsWithDevices()', function () {
        it('Should find propositions with a device.', function () {
            var instance = new Basket();
            var propositionWithDevice = new BasketProposition(mockProposition, 'foo', 'fullPrice');
            var propositionWithoutDevice = new BasketProposition({
                id: 'TEST',
                name: 'Test Attachment',
                offering: [
                    {
                        id: 'fullPrice',
                        offeringType: 'fullPrice',
                        upfrontPrice: {
                            net: {
                                value: 99.99
                            }
                        }
                    }
                ],
                tariff: {},
                propositionType: 'tariff'
            }, 'foo', 'fullPrice');

            instance
                .addProposition(propositionWithDevice)
                .addProposition(propositionWithoutDevice);

            expect(instance.findPropositionsWithDevices()).toEqual([propositionWithDevice]);
        });
    });

    describe('.findPropositionsWithRecurring()', function () {
        it('Should find propositions with a recurring price.', function () {
            var instance = new Basket();
            var propositionWithoutRecurringPrice = new BasketProposition(mockProposition, 'foo', 'fullPrice');
            var propositionWithRecurringPrice = new BasketProposition({
                id: 'TEST',
                name: 'Test Attachment',
                offering: [
                    {
                        id: 'OFFERINGID',
                        offeringType: 'monthlyLease',
                        regularInstallmentAmount: {
                            net: {
                                value: 99.99
                            }
                        }
                    }
                ],
                propositionType: 'tariff'
            }, 'foo', 'OFFERINGID');

            instance
                .addProposition(propositionWithRecurringPrice)
                .addProposition(propositionWithoutRecurringPrice);

            expect(instance.findPropositionsWithRecurring()).toEqual([propositionWithRecurringPrice]);
        });
    });

    describe('.findPropositionsWithTariffs()', function () {
        it('Should find propositions with a tariff.', function () {
            var instance = new Basket();
            var propositionWithoutTariff = new BasketProposition(mockProposition, 'foo', 'fullPrice');
            var propositionWithTariff = new BasketProposition({
                id: 'TEST',
                name: 'Test Attachment',
                offering: [
                    {
                        id: 'fullPrice',
                        offeringType: 'fullPrice',
                        upfrontPrice: {
                            net: {
                                value: 99.99
                            }
                        }
                    }
                ],
                tariff: {},
                propositionType: 'tariff'
            }, 'foo', 'fullPrice');

            instance
                .addProposition(propositionWithTariff)
                .addProposition(propositionWithoutTariff);

            expect(instance.findPropositionsWithTariffs()).toEqual([propositionWithTariff]);
        });
    });

    describe('.findPropositionsWithUpfront()', function () {
        it('Should find propositions with an upfront price.', function () {
            var instance = new Basket();
            var propositionWithUpfrontPrice = new BasketProposition(mockProposition, 'foo', 'fullPrice');
            var propositionWithoutUpfrontPrice = new BasketProposition({
                id: 'TEST',
                name: 'Test Attachment',
                offering: [
                    {
                        id: 'OFFERINGID',
                        offeringType: 'monthlyLease',
                        regularInstallmentAmount: {
                            net: {
                                value: 99.99
                            }
                        }
                    }
                ],
                propositionType: 'tariff'
            }, 'foo', 'OFFERINGID');

            instance
                .addProposition(propositionWithUpfrontPrice)
                .addProposition(propositionWithoutUpfrontPrice);

            expect(instance.findPropositionsWithUpfront()).toEqual([propositionWithUpfrontPrice]);
        });
    });


    describe('.hasAttachment()', function () {
        it('Should return TRUE when it has the attachment.', function () {
            var attachment = new BasketAttachment(mockAttachment, 'foo', 'fullPrice');
            var instance = new Basket();

            instance.addAttachment(attachment);

            expect(instance.hasAttachment(attachment)).toBeTruthy();
        });

        it('Should return FALSE when it has the attachment.', function () {
            var attachment = new BasketAttachment(mockAttachment, 'foo', 'fullPrice');
            var instance = new Basket();

            expect(instance.hasAttachment(attachment)).toBeFalsy();
        });
    });

    describe('.removeAttachment()', function () {
        it('Should remove the matching attachment.', function () {
            var attachment = new BasketAttachment(mockAttachment, 'foo', 'fullPrice');
            var instance = new Basket();

            expect(instance.attachments.length).toBe(0);

            instance.addAttachment(attachment);

            expect(instance.attachments.length).toBe(1);

            instance.removeAttachment(attachment);

            expect(instance.attachments.length).toBe(0);
        });

        it('Should trow error if there is no such attachment.', function () {
            var instance = new Basket();

            expect(function () {
                instance.removeAttachment();
            }).toThrowError();
        });
    });

    describe('.removeProposition()', function () {
        it('Should remove the matching proposition.', function () {
            var proposition = new BasketProposition(mockProposition, 'foo', 'fullPrice');
            var instance = new Basket();

            expect(instance.propositions.length).toBe(0);

            instance.addProposition(proposition);

            expect(instance.propositions.length).toBe(1);

            instance.removeProposition(proposition);

            expect(instance.propositions.length).toBe(0);
        });

        it('Should trow error if there is no such proposition.', function () {
            var instance = new Basket();

            expect(function () {
                instance.removeProposition();
            }).toThrowError();
        });
    });

    describe('.serialize()', function () {
        it('Should serialize an empty basket.', function () {
            var instance = new Basket();

            expect(instance.serialize()).toEqual({
                attachments: [],
                propositions: []
            });
        });

        it('Should serialize each basket item.', function () {
            var attachment = new BasketAttachment(mockAttachment, 'foo', 'fullPrice');
            var instance = new Basket();
            var proposition = new BasketProposition(mockProposition, 'foo', 'fullPrice');

            spyOn(attachment, 'serialize');
            spyOn(proposition, 'serialize');

            instance.addAttachment(attachment);
            instance.addProposition(proposition);

            instance.serialize();

            expect(attachment.serialize).toHaveBeenCalled();
            expect(proposition.serialize).toHaveBeenCalled();
        });
    });
});
