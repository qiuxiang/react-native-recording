package com.qiuxiang.rn;

import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;

class RecordingModule extends ReactContextBaseJavaModule {
    private AudioRecord audioRecord;
    private boolean isRecording;
    private int bufferSize = 2048;

    RecordingModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Recording";
    }

    @ReactMethod
    public void start(int sampleRate, int bufferSize) {
        this.bufferSize = bufferSize;
        audioRecord = new AudioRecord(
                MediaRecorder.AudioSource.MIC,
                sampleRate,
                AudioFormat.CHANNEL_IN_MONO,
                AudioFormat.ENCODING_PCM_16BIT,
                bufferSize);
        audioRecord.startRecording();
        isRecording = true;
        new Thread(new Runnable() {
            public void run() {
                recording();
            }
        }, "RecordingThread").start();
    }

    @ReactMethod
    public void stop() {
        if (audioRecord != null) {
            isRecording = false;
            audioRecord.stop();
            audioRecord.release();
        }
    }

    private void recording() {
        byte data[] = new byte[bufferSize];
        while (isRecording) {
            WritableArray array = Arguments.createArray();
            audioRecord.read(data, 0, bufferSize);
            for (byte value : data) {
                array.pushInt(value);
            }
            sendEvent("recording", array);
        }
    }

    private void sendEvent(String eventName, Object params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
