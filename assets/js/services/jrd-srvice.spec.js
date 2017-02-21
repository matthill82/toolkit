describe('JrdService', function () {
    var $httpBackend;
    var $rootScope;
    /** @type {JrdService} */
    var JrdService;
    var mockConfig;
    var mockJrd;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockConfig = {
            jrd_url: 'http://jrd'
        };

        mockJrd = {
            GLOBAL: {
                segmentName: 'global',
                areas: {
                    globaltest: {
                        items: [
                            {
                                property: 'GTEST'
                            }
                        ]
                    }
                }
            },
            TEST_JOURNEY: {
                segmentName: 'TEST_JOURNEY',
                areas: {
                    test: {
                        items: [
                            {
                                property: 'JTEST'
                            }
                        ]
                    }
                }
            }
        };

        module(function ($provide) {
            $provide.value('config', mockConfig);
        });
    });

    beforeEach(inject(function (_$httpBackend_, _$rootScope_, _JrdService_) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        JrdService = _JrdService_;
    }));

    describe('.init()', function () {
        it('Should error when jrd already initialized.', function () {
            $httpBackend.expect('GET', 'http://jrd').respond(mockJrd);

            JrdService.init();

            $httpBackend.flush();

            expect(function () {
                JrdService.init();
            }).toThrow(new Error('JRD already initialized'));
        });

        it('Should error when fails to load jrd.', function () {
            $httpBackend.expect('GET', 'http://jrd').respond(400);

            expect(function () {
                JrdService.init();

                $httpBackend.flush();
            }).toThrow(new Error('Failed to load JRD'));
        });

        it('Should resolve when no jrd url configured.', function () {
            var promiseResponse;

            mockConfig.jrd_url = null;

            JrdService.init().then(function (response) {
                promiseResponse = response;
            });

            $rootScope.$digest();

            expect(promiseResponse).toEqual('No data-jrd-url');
        });
    });

    describe('.get()', function () {
        describe('Without initialized jrd data', function () {
            it('Should throw.', function () {
                expect(function () {
                    JrdService.get();
                }).toThrow();
            });
        });

        describe('With mock jrd data', function () {
            beforeEach(function () {
                $httpBackend.expect('GET', 'http://jrd').respond(mockJrd);

                JrdService.init();

                $httpBackend.flush();
            });

            it('Should get journey property if it exists.', function () {
                expect(JrdService.get('TEST_JOURNEY', 'test')).toEqual(mockJrd.TEST_JOURNEY.areas.test.items);
            });

            it('Should get global property as a fallback if it exists.', function () {
                expect(JrdService.get('TEST_JOURNEY', 'globaltest')).toEqual(mockJrd.GLOBAL.areas.globaltest.items);
            });

            it('Should return undefined if nothing found', function () {
                expect(JrdService.get('TEST_JOURNEY', 'FOO')).toBeUndefined();
            });
        });
    });
});
