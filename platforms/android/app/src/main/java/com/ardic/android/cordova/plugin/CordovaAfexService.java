package com.ardic.android.cordova.plugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import android.text.TextUtils;
import android.util.Log;
import javafx.scene.web.WebView;

import com.ardic.android.managers.command.ICommandManager;
import com.ardic.android.managers.command.CommandManager;
import com.ardic.android.managers.devicestatus.DeviceStatusManager;
import com.ardic.android.managers.devicestatus.IDeviceStatusManager;
import com.ardic.android.managers.systemconfig.ISystemConfigManager;
import com.ardic.android.managers.systemconfig.SystemConfigManager;
import com.ardic.android.managers.appinstall.IAppInstallManager;
import com.ardic.android.managers.appinstall.AppInstallManager;

import java.util.Calendar;
import java.io.File;

import com.ardic.android.exceptions.AfexException;

import android.content.Context;
import android.media.AudioManager;

/**
 * This class echoes a string called from JavaScript.
 */
public class CordovaAfexService extends CordovaPlugin {

    private final static String TAG = "CordovaAfexService";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("echo".equals(action)) {
            String message = args.getString(0);
            this.echo(message, callbackContext);
            return true;
        } else if("getDeviceId".equals(action)) {
            this.getDeviceId(callbackContext);
            return true;
        } else if("rebootDevice".equals(action)) {
            this.rebootDevice(callbackContext);
            return true;
        } else if("getAfexSdkVersion".equals(action)) {
            this.getAfexSdkVersion(callbackContext);
        } else if("setTimeZone".equals(action)) {
            String timeZone = args.getString(0);
            this.setTimeZone(timeZone, callbackContext);
        } else if("setTime".equals(action)) {
            long epochTime = args.getLong(0);
            this.setTime(epochTime, callbackContext);
        } else if("setDate".equals(action)) {
            long epochTime = args.getLong(0);
            this.setDate(epochTime, callbackContext);
        } else if("setAutoDateTime".equals(action)) {
            boolean auto = args.getBoolean(0);
            this.setAutoDateTime(auto, callbackContext);
        } else if("setMuted".equals(action)) {
            int streamType = args.getInt(0);
            boolean isMute = args.getBoolean(1);
            this.setMuted(streamType, isMute, callbackContext);
        } else if("getStreamVolumeLevel".equals(action)) {
            int streamType = args.getInt(0);
            this.getStreamVolumeLevel(streamType, callbackContext);
        } else if("installApplication".equals(action)){
            String apkPath = args.getString(0);
            this.installApplication(apkPath, callbackContext);
        }
        return false;
    }

    private void echo(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void getDeviceId(CallbackContext callbackCtx) {

        try {
            IDeviceStatusManager deviceStatusManager = DeviceStatusManager.getInterface(webView.getContext());

                if(deviceStatusManager != null){
                    String deviceId = deviceStatusManager.getDeviceUniqueId();
                    if(!TextUtils.isEmpty(deviceId)){
                        callbackCtx.success(deviceId);
                    } else {
                        callbackCtx.error("Error occured. Empty device id");
                    }
                }
            } catch (AfexException e) {
            callbackCtx.error(e.toString());
            }

    }


    private void rebootDevice(CallbackContext callbackContext) {

        try {
            ICommandManager mCommandManager = CommandManager.getInterface(webView.getContext());

                if(mCommandManager != null) {

                    mCommandManager.reboot(false, false);
                } else {
                    callbackContext.error("Error occured. Command Manager is null.");
                    return;
                }

            } catch (AfexException e) {
                    callbackContext.error(e.toString());
                    return;
            }

            callbackContext.success("Command received successfully.Rebooting device...");
        }



    /** ##  Device Status Wrappers  ## **/

    private void getAfexSdkVersion(CallbackContext callbackContext) {

        IDeviceStatusManager deviceStatusManager = DeviceStatusManager.getInterface(webView.getContext());
        String versionStr;

        try {
        
            if(deviceStatusManager != null) {
                versionStr = String.valueOf(deviceStatusManager.getAfexSdkVersion());

                if(!TextUtils.isEmpty(versionStr)) {
                    callbackContext.success(versionStr);
                    return;
                } 
            }

        } catch (AfexException e) {
            callbackContext.error(e.toString());
            return;
        }

        callbackContext.error(" Cannot read afex version ");

    }

    private void getAndroidSdkVersion(CallbackContext callbackContext) {

        IDeviceStatusManager deviceStatusManager = DeviceStatusManager.getInterface(webView.getContext());
        String versionStr;

        try {
        
            if( deviceStatusManager != null) {
                versionStr = String.valueOf(deviceStatusManager.getAndroidSdkVersion());

                if(!TextUtils.isEmpty(versionStr)) {
                    callbackContext.success(versionStr);
                    return;
                } 
            }

        } catch (AfexException e) {
            callbackContext.error(e.toString());
            return;
        }

        callbackContext.error(" Cannot read afex version ");

    }

    private void setTimeZone(String timeZone, CallbackContext callbackContext) {

        try {
            ISystemConfigManager systemConfigManager = SystemConfigManager.getInterface(webView.getContext());

            /**
             * Set auto date & time false.
             */
            if( systemConfigManager != null && !TextUtils.isEmpty(timeZone) && systemConfigManager.setAutoDateTime(false)) {

                        Log.i(TAG,"Changing timeZone to -> " + timeZone);
                        if(systemConfigManager.setTimeZone(timeZone)) {
                            String successMsg = "Timezone successfully changed to " + timeZone;
                            callbackContext.success(successMsg);
                            return;
                        }
            }

        } catch (AfexException e) {
            callbackContext.error(e.toString());
            return;
        }
        callbackContext.error("Error occured. Check timeZone and try again.");
    }

    private boolean setTime(long epochTime, CallbackContext callbackContext) {

        Log.i(TAG,"Epoch Time:" + epochTime);

        try {

            ISystemConfigManager systemConfigManager = SystemConfigManager.getInterface(webView.getContext());

            /**
             * Set auto date & time false.
             */
            if(systemConfigManager != null && epochTime > 0 && systemConfigManager.setAutoDateTime(false)) {

                Calendar mCalendar = Calendar.getInstance();
        
                mCalendar.setTimeInMillis(epochTime * 1000);
        
                int hours = mCalendar.get(Calendar.HOUR_OF_DAY);
                int minutes = mCalendar.get(Calendar.MINUTE);
        
                Log.i(TAG, "New Time [ " + hours + ":" + minutes + " ]");

                if (systemConfigManager.setTime(hours, minutes)) {
                    callbackContext.success("New Time [ " + hours + ":" + minutes + " ]");
                    return true;
                }

            }

        } catch (AfexException e) {
            callbackContext.error(e.toString());
            return false;
        }

        callbackContext.error("Error occured. Check time and try again.");

        return false;
    }

    private boolean setDate(long epochTime, CallbackContext callbackContext) {

        Log.i(TAG,"Epoch Time:" + epochTime);

        try {

            ISystemConfigManager systemConfigManager = SystemConfigManager.getInterface(webView.getContext());

            /**
             * Set auto date & time false.
             */
            if(systemConfigManager != null && epochTime > 0 && systemConfigManager.setAutoDateTime(false)) {

                Calendar mCalendar = Calendar.getInstance();
        
                mCalendar.setTimeInMillis(epochTime * 1000);
        
                int year = mCalendar.get(Calendar.YEAR);
                int month = mCalendar.get(Calendar.MONTH);
                int day = mCalendar.get(Calendar.DAY_OF_MONTH);
        
                Log.i(TAG, "New Date [yyyy/mm/dd] [ " + year + "/" + (month+1) + "/"+ day +" ]");

                if (systemConfigManager.setDate(year, month, day)) {
                    callbackContext.success("New Date [yyyy/mm/dd] [ " + year + "/" + (month+1) + "/"+ day +" ]");
                    return true;
                }

            }

        } catch (AfexException e) {
            callbackContext.error(e.toString());
            return false;
        }

        callbackContext.error("Error occured. Check date and try again.");

        return false;
    }

    private boolean setAutoDateTime(boolean auto, CallbackContext callbackContext) {

        Log.i(TAG,"Auto Date Time:" + auto);

        try {

            ISystemConfigManager systemConfigManager = SystemConfigManager.getInterface(webView.getContext());

            /**
             * Set auto date & time false.
             */
            if(systemConfigManager != null) {

                boolean result = systemConfigManager.setAutoDateTime(auto);
                callbackContext.success("Auto Date Time Success!");
                return result;
            }

        } catch (AfexException e) {
            callbackContext.error(e.toString());
            return false;
        }
        callbackContext.error("Error occured. Check time and try again.");
        return false;
    }

    private void setMuted(int streamType, boolean isMute, CallbackContext callbackContext) {

        AudioManager mAudioManager = (AudioManager) webView.getContext().getSystemService(Context.AUDIO_SERVICE); 

        Log.i(TAG,"setMuted:" + streamType + " isMute: " + isMute);


        if(mAudioManager != null) {

            if(getStreamType(streamType) > -1) {

                if(isMute){

                    /**
                     * Mute device sound for all streams.
                     * STREAM_VOICE_CALL, STREAM_SYSTEM, STREAM_RING, STREAM_MUSIC, STREAM_ALARM or STREAM_ACCESSIBILITY.
                     */

                    mAudioManager.adjustStreamVolume(streamType,AudioManager.ADJUST_MUTE,0);
                    callbackContext.success("Mute Stream Success: " + streamType);
                    return;

                } else {

                    /**
                     * unmute device sound for all streams.
                     * STREAM_VOICE_CALL, STREAM_SYSTEM, STREAM_RING, STREAM_MUSIC, STREAM_ALARM or STREAM_ACCESSIBILITY.
                     */

                    mAudioManager.adjustStreamVolume(streamType,AudioManager.ADJUST_UNMUTE,0);
                    callbackContext.success("Unmute Stream Success: " + streamType);
                    return;
                }

            } else {
                callbackContext.error("Invalid Stream Type: " + streamType);
                return;
            }
        }

        callbackContext.error("Error Occured Please Try Again.");
    }

    private void getStreamVolumeLevel(int streamType, CallbackContext callbackContext) {

        AudioManager mAudioManager = (AudioManager) webView.getContext().getSystemService(Context.AUDIO_SERVICE); 

        if(mAudioManager != null) {

            if(getStreamType(streamType) > -1) {

                /**
                 * Mute device sound for all streams.
                 * STREAM_VOICE_CALL, STREAM_SYSTEM, STREAM_RING, STREAM_MUSIC, STREAM_ALARM or STREAM_ACCESSIBILITY.
                 */

                int volume = mAudioManager.getStreamVolume(streamType);
                callbackContext.success(volume);
                return;

            } else {
                callbackContext.error("Invalid Stream Type: " + streamType);
                return;
            }
        }
        callbackContext.error("Error Occured Please Try Again.");
    }

    private void installApplication(String apkPath, CallbackContext callbackContext) {

        try {
            IAppInstallManager appInstallManager = AppInstallManager.getInterface(webView.getContext());

            if(appInstallManager != null && !TextUtils.isEmpty(apkPath) && new File(apkPath).exists()) {

                int result = appInstallManager.install(apkPath, IAppInstallManager.INSTALL_REPLACE_EXISTING);

                if(result == IAppInstallManager.INSTALL_SUCCEEDED) {
                    callbackContext.success("Installation successfull : " + result);
                } else {
                    callbackContext.error("Installation failure with code:  " + result);
                }
                return;
            }
        } catch (AfexException e) {
            callbackContext.error(e.toString());
        }
        callbackContext.error("Unknown error occured. Please be sure your apk exists on the given path.");
    }

    private int getStreamType(int streamType) {

        int result = -1;
        switch (streamType) {

            case 0: 
                result = AudioManager.STREAM_VOICE_CALL;
                break;
            case 1:
                result = AudioManager.STREAM_SYSTEM;
                break;
            case 2:
                result = AudioManager.STREAM_RING;
                break;
            case 3:
                result = AudioManager.STREAM_MUSIC;
                break;
            case 4:
                result = AudioManager.STREAM_ALARM;
                break;
            case 5:
                result = AudioManager.STREAM_NOTIFICATION;
                break;
            case 8:
                result = AudioManager.STREAM_DTMF;
                break;
            case 10:
                result = AudioManager.STREAM_ACCESSIBILITY;
                break;
            default:
                result = -1;
        }

        return result;
    }

}