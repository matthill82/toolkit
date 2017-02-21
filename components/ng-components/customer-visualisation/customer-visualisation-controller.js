angular.module('uitoolkit')
    .controller('CustomerVisualisationController', CustomerVisualisationController);

/**
 * @param {StateManagement} StateManagement
 */

function CustomerVisualisationController(StateManagement) {
    var model = this;

    model.$onInit = function () {
        var model = this;
        model.obj = getParsedData('accountData');
    };

    function getParsedData(key) {
        return JSON.parse(StateManagement.getData(key));
    }
}


