angular.module('uitoolkit')
    .service('QuestionsContainerService', QuestionsContainerService);

/**
 *
 * @param {StateManagement} StateManagement
 * @returns {{updateLocalStorage: updateLocalStorage}}
 * @constructor
 */
function QuestionsContainerService(StateManagement) {
    var SEPARATOR = ':::';

    this.updateLocalStorage = updateLocalStorage;


    function updateLocalStorage(qTitle, qFeatures) {
        var isAlreadyInBasket = false;
        var questionTitle = qTitle.replace(/\s+/g, '');
        var dataPointFeatures = stringifyJson(qFeatures);
        var questionsBasket = StateManagement.getBasket('questions');
        var i;
        var item;

        if (questionsBasket !== null) {
            for (i = 0; i < questionsBasket.length; i++) {
                item = questionsBasket[i];

                if (item.contains(serialiseQuestion(questionTitle, dataPointFeatures))) {
                    isAlreadyInBasket = true;
                    StateManagement.removeBasketItem('questions', serialiseQuestion(questionTitle, dataPointFeatures));
                }
            }
            if (isAlreadyInBasket === false) {
                StateManagement.setBasketItem('questions', serialiseQuestion(questionTitle, dataPointFeatures));
            }
        } else {
            StateManagement.setBasketItem('questions', serialiseQuestion(questionTitle, dataPointFeatures));
        }
    }

    function stringifyJson(json) {
        json = JSON.stringify(json, false);
        json.replace(/\\([\s\S])|([a-z])/ig, '\\$1$2');
        return json;
    }

    function serialiseQuestion(questionTitle, dataPointFeatures) {
        return questionTitle + SEPARATOR + dataPointFeatures;
    }
}
