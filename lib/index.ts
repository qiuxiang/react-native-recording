import { NativeModules, NativeEventEmitter } from "react-native";
const { Recording } = NativeModules;
const eventEmitter = new NativeEventEmitter(Recording);

interface options {
  bufferSize: number,
  sampleRate: number,
  bitsPerChannel: 8 | 16,
  channelsPerFrame: 1 | 2,
}

export default {
  // TODO: params check
  init: (options: options) => Recording.init(options),
  start: () => Recording.start(),
  stop: () => Recording.stop(),
  addRecordingEventListener: (listener: (data: Float32Array) => void) =>
    eventEmitter.addListener("recording", listener),
};
