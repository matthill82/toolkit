/**
 * Created by matthew on 05/01/2017.
 */

angular.module('uitoolkit')
    .factory('TrackedButtonFactory', trackedButtonFactory);

function trackedButtonFactory() {

    /**
     * @param username
     * @param application
     * @param contentRead
     * @constructor
     * @description : Tracking constructor, takes 2 params and binds to constructor
     */
    function TrackingConstructor(username, application, contentRead) {
        this.username = username;
        this.application = application;
        this.contentRead = contentRead;
    }

    /**
     * @memberOf {TrackingConstructor}
     * @param username
     * @param application
     * @param contentRead
     * @constructor
     * @description : Tracked object constructor function
     */
    function TrackedObject(username, application, contentRead) {
        TrackingConstructor.call(this, username, application, contentRead);
    }


    Object.defineProperty(TrackedObject.prototype, 'username', {
        get: function () {
            return this.username;
        }
    });

    Object.defineProperty(TrackedObject.prototype, 'application', {
        get: function () {
            return this.application;
        }
    });

    Object.defineProperty(TrackedObject.prototype, 'contentRead', {
        get: function () {
            return this.contentRead;
        }
    });

    /**
     * @memberOf {TrackedObject}
     * @type {TrackingConstructor}
     */
    TrackedObject.prototype = Object.create(TrackingConstructor.prototype);

    return TrackedObject;

}

