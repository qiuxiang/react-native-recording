import React, { Component } from 'react'
import { View, WebView } from 'react-native'
import Recording from 'react-native-recording'

export default class Main extends Component {
  componentDidMount() {
    Recording.start(8000, 1024)
    Recording.onRecording = this.recording.bind(this)
  }

  componentWillUnmount() {
    NativeModules.Recording.stop()
  }

  recording(data) {
    this.webView.postMessage(data)
  }

  render() {
    return <WebView
      ref={ref => this.webView = ref}
      style={{flex: 1}}
      source={require('./webview.html')} />
  }
}
