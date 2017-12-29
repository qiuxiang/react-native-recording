# react-native-recording [![npm version][version-badge]][npm]
React Native audio recording module used for DSP with Android + iOS

<img src="https://user-images.githubusercontent.com/1709072/34430766-8ac4d584-eca3-11e7-88b9-3914c8c9cb3f.png" width=300 />


## Install
```
$ npm i react-native-recording
$ react-native link react-native-recording
```

## Usage
```javascript
import Recording from 'react-native-recording'

Recording.init({
  bufferSize: 4096,
  sampleRate: 44100,
  bitsPerChannel: 16,
  channelsPerFrame: 1,
})
Recording.addRecordingEventListener(data => console.log(data))
Recording.start()
```

[npm]: https://www.npmjs.com/package/react-native-recording
[version-badge]: https://badge.fury.io/js/react-native-recording.svg
