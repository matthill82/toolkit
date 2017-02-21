angular
    .module('uitoolkit')
    .service('DsEventService', DsEventService);

/**
 * @param {StateManagement} StateManagement
 * @param {ds} ds
 */
function DsEventService(StateManagement, ds) {
    var journey_complete = false;
    var journey_started = false;

    this.completeJourney = completeJourney;
    this.logout = logout;
    this.sendDetectEvent = sendDetectEvent;
    this.sendEvent = sendEvent;
    this.sendEvents = sendEvents;
    this.sendTimeEvent = sendTimeEvent;
    this.sessionRestart = sessionRestart;
    this.sessionStart = sessionStart;
    this.setJourneyExit = setJourneyExit;
    this.setJourneyType = setJourneyType;
    this.showToast = showToast;

    /**
     * Complete journey, must sessionReset() to start a new journey.
     */
    function completeJourney() {
        if (!journey_complete) {
            journey_complete = true;

            sendTimeEvent('journey_complete');
        }
    }

    /**
     * Send logout related events (does not log the user out from out from DS).
     */
    function logout() {
        sendEvents({
            navigation_logout: true,
            navigation_logout_screen: StateManagement.getPageTitle()
        });
    }

    /**
     * Detect what kind of event data to send based on the value.
     *
     * @param {string} event
     * @param {string|null} value
     */
    function sendDetectEvent(event, value) {
        switch(value) {
        case 'TS':
        case '':
        case null:
            sendTimeEvent(event);
            break;

        case 'TRUE':
            sendEvent(event, true);
            break;


        default:
            sendEvent(event, value);
        }
    }

    /**
     * @param {string} event
     * @param data
     */
    function sendEvent(event, data) {
        ds.then(function (ds) {
            ds.sendEvent(event, data);
        });
    }

    /**
     * @param {object} events
     */
    function sendEvents(events) {
        ds.then(function (ds) {
            ds.sendEvents(events);
        });
    }

    /**
     * @param {string} event
     */
    function sendTimeEvent(event) {
        sendEvent(event, new Date());
    }

    /**
     * @param {object} user
     */
    function sessionRestart(user) {
        setJourneyExit();

        sendEvent('journey_restart', true);

        sessionStart(user);
    }

    /**
     * @param {object} user
     */
    function sessionStart(user) {
        journey_complete = false;
        journey_started = true;

        ds.then(function (ds) {
            ds.resetSession(function () {
                ds.sendEvents({
                    'employee-number': user.depth0,
                    'employee-branch-number': user.depth1[0],
                    'depth0Id': user.depth0,
                    'depth0Name': user.meta.depth0Name,
                    'depth1Id': user.depth1[0],
                    'depth1Name': user.meta.depth1Name[0],
                    'depth2Id': user.depth2[0],
                    'depth2Name': user.meta.depth2Name[0],
                    'depth3Id': user.depth3[0],
                    'depth3Name': user.meta.depth3Name[0],
                    'depth4Id': user.depth4[0],
                    'depth4Name': user.meta.depth4Name[0]
                });
            });
        });
    }

    /**
     * If journey is incomplete then fire journey_exit & journey_exit_gate.
     *
     * Note that this is called by sessionRestart()
     */
    function setJourneyExit() {
        if (journey_started && !journey_complete) {
            sendTimeEvent('journey_exit');
            if (StateManagement.getPageTitle()) {
                sendEvent('journey_exit_gate', StateManagement.getPageTitle());
            }
        }
    }

    /**
     * @param {string} type
     */
    function setJourneyType(type) {
        sendEvent('journey_type', type);
    }

    /**
     * @param {{type: string, msg: string, title: string}} toast
     */
    function showToast(toast) {
        sendEvents({
            toast_type: toast.type,
            toast_message: toast.msg
        });
    }
}
