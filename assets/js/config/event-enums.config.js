angular
    .module('uitoolkit')
    .constant('EventEnums', {
        ENUMS: {
            NOTIFY: 'notify',
            CLEAR_SESSION_DATA: 'clearSessionData',
            RELOAD_DEVICE_DATA: 'reloadDeviceData',
            ON_MENU_ITEM_CLICK: 'onMenuItemClick',
            ON_BURGER_MENU_CLICK: 'onBurgerMenuClick',
            SLIDER_UPDATE: 'sliderUpdate',
            SLIDERS_UPDATED: 'slidersUpdated',
            WIFI_SLIDER_UPDATE: 'wifiSliderUpdate',
            WIFI_SLIDERS_UPDATED: 'wifiSliderFinishedUpdated',
            ADD_REMOVE_COMPARE: 'addRemoveCompare',
            HB_SUBMIT: 'hbSubmit',
            PERFORM_SEARCH: 'perform_search',
            CLEAR_DEVICE_RESULTS: 'CLEAR_DEVICE_RESULTS',
            CONNECT_SEARCH: 'CONNECT_SEARCH',
            CLEAR_DATASWARM_DATA: 'CLEAR_DATASWARM_DATA',
            SELECT_ANY:'selectAny',
            CTA_BUTTON_TRIGGER:'CTA_BUTTON_TRIGGER',
            CTA_BUTTON_UPDATE:'CTA_BUTTON_UPDATE',
            RECEIVE_SEARCH_RESULTS:'RECEIVE_SEARCH_RESULTS',
            $stateChangeStart:'$stateChangeStart',
            SLIDER_UPDATED:'SLIDER_UPDATED',
            STOCK_UPDATED:'STOCK_UPDATED',
            STOCK_TOGGLE:'STOCK_TOGGLE',
            testModePanelToggleState:'testModePanelToggleState',
            SHOW_TOAST:'show-toast',
            SELECTED_DEVICE:'selectedDevice',
            PRODUCT_OFFERINGS:'productOfferings',
            RECOMMENDATIONS_QUERY_UPDATE: 'RECOMMENDATIONS_QUERY_UPDATE',
            RECOMMENDATIONS_RESULTS_UPDATE: 'RECOMMENDATIONS_RESULTS_UPDATE',
            RECOMMENDATIONS_ANIMATION_SHOW: 'RECOMMENDATIONS_ANIMATION_SHOW',
            RECOMMENDATIONS_ANIMATION_HIDE: 'RECOMMENDATIONS_ANIMATION_HIDE',
            RECOMMENDATIONS_RESULTS_INITIAL_RANGE: 'RECOMMENDATIONS_RESULTS_INITIAL_RANGE',
            RECOMMENDATIONS_TOP_RESULT_SKU: 'RECOMMENDATIONS_TOP_RESULT_SKU',
            SPECS_SLIDER_CLOSED: 'SPECS_SLIDER_CLOSED',
            SPECS_SLIDER_OPENED: 'SPECS_SLIDER_OPENED',
            SPECS_SLIDER_RESET: 'SPECS_SLIDER_RESET',
            SPECS_SLIDER_CTA: 'SPECS_SLIDER_CTA',
            SPECS_SLIDER_RECOMMENDATION_COUNT: 'SPECS_SLIDER_RECOMMENDATION_COUNT',
            BUNDLE_OBJECT_ADDED: 'BUNDLE_OBJECT_ADDED',
            BUNDLE_OBJECT_REMOVED: 'BUNDLE_OBJECT_REMOVED',
            BUNDLE_CATEGORY_ADDED: 'BUNDLE_CATEGORY_ADDED',
            BUNDLE_CATEGORY_REMOVED: 'BUNDLE_CATEGORY_REMOVED',
            SWIPER_SLIDE_CHANGE: 'SWIPER_SLIDE_CHANGE',
            BASKET_SUMMARY_MODAL_OPEN: 'BASKET_SUMMARY_MODAL_OPEN',
            SELECT_PROPOSITION: 'SELECT_PROPOSITION',
            SELECT_ATTACHMENT: 'SELECT_ATTACHMENT',
            UNSELECT_ATTACHMENT: 'UNSELECT_ATTACHMENT',
            // When a user selects an item (e.g. presses its select button)
            // we can broadcast details about it. This doesn't indicate
            // that is has been added to the basket specifically just that
            // it has been "selected" in some way.
            SELECT_ITEM: 'SELECT_ITEM',
            MULTI_LINE_UPDATE_CUSTOMERS: 'MULTI_LINE_UPDATE_CUSTOMERS',
            SELECT_DATA: 'SELECT_DATA', // Used with action mode property on PDP and device calc
            SELECT_DEVICE: 'SELECT_DEVICE', // Used with action mode property on PDP and device calc
            SIMPLE_HB_SUBMIT_RENDER: 'SIMPLE_HB_SUBMIT_RENDER',
            BASKET_BUILDER_RESIZE: 'BASKET_BUILDER_RESIZE'
        }
    });
