module.exports = {

    /**
     * Echo back to sending message. It's usefull for plugin installation test.
     *
     * @param {DOMString} echoMsg echo message for sending android side.
     * @param {Function} successCallback returns echo message as success.
     * @param {Function} errorCallback error callback
     */
    echo: function (echoMsg, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "echo", [echoMsg]);
    },

    /**
     * Get device unique id.
     *
     * @param {Function} successCallback returns device uniqueId.
     * @param {Function} errorCallback error callback.
     */

    getDeviceId: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "getDeviceId");
    },

    /**
     * Reboot device.
     *
     * @param {Function} successCallback returns success.
     * @param {Function} errorCallback error callback.
     */

    rebootDevice: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "rebootDevice");
    },

    /**
     * Afex version on Android OS.
     *
     * @param {Function} successCallback afex version.
     * @param {Function} errorCallback error callback.
     */
    getAfexSdkVersion: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "getAfexSdkVersion");
    },

    /**
     * Android sdk version of Android OS.
     *
     * @param {Function} successCallback android sdk version.
     * @param {Function} errorCallback error callback.
     */
    getAndroidSdkVersion: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "getAndroidSdkVersion");
    },

    /**
     * Set device timezone. Sample format : "Europe/Athens"
     *
     * @param {DOMString} timeZone timezone ("Europe/Athens")
     * @param {Function} successCallback timezone set success.
     * @param {Function} errorCallback error callback.
     */
    setTimeZone: function (timeZone,successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "setTimeZone",[timeZone]);
    },

    /**
     * Set device time. Sample format : 1531207969 -> epoch time 
     * Note: Sets only hour and minute.
     *
     * @param {number} epochTime epochTime (1531207969)
     * @param {Function} successCallback time set success.
     * @param {Function} errorCallback error callback.
     */
    setTime: function (epochTime,successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "setTime",[epochTime]);
    },

    /**
     * Set device date. Sample format : 1531207969 -> epoch time
     * Note: Set only year, month and day
     *
     * @param {number} epochTime epochTime (1531207969)
     * @param {Function} successCallback date set success.
     * @param {Function} errorCallback error callback.
     */
    setDate: function (epochTime,successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "setDate",[epochTime]);
    },

    /**
     * Set device date & time automatic.
     * Device will set time&date through it local settings.
     *
     * @param {boolean} auto  (true | false)
     * @param {Function} successCallback date set success.
     * @param {Function} errorCallback error callback.
     */
    setAutoDateTime: function (auto,successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "setAutoDateTime",[auto]);
    },

    /**
     * Mute or unmute selected stream sound.
     * Stream type can be:
     * STREAM_VOICE_CALL, 
     * STREAM_SYSTEM, 
     * STREAM_RING, 
     * STREAM_MUSIC, 
     * STREAM_ALARM,
     * STREAM_ACCESSIBILITY.
     * @param {number} streamType Stream type to be muted.
     * @param {boolean} isMute Mute or unmute
     * @param {Function} successCallback date set success.
     * @param {Function} errorCallback error callback.
     */
    setMuted: function (streamType, isMute, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "setMuted",[streamType, isMute]);
    },

    /**
     * Retuns volume level of selected stream
     * Stream type can be:
     * STREAM_VOICE_CALL, 
     * STREAM_SYSTEM, 
     * STREAM_RING, 
     * STREAM_MUSIC, 
     * STREAM_ALARM,
     * STREAM_ACCESSIBILITY.
     * Callback -> Returns volume level.
     * @param {number} streamType Stream type of target's volume level.
     * @param {Function} successCallback volume level.
     * @param {Function} errorCallback error callback.
     */
    getStreamVolumeLevel: function (streamType, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "getStreamVolumeLevel",[streamType]);
    },

    /**
     * Silent install for given apk.
     * @param {DOMString} apkPath Full path  apk
     * @param {function} successCallback callback for installation success.
     * @param {function} errorCallback callback for failure.     
     */
    installApplication: function (apkPath, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "installApplication", [apkPath])
    },

    /**
     * Takes screenshot from device.
     * @param {function} successCallback returns file path of saved image.
     * @param {function} errorCallback callback for failure.     
     */
    takeScreenshot: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "takeScreenshot")
    },

    /**
     * Clear all files including directory "AfexScreenshots"
     * @param {function} successCallback success message.
     * @param {function} errorCallback callback for failure.
     * 
     */
    clearScreenshotDir: function(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "clearScreenshotDir")
    },

    /**
     * Read another package's shared pref.
     * @param {DOMString} packageName package of target application.
     * @param {DOMString} name shared preferences name.
     * @param {DOMString} prefFile shared preferences key.
     * @param {function} successCallback success message.
     * @param {function} errorCallback callback for failure.
     */
    readOtherAppsSharedPref: function(packageName, name, prefFile, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "readOtherAppsSharedPref", [packageName, name, prefFile])
    },


    /**
     * lock/unlock device screen.
     * @param {boolean} lock locks device if true otherwise unlocks the device.
     * @param {function} successCallback success message.
     * @param {function} errorCallback callback for failure.
     * 
     */
    setScreenlock: function(lock, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaAfexService", "setScreenlock", [lock])
    }
};