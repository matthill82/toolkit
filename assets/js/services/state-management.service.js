angular
    .module('uitoolkit')
    .service('StateManagement', StateManagement);

/**
 * @param {$rootScope.Scope} $rootScope
 * @param $window
 * @param {JrdService} JrdService
 * @param {ToastService} ToastService
 * @param config
 * @constructor
 */
function StateManagement($rootScope, $window, JrdService, ToastService, config, honeybeeService) {
    //---
    // Needs a good amount of work, this guy is managing the state for the entire app
    // Should probably think about using $rootScope instead of local storage or having an option
    //
    //---
    var localStorage = null;
    var prefix = 'hB';
    var SEPARATOR = ',';
    var BASKET_SEPARATOR = '|--|';
    var COMPARE_BASKET = 'compareBasket';
    var KEY_USER = 'user';
    var KEY_USER_DATA_USAGE = 'dataUsage';
    var KEY_QUESTIONS = 'questions';
    var KEY_JOURNEY_START = 'journeyStart';
    var KEY_JOURNEY_DIRECTION = 'journeyDirection';
    var KEY_EXTRAS1 = 'extras1';  // keyboard/monitors
    var KEY_EXTRAS2 = 'extras2';
    var KEY_PAGE_TITLE = 'pageTitle';
    var KEY_MULTI_LINE = 'multiLine';
    var KEY_RESUME_JOURNEY = 'resumeJourney';
    var ACCOUNT_NAME = 'account';

    if (config.store_data_as_local_storage === 'true') {
        localStorage = $window['localStorage'];
    } else if (config.store_data_as_session === 'true') {
        localStorage = $window.sessionStorage;//$window['localStorage'];
    } else {
        localStorage = $window.sessionStorage;
    }

    if (honeybeeService) {
        var honeybeeStore = new (honeybeeService('HbStore'))();
        var honeybeeStorage = new (honeybeeService('HbStorage'))('session');
    }

    this.get = get;
    this.set = set;
    this.saveData = saveData;
    this.removeData = removeData;
    this.getData = getData;
    this.getSessionData = getSessionData;
    this.setCustomers = setCustomers;
    this.getCustomers = getCustomers;
    this.clear = clear;
    this.clearDataExceptLogic = clearDataExceptLogic;
    this.setDevice = setDevice;
    this.getDevice = getDevice;
    this.setExtrasOne = setExtrasOne;
    this.getExtrasOne = getExtrasOne;
    this.setExtrasTwo = setExtrasTwo;
    this.getExtrasTwo = getExtrasTwo;
    this.setPlan = setPlan;
    this.getPlan = getPlan;
    this.setUser = setUser;
    this.getUser = getUser;
    this.setCompareBasketItem = setCompareBasketItem;
    this.removeCompareBasketItem = removeCompareBasketItem;
    this.getCompareBasket = getCompareBasket;
    this.getCompareBasketNumberOfItems = getCompareBasketNumberOfItems;
    this.setBasketItem = setBasketItem;
    this.removeBasketItem = removeBasketItem;
    this.getBasket = getBasket;
    this.setDataUsage = setDataUsage;
    this.getDataUsage = getDataUsage;
    this.questionsFindIndex = questionsFindIndex;
    this.questionsGet = questionsGet;
    this.questionsAdd = questionsAdd;
    this.questionsRemove = questionsRemove;
    this.questionsRemoveAfter = questionsRemoveAfter;
    this.questionsGetDataPoints = questionsGetDataPoints;
    this.journeySetDirection = journeySetDirection;
    this.journeyGetDirection = journeyGetDirection;
    this.journeyGetDirectionKeys = journeyGetDirectionKeys;
    this.journeySetStart = journeySetStart;
    this.journeyGetStart = journeyGetStart;
    this.setPageTitle = setPageTitle;
    this.getPageTitle = getPageTitle;
    this.getAccountData = getAccountData;
    this.setResumeJourney = setResumeJourney;

    /**
     * @param {string} key
     * @returns {Object|Array|string|number}
     */
    function get(key) {
        return localStorage && angular.fromJson(localStorage.getItem(prefix + key));
    }

    /**
     * @param {string} key
     * @param {*} value
     */
    function set(key, value) {
        saveData(key, value);
    }

    /**
     * @param {string} key
     * @returns {string|null}
     */
    function getData(key) {
        return localStorage ? localStorage.getItem(prefix + key) : null;
    }

    /**
     * @param {string} key
     * @returns {string|null}
     */
    function getSessionData(key) {
        return sessionStorage ? sessionStorage.getItem(key) : null;
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    function setCustomers(data) {

        return saveData(KEY_MULTI_LINE, {customers: data});

    }

    /**
     *
     * @returns {Array|*}
     */
    function getCustomers() {
        var rawData;
        var dataObj;
        var customersData;

        rawData = getData(KEY_MULTI_LINE);

        dataObj = rawData ? angular.fromJson(rawData) : null;

        customersData = dataObj ? dataObj.customers : [];

        return customersData;
    }

    function getDevice(key) {
        return getData(key);
    }

    function getExtrasOne() {
        return getData(KEY_EXTRAS1);
    }

    function getExtrasTwo() {
        return getData(KEY_EXTRAS2);
    }

    function getPlan(key) {
        return getData(key);
    }

    function getUser() {
        return getData(KEY_USER);
    }

    function saveData(key, value) {
        //ensure we have consistent input
        if (angular.isUndefined(value)) {
            value = null;
        } else {
            value = angular.toJson(value);
        }

        try {
            localStorage.setItem(prefix + key, value);
        } catch (e) {
            console.error('error saving data', e);

            ToastService.error('Local Storage', 'Could not save data.', {timeOut: 2000});
        }

        return this;
    }

    function getBasket(key) {
        var data = getData(key);

        return data ? data.split(BASKET_SEPARATOR) : null;
    }

    function getCompareBasket(key) {
        var data = getData(key);

        return data ? data.split(SEPARATOR) : null;
    }

    function getCompareBasketNumberOfItems() {
        var data = getData(COMPARE_BASKET);
        var dataArray;

        data = data ? data : 0;
        dataArray = data ? data.split(SEPARATOR) : 0;

        return dataArray.length;
    }

    function setBasketItem(key, value) {
        var savedData = getData(key);

        try {
            if (savedData === null || savedData.length === 0) {
                localStorage.setItem(prefix + key, value);
            } else {
                localStorage.setItem(prefix + key, savedData + BASKET_SEPARATOR + value);
            }
        } catch (e) {
            //insert error handling
            console.error('error setting basket', e);

            ToastService.error('Local Storage', 'Could saving basket.', {timeOut: 2000});
        }

        return this;
    }

    function setCompareBasketItem(key, value) {
        var savedCompareData = getData(key);

        try {
            if (savedCompareData === null || savedCompareData.length === 0) {
                localStorage.setItem(prefix + key, value);
            } else {
                localStorage.setItem(prefix + key, savedCompareData + SEPARATOR + value);
            }
        } catch (e) {
            //insert error handling
            console.error('error setting compare', e);

            ToastService.error('Local Storage', 'Could not save compare.', {timeOut: 2000});
        }

        $rootScope.$broadcast('compareBasketUpdate');

        return this;
    }

    function removeBasketItem(key, itemId) {
        var basketArray;
        var c;
        var item;
        var savedData = getData(key);
        var stringBasket;

        if (savedData !== null) {
            basketArray = savedData.split(BASKET_SEPARATOR);

            if (basketArray != null) {
                for (c = 0; c < basketArray.length; c++) {
                    item = basketArray[c];
                    if (item.indexOf(itemId) > -1) {
                        basketArray.splice(c, 1);
                    }
                }
            }

            stringBasket = basketArray.join(BASKET_SEPARATOR);

            try {
                localStorage.setItem(prefix + key, stringBasket);
            } catch (e) {
                console.error('removed basket item', e);

                ToastService.error('Local Storage', 'Could not remove item from basket.', {timeOut: 2000});
            }
        }
    }

    function removeCompareBasketItem(key, deviceId) {
        var c;
        var compareArray;
        var item;
        var savedCompareData = getData(key);

        if (savedCompareData !== null) {
            compareArray = savedCompareData.split(SEPARATOR);

            if (compareArray != null) {
                for (c = 0; c < compareArray.length; c++) {
                    item = compareArray[c];
                    if (item.indexOf(deviceId) > -1) {
                        compareArray.splice(c, 1);
                    }
                }
            }

            try {
                localStorage.setItem(prefix + key, compareArray);
            } catch (e) {
                console.error('removed compare item', e);

            }
        }

        $rootScope.$broadcast('compareBasketUpdate');
    }

    function setPlan(key, value) {
        if (angular.isUndefined(value)) {
            value = null;
        } else {
            value = angular.toJson(value);
        }

        try {
            localStorage.setItem(prefix + key, value);
        } catch (e) {
            console.error('error', e);

            ToastService.error('Local Storage', 'Could not save data:' + key, {timeOut: 2000});
        }

        return this;
    }

    function setUser(value) {
        $rootScope.$broadcast(prefix + KEY_USER, value);

        if (angular.isUndefined(value)) {
            value = null;
        } else {
            value = angular.toJson(value);
        }

        try {
            localStorage.setItem(prefix + KEY_USER, value);
        } catch (e) {
            console.error('error setting the user profile data', e);

            ToastService.error('Local Storage', 'Could not save data.', {timeOut: 2000});
        }

        return this;
    }

    function setDevice(key, value) {
        //ensure we have consistent input
        if (angular.isUndefined(value)) {
            value = null;
        } else {
            value = angular.toJson(value);
        }

        try {
            localStorage.setItem(prefix + key, value);
        } catch (e) {
            console.error('error', e);

            ToastService.error('Device', 'Could not save device.', {timeOut: 2000});
        }

        return this;
    }

    function setExtrasOne(value) {
        var c;
        var extrasKey = prefix + KEY_EXTRAS1;
        var item;
        var itemExists;
        var savedExtrasData = getExtrasOne();
        var savedExtrasDataArray;

        try {
            if (savedExtrasData === null || savedExtrasData.length === 0) {
                localStorage.setItem(extrasKey, value);
            } else {
                if (savedExtrasData != null) {
                    itemExists = false;
                    savedExtrasDataArray = savedExtrasData.split(SEPARATOR);

                    if (savedExtrasDataArray != null) {
                        for (c = 0; c < savedExtrasDataArray.length; c++) {
                            item = savedExtrasDataArray[c];
                            if (item.indexOf(value) > -1) {
                                savedExtrasDataArray.splice(c, 1);
                                savedExtrasDataArray = savedExtrasDataArray.join(SEPARATOR);
                                itemExists = true;
                                break;
                            }
                        }
                    }

                    if (!itemExists) {
                        localStorage.setItem(extrasKey, savedExtrasDataArray + SEPARATOR + value);
                    } else {
                        if (savedExtrasDataArray !== null) {
                            if (item.length > -1) {
                                localStorage.setItem(extrasKey, savedExtrasDataArray);
                            }
                        }

                    }
                }
            }
        } catch (e) {
            //insert error handling
            console.error('error setting extras1', e);

            ToastService.error('Local Storage', 'Error saving extras.', {timeOut: 2000});
        }

        return this;
    }

    function setExtrasTwo(value) {
        if (angular.isUndefined(value)) {
            value = null;
        } else {
            value = angular.toJson(value);
        }

        try {
            localStorage.setItem(KEY_EXTRAS2, value);
        } catch (e) {
            console.error('error', e);

            ToastService.error('Product', 'Could not save product.', {timeOut: 2000});
        }
        return this;
    }

    function removeData(key) {
        try {
            localStorage.removeItem(prefix + key);
        } catch (e) {
            //insert error handling
            console.error('ahhh my face', e);

            ToastService.error('Local Storage', 'Could not remove data.', {timeOut: 2000});
        }
    }

    function clearDataExceptLogic() {
        var key;

        for (key in localStorage) {
            // Only delete storage items keys for this app
            if (localStorage.hasOwnProperty(key)
                && key.substr(0, prefix.length) === prefix
                && key !== prefix + KEY_USER
            ) {
                try {
                    localStorage.removeItem(key);
                } catch (e) {
                    //insert error handling
                    ToastService.error('Local Storage', 'Could not remove data.', {timeOut: 2000});
                }
            }
        }

        if (honeybeeStore && honeybeeStore.clear && honeybeeStorage && honeybeeStorage.removeItem) {
            try {
                honeybeeStore.clear();
                honeybeeStorage.removeItem('cws-ref');
            } catch (e) {
                ToastService.error('Honeybee Storage', 'Could not remove data.', {timeOut: 2000});
            }
        }

        return this;
    }

    function clear() {
        var key;

        for (key in localStorage) {
            // Only delete storage items keys for this app
            if (localStorage.hasOwnProperty(key) && key.substr(0, prefix.length) === prefix) {
                try {
                    localStorage.removeItem(key);
                } catch (e) {
                    //insert error handling
                    ToastService.error('Local Storage', 'Could not remove data.', {timeOut: 2000});
                }
            }
        }

        return this;
    }

    function setDataUsage(key, value) {
        var data = getDataUsage();

        data[key] = value;

        //ensure we have consistent input
        if (angular.isUndefined(data)) {
            data = null;
        } else {
            data = angular.toJson(data);
        }

        try {
            localStorage.setItem(prefix + KEY_USER_DATA_USAGE, data);
        } catch (e) {
            console.error('error saving user data usage', e);

            ToastService.error('Local Storage', 'Could not save user data usage.', {timeOut: 2000});
        }

        return this;
    }

    function getDataUsage() {
        var data = angular.fromJson(getData(KEY_USER_DATA_USAGE));

        data = data ? data : {};

        return data;
    }

    function questionsGet() {
        var data = getData(KEY_QUESTIONS);

        data = data ? angular.fromJson(data).pages : [];

        return data;
    }

    function questionsSet(data) {

        saveData(KEY_QUESTIONS, {'pages': data});

    }

    function questionsAdd(url, qId, aObj) {
        var data = questionsGet();
        var matchIndex = questionsFindIndex(data, url);

        if (matchIndex === null) {
            matchIndex = data.length;
            data[matchIndex] = {};
            data[matchIndex][url] = {};
        }

        data[matchIndex][url][qId] = data[matchIndex][url][qId] || {};
        data[matchIndex][url][qId][aObj.id] = {
            dataPoints: aObj.dataPoints,
            dataPointsRules: aObj.dataPointsRules
        };

        questionsSet(data);
    }

    function questionsRemove(url, qId, aId) {
        var data = questionsGet();

        var matchIndex = questionsFindIndex(data, url);

        if (matchIndex !== null) {
            if (angular.isDefined(aId)) {
                if (data[matchIndex] && data[matchIndex][url] && data[matchIndex][url][qId]) {
                    // Remove single answer
                    delete data[matchIndex][url][qId][aId];
                }
            } else {
                // Remove the whole question
                delete data[matchIndex][url][qId];
            }
        }

        questionsSet(data);
    }

    function questionsRemoveAfter(url) {
        var data = questionsGet();

        var matchIndex = questionsFindIndex(data, url);

        if (matchIndex !== null) {
            data.length = matchIndex + 1;
        }

        questionsSet(data);

    }

    function questionsFindIndex(data, url) {
        var i;

        for (i = 0; i < data.length; i++) {
            if (data[i][url]) {
                return i;
            }
        }

        return null;
    }

    function questionsGetDataPoints(journey) {
        var answerDataPoints;
        var answerDataPointsRules;
        var featuresValuesIndexMap = {};
        var storedData = questionsGet();
        var returnedDataPoints = {};
        var mappings = JrdService.get(journey, 'feature-mappings');

        // Feature Values Index Map -> Search Attribute||Processor||Medium -> 13
        angular.forEach(mappings, function (feature) {
            featuresValuesIndexMap[feature.featureCategory] = featuresValuesIndexMap[feature.featureCategory] || {};
            featuresValuesIndexMap[feature.featureCategory][feature.groupName]
                = featuresValuesIndexMap[feature.featureCategory][feature.groupName] || {};
            featuresValuesIndexMap[feature.featureCategory][feature.groupName][feature.groupValue]
                = featuresValuesIndexMap[feature.featureCategory][feature.groupName][feature.groupValue]
                || feature.index;
        });

        function featureValuesIndexes(category, feature, list) {
            var indexes = [];

            angular.forEach(list, function (item) {
                indexes.push(featuresValuesIndexMap[category][feature][item]);
            });

            return indexes;
        }

        function featureIndexedRange(category, feature, min, max) {
            var values = [];

            angular.forEach(featuresValuesIndexMap[category][feature], function (index, key) {
                if (index >= min && index <= max) {
                    values.push(key);
                }
            });

            return values;
        }

        angular.forEach(storedData, function (page) {
            angular.forEach(page, function (url) {
                angular.forEach(url, function (question) {
                    angular.forEach(question, function (answer) {
                        if (answer.dataPoints) {
                            //
                            // Answer
                            //
                            answerDataPoints = csvPipedParser(answer.dataPoints);
                            answerDataPointsRules = csvPipedParser(answer.dataPointsRules);

                            angular.forEach(answerDataPoints, function (value, category) {
                                angular.forEach(answerDataPoints[category], function (value, feature) {
                                    var min;
                                    var max;
                                    var range1;
                                    var range2;
                                    var rule = 'override'; // default rule

                                    if (answerDataPointsRules &&
                                        answerDataPointsRules[category] &&
                                        answerDataPointsRules[category][feature]
                                    ) {
                                        rule = answerDataPointsRules[category][feature][0];
                                    }

                                    //init
                                    returnedDataPoints[category] = returnedDataPoints[category] || {};
                                    returnedDataPoints[category][feature] = returnedDataPoints[category][feature] || [];

                                    if (rule === 'add') {
                                        angular.forEach(answerDataPoints[category][feature], function (featureValue) {
                                            if (returnedDataPoints[category][feature].indexOf(featureValue) === -1) {
                                                returnedDataPoints[category][feature].push(featureValue);
                                            }
                                        });
                                    } else if (rule === 'override') {

                                        returnedDataPoints[category][feature] = answerDataPoints[category][feature];

                                    } else if (rule === 'highest') {
                                        range1 = featureValuesIndexes(
                                            category,
                                            feature,
                                            returnedDataPoints[category][feature]
                                        );
                                        range2 = featureValuesIndexes(
                                            category,
                                            feature,
                                            answerDataPoints[category][feature]
                                        );

                                        if (range1.length) {
                                            // Calculate new range
                                            min = Math.max(
                                                Math.min.apply(null, range1),
                                                Math.min.apply(null, range2)
                                            );
                                            max = Math.max(
                                                Math.max.apply(null, range1),
                                                Math.max.apply(null, range2)
                                            );

                                            returnedDataPoints[category][feature] = featureIndexedRange(
                                                category,
                                                feature,
                                                min,
                                                max
                                            );
                                        } else {
                                            angular.copy(
                                                answerDataPoints[category][feature],
                                                returnedDataPoints[category][feature]
                                            );
                                        }
                                    }

                                });
                            });
                        }
                    });
                });
            });
        });

        function csvPipedParser(data) {
            var csvItems;
            var parsed = {};

            if (data) {
                csvItems = data.split(',');

                csvItems.forEach(function (item) {
                    var parts = item.split('||');

                    parsed[parts[0]] = parsed[parts[0]] || {};
                    parsed[parts[0]][parts[1]] = parsed[parts[0]][parts[1]] || [];
                    parsed[parts[0]][parts[1]].push(parts[2]);
                });
            }

            return parsed;
        }

        return returnedDataPoints;
    }

    function journeySetDirection(newDirection) {
        saveData(KEY_JOURNEY_DIRECTION, newDirection);
    }

    function journeyGetDirection() {
        var direction = getData(KEY_JOURNEY_DIRECTION);

        return direction ? angular.fromJson(direction) : journeyGetDirectionKeys().BACK;
    }

    function journeyGetDirectionKeys() {
        return {
            BACK: 'back',
            NEXT: 'next'
        };
    }

    function journeySetStart(journeyStart) {
        saveData(KEY_JOURNEY_START, journeyStart);
    }

    function journeyGetStart() {
        var journeyStart = getData(KEY_JOURNEY_START);

        return journeyStart ? angular.fromJson(journeyStart) : null;
    }

    /**
     * @param {string} pageTitle
     */
    function setPageTitle(pageTitle) {
        saveData(KEY_PAGE_TITLE, pageTitle);
    }

    /**
     * @returns {string|null}
     */
    function getPageTitle() {
        return angular.fromJson(getData(KEY_PAGE_TITLE));
    }

    function getAccountData() {
        return (honeybeeStore && honeybeeStore.get) ? honeybeeStore.get(ACCOUNT_NAME) : {};
    }

    function setResumeJourney(data) {
        saveData(KEY_RESUME_JOURNEY, data);
    }

}
