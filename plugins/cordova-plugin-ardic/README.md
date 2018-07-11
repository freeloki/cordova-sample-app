# cordova-plugin-ardic
## Ardic Cordova Android Plugin

**This plugin works well on Android devices integrated with [AFEX](https://www.ardictech.com/products-services/afex/) only.**

## Installation

In your application directory, write:
```
cordova add cordova-plugin-ardic
```

## AFEX API List

- [Echo](#echo)
- [Device Unique Id](#device-unique-id)
- [Reboot](#reboot)
- [Afex Sdk Version](#afex-sdk-version)
- [Set Time Zone](#set-time-zone)
- [Set Date](#set-date)
- [Set Time](#set-time)
- [Set Auto Date Time](#set-auto-date-time)
- [Set Muted](#set-muted)
- [Get Stream Volume Level](#get-stream-volume-level)

## Usage

### File API's
This plugin uses the [Cordova File Plugin](https://github.com/apache/cordova-plugin-file) as is. You can check documentation for file API's from [here](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html). You don't have to install file plugin. This plugin includes the file plugin itself.


### AFEX API's

**CordovaAfexService** is root instance for API's.

#### Echo

echo is a simple test api for plugin installation. It echoes back the received message.

```javascript
/**
 * Echo back to sending message. It's useful for plugin installation test.
 *
 * @param {DOMString} echoMsg echo message for sending android side.
 * @param {Function} successCallback returns echo message as success.
 * @param {Function} errorCallback error callback
 */
echo: function (echoMsg, successCallback, errorCallback)

```

##### Sample Usage:

```javascript
CordovaAfexService.echo(echoMsg, function (echoValue) {
  alert("Callback Echo Message Success: " + echoValue) // should alert echo message.
}, function (error) {
  alert("Callback Message Failure  : " + error) // write down error message.
})
```

#### Device Unique Id

Returns device unique identifier.

```javascript
/**
 * Get device unique id.
 *
 * @param {Function} successCallback returns device uniqueId.
 * @param {Function} errorCallback error callback.
 */

getDeviceId: function (successCallback, errorCallback)
```

##### Sample Usage:

```javascript
CordovaAfexService.getDeviceId(function (deviceId) {
  alert("Callback message success device id: " + deviceId)
}, function (errorCallback) {
  alert("Callback message error  : " + errorCallback)
})
```


#### Reboot

Reboots device.

```javascript
/**
 * Reboot device.
 *
 * @param {Function} successCallback returns success.
 * @param {Function} errorCallback error callback.
 */

rebootDevice: function (successCallback, errorCallback)

```

##### Sample Usage:

```javascript
CordovaAfexService.rebootDevice(function (successCallback) {
  alert("Callback Message Success: " + successCallback)
}, function (errorCallback) {
  alert("Callback Message Failure  : " + errorCallback)
})
```

#### Afex SDK Version

Returns AFEX version of Android OS.

```javascript
/**
 * Afex version on Android OS.
 *
 * @param {Function} successCallback afex version.
 * @param {Function} errorCallback error callback.
 */
getAfexSdkVersion: function (successCallback, errorCallback)
```

##### Sample Usage:

```javascript
CordovaAfexService.getAfexSdkVersion(function (afexVersion) {
  alert("Afex Sdk Version: " + afexVersion)
}, function (errorCallback) {
  alert("Error Occured:\n " + errorCallback)
})
```
#### Set Time Zone

Sets device timezone.

```javascript
/**
 * Set device timezone. Sample format : "Europe/Athens"
 *
 * @param {DOMString} timeZone timezone ("Europe/Athens")
 * @param {Function} successCallback timezone set success.
 * @param {Function} errorCallback error callback.
 */
setTimeZone: function (timeZone,successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "CordovaAfexService", "setTimeZone",[timeZone]);
}

```
##### Sample Usage:

```javascript
CordovaAfexService.setTimeZone("Europe/Athens", function (newTimeZone) {
  alert("New TimeZone: " + newTimeZone)
}, function (errorCallback) {
  alert("Error Occured:\n " + errorCallback)
})

```

#### Set Date

Sets device date.**Only sets year,month and day.**

```javascript
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
}
```

##### Sample Usage:

```javascript

epochTime = 1531230783 // (Tuesday, July 10, 2018 4:53:03 PM GMT+03:00)
CordovaAfexService.setDate(epochTime, function (responseDate) {
  alert("Set Date Callback: " + responseDate)
}, function (errorCallback) {
  alert("Error Occured:\n " + errorCallback)
})

```

#### Set Time

Sets device time. **Only hours and minutes.**

```javascript
/**
 * Set device time. Sample format : 1531207969 -> epoch time
 * Note: Set only hour and minute.
 *
 * @param {number} epochTime epochTime (1531207969)
 * @param {Function} successCallback date set success.
 * @param {Function} errorCallback error callback.
 */
setTime: function (epochTime,successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "CordovaAfexService", "setTime",[epochTime]);
}
```

##### Sample Usage:

```javascript

epochTime = 1531230783 // (Tuesday, July 10, 2018 4:53:03 PM GMT+03:00)
CordovaAfexService.setTime(epochTime, function (responseTime) {
  alert("Set Time Callback: " + responseTime)
}, function (errorCallback) {
  alert("Error Occured:\n " + errorCallback)
})

```

#### Set Auto Date Time

Sets device date and time automatically.

```javascript
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
}
```

##### Sample Usage:

```javascript
CordovaAfexService.setAutoDateTime(true, function (successCallback) {
  alert("Set Auto Date&Time Callback: " + successCallback)
}, function (errorCallback) {
  alert("Error Occured:\n " + errorCallback)
})
```

#### Set Muted
Mute/unmute device sound.

##### Stream Types:
- STREAM_VOICE_CALL = 0
- STREAM_SYSTEM = 1
- STREAM_RING = 2
- STREAM_MUSIC = 3
- STREAM_ALARM = 4
- STREAM_NOTIFICATION = 5
- STREAM_DTMF = 8
- STREAM_ACCESSIBILITY = 10

For more info about android audio manager you can check [here.](https://developer.android.com/reference/android/media/AudioManager)

 ```javascript
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
}
```

##### Sample Usage:

if __*isMute*__ is true mutes selected stream otherwise unmutes the stream.

```javascript
var STREAM_MUSIC = 3 // mutes stream. isMute=false
CordovaAfexService.setMuted(STREAM_MUSIC , false , function (successCallback) {
  alert("Callback: " + successCallback)
}, function (errorCallback) {
  alert("Error Occured:\n " + errorCallback)
})
```

#### Get Stream Volume Level

Returns volume level of selected stream.

```javascript
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
}
```

##### Sample Usage:
```javascript
var streamType = STREAM_MUSIC
CordovaAfexService.getStreamVolumeLevel(streamType, function (volume) {
  alert("Volume: " + volume)
}, function (errorCallback) {
  alert("Error Occured:\n " + errorCallback)
})
```


#### [Back To Top](#ardic-cordova-android-plugin)
