#import "Recording.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <AVFoundation/AVFoundation.h>

@implementation Recording {
    AudioQueueRef queue;
    AudioQueueBufferRef buffer;
    id data[4096];
    int bufferSize;
    bool isRecording;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(start:(int)sampleRate bufferSize:(int)bufferSize) {
    if (isRecording) {
        return;
    }
    
    AudioStreamBasicDescription description;
    description.mReserved = 0;
    description.mSampleRate = sampleRate;
    description.mBitsPerChannel = 16;
    description.mChannelsPerFrame = 1;
    description.mFramesPerPacket = 1;
    description.mBytesPerFrame = 2;
    description.mBytesPerPacket = 2;
    description.mFormatID = kAudioFormatLinearPCM;
    description.mFormatFlags = kAudioFormatFlagIsSignedInteger;
    
    AudioQueueNewInput(&description, inputCallback, (__bridge void *)self, NULL, NULL, 0, &queue);
    AudioQueueAllocateBuffer(queue, bufferSize * 2, &buffer);
    AudioQueueEnqueueBuffer(queue, buffer, 0, NULL);
    AudioQueueStart(queue, NULL);
    
    self->bufferSize = bufferSize;
    isRecording = true;
}

void inputCallback(void *inUserData,
                   AudioQueueRef inAQ,
                   AudioQueueBufferRef inBuffer,
                   const AudioTimeStamp *inStartTime,
                   UInt32 inNumberPacketDescriptions,
                   const AudioStreamPacketDescription *inPacketDescs) {
    [(__bridge Recording*)inUserData processInputBuffer:inBuffer queue:inAQ];
}

- (void) processInputBuffer:(AudioQueueBufferRef) inBuffer queue:(AudioQueueRef) queue {
    SInt16 *audioData = inBuffer->mAudioData;
    int count = inBuffer->mAudioDataByteSize / sizeof(SInt16);
    for (int i = 0; i < self->bufferSize; i++) {
        data[i] = [NSNumber numberWithInt:audioData[i]];
    }
    NSArray *array = [NSArray arrayWithObjects:data count:count];
    [self.bridge.eventDispatcher sendAppEventWithName:@"recording"
                                                 body:array];
    if (isRecording) {
        AudioQueueEnqueueBuffer(queue, inBuffer, 0, NULL);
    }
}

RCT_EXPORT_METHOD(stop) {
    int a = 0;
}

@end
