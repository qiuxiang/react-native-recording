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
    private final ReactApplicationContext reactContext;
    private AudioRecord audioRecord;
    private boolean isRecording;
    private int bufferSize;
    private Thread recordingThread;

    RecordingModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Recording";
    }

    @ReactMethod
    public void start(int sampleRate, int bufferSize) {
        if (isRecording || (recordingThread != null && recordingThread.isAlive())) {
            return;
        }

        this.bufferSize = bufferSize;
        audioRecord = new AudioRecord(
                MediaRecorder.AudioSource.MIC,
                sampleRate,
                AudioFormat.CHANNEL_IN_MONO,
                AudioFormat.ENCODING_PCM_16BIT,
                bufferSize * 2);
        audioRecord.startRecording();
        isRecording = true;
        recordingThread = new Thread(new Runnable() {
            public void run() {
                recording();
            }
        }, "RecordingThread");
        recordingThread.start();
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
        short data[] = new short[bufferSize];
        while (isRecording && !reactContext.getCatalystInstance().isDestroyed()) {
            WritableArray array = Arguments.createArray();
            audioRecord.read(data, 0, bufferSize);
            for (float value : data) {
                array.pushInt((int) value);
            }
            sendEvent("recording", array);
        }
    }

    private void sendEvent(String eventName, Object params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
