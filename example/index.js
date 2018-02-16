import React, { Component } from 'react'
import { WebView } from 'react-native'
import Recording from 'react-native-recording'

export default class Main extends Component {
  componentDidMount() {
    Recording.init({
      bufferSize: 4096,
      sampleRate: 44100,
      bitsPerChannel: 16,
      channelsPerFrame: 1,
    })

    const listener = Recording.addRecordingEventListener(data => {
      if (this.webView) {
        this.webView.postMessage(data)
      }
    })

    Recording.start()
  }

  componentWillUnmount() {
    Recording.stop()
  }

  render() {
    return <WebView
      ref={ref => this.webView = ref}
      style={{ flex: 1 }}
      source={require('./webview.html')} />
  }
}
