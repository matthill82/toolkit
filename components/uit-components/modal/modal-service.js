angular.module('uitoolkit')
    .factory('UitModalService', UitModalService);

function UitModalService($animate, $document, $compile, $rootScope, $q) {

    var DEFAULT_TYPE = 'confirm';
    var DEFAULT_SIZE = 'md';

    return {
        showModal: showModal
    };

    function showModal(options) {

        var body = angular.element($document[0].body);

        options.type = options.type || DEFAULT_TYPE;
        options.size = options.size || DEFAULT_SIZE;

        var deferred = $q.defer();

        var modalScope = $rootScope.$new();

        options.params.submit = submit;
        options.params.dismiss = dismiss;

        angular.extend(modalScope, options);

        var template = renderComponent(options);
        var modalElement = $compile(template)(modalScope);

        $animate.enter(modalElement, body);

        return deferred.promise;

        function cleanUpClose(promiseAction, result) {
            $animate.leave(modalElement)
                .then(function () {
                    if (promiseAction === 'reject') deferred.reject();
                    if (promiseAction === 'resolve') deferred.resolve(result);
                    modalScope.$destroy();
                });
        }

        function submit(result) {
            cleanUpClose('resolve', result);
        }

        function dismiss() {
            cleanUpClose('reject');
        }

    }

    function renderComponent(options) {
        if (options.type !== 'custom') {
            return '<uit-modal' + renderBindings(options) + '></uit-modal>';
        } else if (options.component) {
            return renderCustomComponent(options);
        } else {
            throw Error('No component has been specified');
        }
    }

    function renderCustomComponent(options) {
        var path = 'params.';
        return '<uit-modal' + renderBindings(options) + '>' +
            '<' + options.component + renderBindings(options.params, path) + '>' +
            '</' + options.component + '></uit-modal>';
    }

    function renderBindings(params, path) {
        path = path || '';
        var bindings = '';
        for (var param in params) {
            bindings = bindings.concat(' ' + param + '="' + path + param + '"');
        }
        return bindings;
    }

}
