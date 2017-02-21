angular
    .module('uitoolkit')
    .service('UtilityService', UtilityService);

function UtilityService($state) {

    this.aemKvMapString = aemKvMapString;
    this.aemMapListValuesString = aemMapListValuesString;
    this.findUpScope = findUpScope;
    this.isNumeric = isNumeric;
    this.pipeSeparatedList = pipeSeparatedList;
    this.getByPropertyValue = getByPropertyValue;
    this.getFirstEntry = getFirstEntry;
    this.getProposition = getProposition;
    this.goToRoute = goToRoute;

    /**
     * Turn AEM key value map String into an object.
     *
     * @example
     *  "key1::value||key2::value||key3"
     *
     *  Would produce
     *
     *  {
     *      key1: 'value',
     *      key2: 'value',
     *      key3: null
     *  }
     *
     * @param {string} string
     * @returns {object}
     */
    function aemKvMapString(string) {
        var map = {};

        if (angular.isString(string)) {
            string.split('||').forEach(function (item) {
                if (item) {
                    item = item.split('::');
                    if (angular.isDefined(item[1])) {
                        map[item[0].trim()] = item[1].trim();
                    } else {
                        map[item[0].trim()] = null;
                    }
                }
            });
        }

        return map;
    }

    /**
     * Map an AEM List String into simple objects.
     *
     * @example
     *  "one::two||three::four", ['key1', 'key2']
     *
     *  Would produce
     *
     *  [
     *      {
     *          key1: 'one',
     *          key2: 'two'
     *      }, {
     *          key1: 'three',
     *          key2: 'four'
     *      }
     *  ]
     *
     * @param {string} string
     * @param {string[]} mapTo
     * @returns {object[]}
     */
    function aemMapListValuesString(string, mapTo) {
        var out = [];

        if (angular.isString(string)) {
            string.split('||').forEach(function (item) {
                var map = {};

                if (item) {
                    item.split('::').forEach(function (itemValue, index) {
                        if (mapTo[index]) {
                            map[mapTo[index]] = itemValue;
                        }
                    });

                    out.push(map);
                }
            });
        }

        return out;
    }

    /**
     * @param {$rootScope.Scope} scope
     * @param {string} property
     * @returns {*}
     */
    function findUpScope(scope, property) {
        if (angular.isObject(scope) && scope.hasOwnProperty(property)) {
            return scope[property];
        } else if (angular.isObject(scope.$parent)) {
            return findUpScope(scope.$parent, property);
        }
    }

    /**
     * @param {*} input
     * @returns {boolean}
     */
    function isNumeric(input) {
        // From jQuery: https://github.com/jquery/jquery/blob/bf48c21d225c31f0f9b5441d95f73615ca3dcfdb/src/core.js#L206
        return !angular.isArray(input) && (input - parseFloat(input) + 1) >= 0;
    }

    /**
     * @param string
     * @returns {string[]}
     */
    function pipeSeparatedList(string) {
        return string.split('||').filter(function (value) {
            return !!value;
        });
    }

    /**
     *
     * @param {[]} arr
     * @param {string} prop
     * @param {string|[]} val
     * @returns {*}
     */
    function getByPropertyValue(arr, prop, val) {
        if (!angular.isArray(arr)) return;
        return arr.filter(function (com) {
            return angular.isArray(val) ? val.indexOf(com[prop]) != -1
                : com[prop] === val;
        })[0];
    }

    /**
     *
     * @param arrayOfKeys
     * @param key
     * @param objectArray
     * @returns {{}}
     */
    function getFirstEntry(arrayOfKeys, key, objectArray) {
        var obj = {};
        arrayOfKeys.some(function (prop) {
            obj = getByPropertyValue(objectArray, key, prop);
            return !!obj
        });
        return obj;
    }

    /**
     *
     * @param propositions
     * @param propositionKeys
     * @returns {*}
     */
    function getProposition(propositions, propositionKeys) {
        if (propositions.length === 0) return {};
        if (propositions.length > 0 && !propositionKeys || propositionKeys.length === 0) return propositions[0];
        return getFirstEntry(propositionKeys, 'propositionType', propositions);
    }

    /**
     *
     * @param {string} route
     */
    function goToRoute (route) {
        $state.go(route);
    }

}

