import { NativeModules, NativeAppEventEmitter } from 'react-native'
const { Recording } = NativeModules
NativeAppEventEmitter.addListener('recording', data => {
  if (Recording.onRecording) {
    Recording.onRecording(data)
  }
})
export default Recording
