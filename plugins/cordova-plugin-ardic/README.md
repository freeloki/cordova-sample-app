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
