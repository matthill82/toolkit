angular
    .module('uitoolkit')
    .service('UserService', UserService);

/**
 *
 * @param {StateManagement} StateManagement
 * @constructor
 */
function UserService(StateManagement) {
    var user;

    this.getLocation = getLocation;
    this.getMaxDepth = getMaxDepth;
    this.getUser = getUser;
    this.setUser = setUser;

    _init();


    /**
     *
     * @returns {String}
     */
    function getLocation() {
        return user.depth1[0];
    }

    /**
     * @returns {number}
     */
    function getMaxDepth() {
        if (!user || !angular.isArray(user.depth) || !user.depth.length) {
            return 0;
        }

        return user.depth.map(function (val) {
            return parseInt(val);
        }).reduce(function (prev, current) {
            return prev < current ? current : prev;
        });
    }

    /**
     *
     * @returns {*}
     */
    function getUser() {
        return user;
    }

    /**
     *
     * @param newUser
     */
    function setUser(newUser) {
        user = newUser;

        // just to be able to land on any page
        StateManagement.setUser(user);
    }

    /**
     *
     * @private
     */
    function _init() {
        // just to be able to land on any page
        var storedUser;

        storedUser = StateManagement.getUser();

        if (storedUser) {
            user = angular.fromJson(storedUser);
        }
    }
}

