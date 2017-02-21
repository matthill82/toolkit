describe('UtilityService', function () {
    /** @type {UtilityService} */
    var UtilityService;
    var $state;

    beforeEach(module('uitoolkit'));

    beforeEach(inject(function (_UtilityService_, _$state_) {
        UtilityService = _UtilityService_;
        $state = _$state_;
    }));

    describe('.aemKvMapString()', function () {
        it('Should split the string into a map.', function () {
            expect(UtilityService.aemKvMapString(
                'KEY1::VALUE1||KEY2::VALUE2'
            )).toEqual({KEY1: 'VALUE1', KEY2: 'VALUE2'});
        });

        it('Should allow a null value.', function () {
            expect(UtilityService.aemKvMapString(
                'KEY1::VALUE1||KEY2::VALUE2||KEY3'
            )).toEqual({KEY1: 'VALUE1', KEY2: 'VALUE2', KEY3: null});
        });

        it('Should trim whitespace from keys.', function () {
            expect(UtilityService.aemKvMapString(
                ' KEY1 ::VALUE1|| KEY2 ::VALUE2'
            )).toEqual({KEY1: 'VALUE1', KEY2: 'VALUE2'});
        });

        it('Should trim whitespace from value.', function () {
            expect(UtilityService.aemKvMapString(
                'KEY1:: VALUE1 ||KEY2:: VALUE2 '
            )).toEqual({KEY1: 'VALUE1', KEY2: 'VALUE2'});
        });

        it('Should ignore a non-string input.', function () {
            expect(UtilityService.aemKvMapString(
                []
            )).toEqual({});
        });

        it('Should ignore empty parts.', function () {
            expect(UtilityService.aemKvMapString(
                'KEY1::VALUE1||||||KEY2::VALUE2'
            )).toEqual({KEY1: 'VALUE1', KEY2: 'VALUE2'});
        });

        it('Should set keys with no value to null.', function () {
            expect(UtilityService.aemKvMapString(
                'KEY1||KEY2::VALUE2'
            )).toEqual({KEY1: null, KEY2: 'VALUE2'});
        });
    });

    describe('.aemMapListValuesString()', function () {
        it('Should map the values to the provided structure.', function () {
            expect(UtilityService.aemMapListValuesString(
                'ONE::TWO::THREE||FOUR::FIVE::SIX',
                ['K1', 'K2', 'K3']
            )).toEqual([
                {
                    K1: 'ONE',
                    K2: 'TWO',
                    K3: 'THREE'
                }, {
                    K1: 'FOUR',
                    K2: 'FIVE',
                    K3: 'SIX'
                }
            ]);
        });

        it('Should ignore unmapped values.', function () {
            expect(UtilityService.aemMapListValuesString(
                'ONE::TWO::THREE||FOUR::FIVE::SIX',
                ['K1', 'K2']
            )).toEqual([
                {
                    K1: 'ONE',
                    K2: 'TWO'
                }, {
                    K1: 'FOUR',
                    K2: 'FIVE'
                }
            ]);
        });

        it('Should ignore additional map keys.', function () {
            expect(UtilityService.aemMapListValuesString(
                'ONE::TWO::THREE||FOUR::FIVE',
                ['K1', 'K2', 'K3']
            )).toEqual([
                {
                    K1: 'ONE',
                    K2: 'TWO',
                    K3: 'THREE'
                }, {
                    K1: 'FOUR',
                    K2: 'FIVE'
                }
            ]);
        });

        it('Should ignore empty parts.', function () {
            expect(UtilityService.aemMapListValuesString(
                'ONE::TWO||||THREE::FOUR',
                ['K1', 'K2']
            )).toEqual([
                {
                    K1: 'ONE',
                    K2: 'TWO'
                }, {
                    K1: 'THREE',
                    K2: 'FOUR'
                }
            ]);
        });
    });

    describe('.findUpScope()', function () {
        var $rootScope;

        beforeEach(inject(function (_$rootScope_) {
            $rootScope = _$rootScope_;
        }));

        it('Should find on scope.', function () {
            var scope = $rootScope.$new();

            scope.test = ['TEST'];

            expect(UtilityService.findUpScope(scope, 'test')).toEqual(['TEST']);
        });

        it('Should find the unhandled array on parent scope.', function () {
            var scope = $rootScope.$new();

            scope.$parent.test = ['TEST'];

            expect(UtilityService.findUpScope(scope, 'test')).toEqual(['TEST']);
        });

        it('Should return undefined if it cant find.', function () {
            var scope = $rootScope.$new();

            expect(UtilityService.findUpScope(scope, 'test')).toBeUndefined();
        });
    });

    describe('.findUpScope()', function () {
        var $rootScope;

        beforeEach(inject(function (_$rootScope_) {
            $rootScope = _$rootScope_;
        }));

        it('Should find on scope.', function () {
            var scope = $rootScope.$new();

            scope.test = ['TEST'];

            expect(UtilityService.findUpScope(scope, 'test')).toEqual(['TEST']);
        });

        it('Should find the unhandled array on parent scope.', function () {
            var scope = $rootScope.$new();

            scope.$parent.test = ['TEST'];

            expect(UtilityService.findUpScope(scope, 'test')).toEqual(['TEST']);
        });

        it('Should return undefined if it cant find.', function () {
            var scope = $rootScope.$new();

            expect(UtilityService.findUpScope(scope, 'test')).toBeUndefined();
        });
    });

    describe('.isNumeric()', function () {
        it('Should be truthy on 0', function () {
            expect(UtilityService.isNumeric(0)).toBeTruthy();
        });

        it('Should be truthy on 1', function () {
            expect(UtilityService.isNumeric(1)).toBeTruthy();
        });

        it('Should be truthy on -1', function () {
            expect(UtilityService.isNumeric(-1)).toBeTruthy();
        });

        it('Should be truthy on .1', function () {
            expect(UtilityService.isNumeric(.1)).toBeTruthy();
        });

        it('Should be truthy on "1"', function () {
            expect(UtilityService.isNumeric('1')).toBeTruthy();
        });

        it('Should be truthy on "1.1"', function () {
            expect(UtilityService.isNumeric('1.1')).toBeTruthy();
        });

        it('Should be truthy on "-1.1"', function () {
            expect(UtilityService.isNumeric('-1.1')).toBeTruthy();
        });

        it('Should be falsy on NaN', function () {
            expect(UtilityService.isNumeric(NaN)).toBeFalsy();
        });

        it('Should be falsy on ""', function () {
            expect(UtilityService.isNumeric('')).toBeFalsy();
        });

        it('Should be falsy on undefined', function () {
            expect(UtilityService.isNumeric()).toBeFalsy();
        });

        it('Should be falsy on true', function () {
            expect(UtilityService.isNumeric(true)).toBeFalsy();
        });

        it('Should be falsy on false', function () {
            expect(UtilityService.isNumeric(false)).toBeFalsy();
        });
    });

    describe('.pipeSeparatedList()', function () {
        it('Should split string on double pipe.', function () {
            expect(UtilityService.pipeSeparatedList(
                'ONE||TWO'
            )).toEqual(['ONE', 'TWO']);
        });

        it('Should ignore empty values.', function () {
            expect(UtilityService.pipeSeparatedList(
                'ONE||TWO||||THREE'
            )).toEqual(['ONE', 'TWO', 'THREE']);
        });
    });

    describe('getByPropertyValue()', function () {

        it('should return object based on property/value', function () {

            var mockArray = [
                {color: "red"},
                {color: "blue"},
                {color: "green"}
            ];

            expect(UtilityService.getByPropertyValue(mockArray, 'color', 'blue')).toEqual(mockArray[1]);
            expect(UtilityService.getByPropertyValue(mockArray, 'color', 'orange')).toBeUndefined();

        });

    });

    describe('getFirstEntry()', function () {

        it('should return first object found dependent on key and value, and order of array passed in', function () {

            var mockedArray = [
                {
                    key: 'first',
                    other: 'other first a'
                },
                {
                    key: 'second',
                    other: 'other second a'
                },
                {
                    key: 'second',
                    other: 'other second b'
                },
                {
                    key: 'first',
                    other: 'other first b'
                }
            ];

            expect(UtilityService.getFirstEntry(['second'], 'key', mockedArray)).toEqual(mockedArray[1]);
            expect(UtilityService.getFirstEntry(['second', 'first'], 'key', mockedArray)).toEqual(mockedArray[1]);
            expect(UtilityService.getFirstEntry(['first', 'second'], 'key', mockedArray)).toEqual(mockedArray[0]);

        });

    });

    describe('getProposition()', function () {

        var mockedPropositionArray = [
            {
                propositionType: 'plan',
                other: 'plan a'
            },
            {
                propositionType: 'phone',
                other: 'phone a'
            },
            {
                propositionType: 'plan',
                other: 'plan b'
            },
            {
                propositionType: 'phoneAndPlan',
                other: 'phoneAndPlan a'
            }
        ];

        it('should return first object found dependent on key and value, and order of array passed in', function () {

            expect(UtilityService.getProposition(mockedPropositionArray, ['plan', 'phoneAndPlan']))
                .toEqual(mockedPropositionArray[0]);
            expect(UtilityService.getProposition(mockedPropositionArray, ['phoneAndPlan', 'plan']))
                .toEqual(mockedPropositionArray[3]);

        });

        it('should return first object found if no proposition key is provided', function () {

            expect(UtilityService.getProposition(mockedPropositionArray, [])).toEqual(mockedPropositionArray[0]);
            expect(UtilityService.getProposition(mockedPropositionArray)).toEqual(mockedPropositionArray[0]);

        });

        it('should return empty object if no propositions exist', function () {

            expect(UtilityService.getProposition([], ['plan'])).toEqual({});

        });

    });

    describe('goToRoute()', function () {
        it('should call the go method with route', function () {
            spyOn($state, 'go');
            UtilityService.goToRoute('mockRoute');
            expect($state.go).toHaveBeenCalledWith('mockRoute');
        })
    });

});
