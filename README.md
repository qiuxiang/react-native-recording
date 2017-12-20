# react-native-recording [![npm version][version-badge]][npm]
React Native audio recording module used for DSP

## Install
```
$ npm i react-native-recording
$ react-native link react-native-recording
```

## Usage
```javascript
import Recording from 'react-native-recording'

Recording.init(8000, 1024)
Recording.start()
Recording.on('recording', data => console.log(data))
```

[npm]: https://www.npmjs.com/package/react-native-recording
[version-badge]: https://badge.fury.io/js/react-native-recording.svg
