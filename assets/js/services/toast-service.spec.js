describe('ToastService', function () {
    var $rootScope;
    var mockEventEnums;
    /** @type {ToastService} */
    var ToastService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockEventEnums = {
            ENUMS: {
                SHOW_TOAST: 'show-toast'
            }
        };
    });

    beforeEach(inject(function (_ToastService_, _$rootScope_) {
        ToastService = _ToastService_;
        $rootScope = _$rootScope_;
    }));

    describe('.error()', function () {
        it('Should call local .show with type \'error\'', function () {
            spyOn($rootScope, '$broadcast');

            ToastService.error();

            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
    });

    describe('.warn()', function () {
        it('Should call local .show with type \'warning\'', function () {
            spyOn($rootScope, '$broadcast');

            ToastService.warn();

            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
    });

    describe('.show()', function () {
        it('Should call $rootScope.$broadcast with type \'error\'', function () {
            spyOn($rootScope, '$broadcast');

            ToastService.show('error');

            expect($rootScope.$broadcast).toHaveBeenCalledWith(mockEventEnums.ENUMS.SHOW_TOAST, {
                type: 'error',
                title: undefined,
                msg: undefined,
                options: {}
            });
        });
    });

    describe('.show()', function () {
        it('Should call $rootScope.$broadcast with toast', function () {
            var toast = {
                type: 'warn',
                title: 'Error Toast Title',
                msg: 'Error Toast Message',
                options: {
                    timeOut: 5000
                }
            };

            spyOn($rootScope, '$broadcast');

            ToastService.show(toast.type, toast.title, toast.msg, toast.options);

            expect($rootScope.$broadcast).toHaveBeenCalledWith(mockEventEnums.ENUMS.SHOW_TOAST, toast);
        });
    });
});
