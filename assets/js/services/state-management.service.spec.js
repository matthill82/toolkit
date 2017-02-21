describe('StateManagement', function () {
    var mock$window;
    /** @type {StateManagement} */
    var StateManagement;
    var mockItem;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mock$window = {
            localStorage: {
                getItem: function () {
                    return mockItem;
                },
                setItem: jasmine.createSpy()
            }
        };

        spyOn(mock$window.localStorage, 'getItem').and.callThrough();

        mockItem = null;

        module(function ($provide) {
            $provide.value('$window', mock$window);
            $provide.value('config', {
                store_data_as_local_storage: 'true'
            });
        });
    });

    beforeEach(inject(function (_StateManagement_) {
        StateManagement = _StateManagement_;
    }));

    describe('.getData()', function () {
        it('Should call local storage with prefixed key.', function () {
            StateManagement.getData('TEST');

            expect(mock$window.localStorage.getItem).toHaveBeenCalledWith('hBTEST');
        });
    });

    describe('.get()', function () {
        it('Should get.', function () {
            StateManagement.get('TEST');

            expect(mock$window.localStorage.getItem).toHaveBeenCalledWith('hBTEST');
        });

        it('Should get a string.', function () {
            mockItem = '"TEST"';

            expect(StateManagement.get('TEST')).toBe('TEST');
        });

        it('Should get a bool.', function () {
            mockItem = 'false';

            expect(StateManagement.get('TEST')).toBeFalsy();
        });

        it('Should get a number.', function () {
            mockItem = '1';

            expect(StateManagement.get('TEST')).toBe(1);
        });

        it('Should get a array.', function () {
            mockItem = '["TEST"]';

            expect(StateManagement.get('TEST')).toEqual(['TEST']);
        });

        it('Should get a object.', function () {
            mockItem = '{"property":"TEST"}';

            expect(StateManagement.get('TEST')).toEqual({property: 'TEST'});
        });
    });

    describe('.set()', function () {
        it('Should set string.', function () {
            StateManagement.set('TEST', 'TEST');

            expect(mock$window.localStorage.setItem).toHaveBeenCalledWith('hBTEST', '"TEST"');
        });

        it('Should set bool.', function () {
            StateManagement.set('TEST', true);

            expect(mock$window.localStorage.setItem).toHaveBeenCalledWith('hBTEST', 'true');
        });

        it('Should set number.', function () {
            StateManagement.set('TEST', 1);

            expect(mock$window.localStorage.setItem).toHaveBeenCalledWith('hBTEST', '1');
        });

        it('Should set array.', function () {
            StateManagement.set('TEST', ['TEST']);

            expect(mock$window.localStorage.setItem).toHaveBeenCalledWith('hBTEST', '["TEST"]');
        });

        it('Should set object.', function () {
            StateManagement.set('TEST', {property: 'TEST'});

            expect(mock$window.localStorage.setItem).toHaveBeenCalledWith('hBTEST', '{"property":"TEST"}');
        });
    });
});
