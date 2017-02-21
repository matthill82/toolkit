angular
    .module('uitoolkit')
    .service('MultiLineService', MultiLineService);

/**
 *
 * @param {$rootScope.Scope} $rootScope
 * @param $window
 * @param {object} EventEnums
 * @param {StateManagement} StateManagement
 * @constructor
 */
function MultiLineService($rootScope, $window, EventEnums, StateManagement) {
    var customers = [];

    this.setCustomers = setCustomers;
    this.getCustomers = getCustomers;
    this.removeCustomer = removeCustomer;
    this.toggleCustomer = toggleCustomer;

    this.setDevice = setDevice;
    this.setSelections = setSelections;
    this.setCustomerSelectedPaymentOption = setCustomerSelectedPaymentOption;

    this.setDataMB = setDataMB;
    this.getDataMB = getDataMB;

    this.createGroup = createGroup;
    this.setCustomerGroup = setCustomerGroup;
    this.removeCustomerFromGroup = removeCustomerFromGroup;
    this.findNewGroupId = findNewGroupId;


    /**
     *
     * @private
     */
    function _init() {

        customers = StateManagement.getCustomers();

        //
        // Event listeners
        //
        $rootScope.$on($window.ENUMS.EVENTS.RECEIVE.CLEAR_SESSION_DATA_CONTAINER, function (){
            _clearCustomers();
        });
    }


    _init();


    /**
     *
     * @param newCustomers
     */
    function setCustomers(newCustomers) {
        customers = newCustomers;

        _saveCustomers();
    }

    /**
     *
     */
    function _saveCustomers() {

        StateManagement.setCustomers(customers);

        $rootScope.$broadcast(EventEnums.ENUMS.MULTI_LINE_UPDATE_CUSTOMERS, customers);

    }

    /**
     *
     * @private
     */
    function _clearCustomers() {

        customers = [];

    }

    /**
     *
     * @returns {*}
     */
    function getCustomers() {

        return customers;

    }

    /**
     *
     * @param customerId
     */
    function removeCustomer(customerId) {
        customers.splice(customerId, 1);

        _saveCustomers();
    }

    /**
     *
     * @param customerId
     */
    function toggleCustomer(customerId) {

        customers[customerId].selected = !customers[customerId].selected;

        _saveCustomers();
    }

    /**
     *
     * @param deviceObj
     * @param deviceColor
     * @param deviceDisplayName
     */
    function setDevice(deviceObj, deviceColor, deviceDisplayName) {
        angular.forEach(customers, function (customer) {
            if (customer.selected) {
                customer.selections.device = deviceObj;
                customer.selections.deviceColor = deviceColor;
                customer.selections.deviceDisplayName = deviceDisplayName;
            }
        });

        _saveCustomers();
    }

    /**
     *
     * @param customerId
     * @param selectionsKey
     * @param selectionsValue
     */
    function setSelections(customerId, selectionsKey, selectionsValue) {
        if (selectionsKey) {
            customers[customerId].selections[selectionsKey] = selectionsValue;
        } else {
            customers[customerId].selections = selectionsValue;
        }

        _saveCustomers();
    }

    /**
     *
     * @param data
     */
    function setCustomerSelectedPaymentOption(customerId, paymentOptionKey) {
        setSelections(customerId, 'hBofferingType', paymentOptionKey);
    }

    /**
     *
     * @param dataMB
     * @param slidersObj
     */
    function setDataMB(dataMB, slidersObj) {
        angular.forEach(customers, function (customer) {
            if (customer.selected) {
                customer.selections.hBdataMB = dataMB;
                customer.selections.hBdataMBSliders = slidersObj;
            }
        });

        _saveCustomers();
    }

    /**
     *
     * @param customerIndex
     * @returns {{dataMB: (number|string), slidersObj: (selections.hBdataMBSliders|{slider-master, slider-online, slider-upload, slider-apps, slider-music, slider-video})}}
     */
    function getDataMB(customerIndex) {
        return {
            dataMB: customers[customerIndex].selections.hBdataMB,
            slidersObj: customers[customerIndex].selections.hBdataMBSliders
        };
    }

    /**
     *
     * @param customerId
     */
    function removeCustomerFromGroup(customerId) {
        customers[customerId].groupId = null;

        _saveCustomers();
    }

    /**
     *
     * @param customerId
     * @param customerNewGroupId
     */
    function setCustomerGroup(customerId, customerNewGroupId) {
        customers[customerId].groupId = customerNewGroupId;

        _saveCustomers();
    }

    /**
     *
     * @param customerId
     * @param newGroupId
     */
    function createGroup(customerId, newGroupId) {
        customers[customerId].groupId = newGroupId;

        _saveCustomers();
    }

    /**
     *
     * @param maxGroupsCount
     * @returns {*}
     */
    function findNewGroupId(maxGroupsCount) {
        var newGroupId;
        var existingGroupIds = [];
        var existingGroupIdsLength;
        var i;

        angular.forEach(customers, function (customer) {
            if (angular.isNumber(customer.groupId)) {
                existingGroupIds.push(customer.groupId);
            }
        });

        existingGroupIdsLength = existingGroupIds.length;
        existingGroupIds.sort();


        if (existingGroupIdsLength) {
            // Find a hole in the array
            if (Math.min.apply(null, existingGroupIds) > 0) {
                // The first index is not 0
                return 0;
            }


            for (i = 1; i < existingGroupIdsLength; i++) {
                if (existingGroupIds[i] - existingGroupIds[i - 1] > 1) {
                    // Hole found - group id one greater than the previous item
                    return existingGroupIds[i - 1] + 1;
                }
            }

            // No holes
            newGroupId = existingGroupIds[existingGroupIdsLength - 1] + 1;
            if (newGroupId < maxGroupsCount) {
                // group id 1 greater than the max existing
                return newGroupId;
            }

            // No more available group ids
            return null;
        }

        // No groups created so far -> group id 0
        return 0;
    }
}
