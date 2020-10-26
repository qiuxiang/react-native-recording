# react-native-recording [![npm version][version-badge]][npm]

React Native audio recording module used for DSP with Android + iOS

<img src="https://user-images.githubusercontent.com/1709072/34551117-9258a0de-f151-11e7-9795-67dda1cbe6f6.png" width=300 />

## Install

```
$ npm i react-native-recording
```

## Usage

```javascript
import { PermissionsAndroid } from "react-native";
import Recording from "react-native-recording";

await PermissionsAndroid.requestMultiple([
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
]);

Recording.init({
  bufferSize: 4096,
  sampleRate: 44100,
  bitsPerChannel: 16,
  channelsPerFrame: 1,
});

const listener = Recording.addRecordingEventListener((data) =>
  console.log(data)
);

Recording.start();

// stop recording
Recording.stop();
listener.remove();
```

## Microphone request for iOS 10 and above

As of iOS 10.0, you must declare an intention to access a microphone. Add *NSMicrophoneUsageDescription* key and declaration value in *Info.plist*.

```
<dict>
    ...
	<key>NSMicrophoneUsageDescription</key>
	<string>This app uses the microphone to record the soundscape.</string>
    ...
</dict>
```

[npm]: https://www.npmjs.com/package/react-native-recording
[version-badge]: https://badge.fury.io/js/react-native-recording.svg
