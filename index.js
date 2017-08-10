import {
  NativeModules,
  NativeEventEmitter,
} from 'react-native'

const {Recording} = NativeModules
const eventEmitter = new NativeEventEmitter(Recording)

Recording.on = eventEmitter.addListener.bind(eventEmitter)

export default Recording
