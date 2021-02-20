interface options {
    bufferSize: number;
    sampleRate: number;
    bitsPerChannel: 8 | 16;
    channelsPerFrame: 1 | 2;
}
declare const _default: {
    init: (options: options) => any;
    start: () => any;
    stop: () => any;
    addRecordingEventListener: (listener: (data: Array<Number>) => void) => import("react-native").EmitterSubscription;
};
export default _default;
