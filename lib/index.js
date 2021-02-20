import { NativeModules, NativeEventEmitter } from "react-native";
const { Recording } = NativeModules;
const eventEmitter = new NativeEventEmitter(Recording);
export default {
    // TODO: params check
    init: (options) => Recording.init(options),
    start: () => Recording.start(),
    stop: () => Recording.stop(),
    addRecordingEventListener: (listener) => eventEmitter.addListener("recording", listener),
};
