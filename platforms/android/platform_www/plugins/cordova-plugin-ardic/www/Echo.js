cordova.define("cordova-plugin-ardic.echo", function(require, exports, module) {
module.exports = {
    echo: function (name, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Echo", "echo", [name]);
    },

    getDeviceId: function(successCallback,errorCallback){
        cordova.exec(successCallback, errorCallback, "Echo", "getDeviceId");
    },

    rebootDevice: function(successCallback,errorCallback){
        cordova.exec(successCallback,errorCallback,"Echo","rebootDevice");
    }
};
});
