import React, { Component } from 'react'
import {
  View,
  WebView,
  NativeModules,
  NativeAppEventEmitter } from 'react-native'

export default class Main extends Component {
  componentDidMount() {
    NativeModules.Recording.start(8000, 1024)
    NativeAppEventEmitter.addListener('recording', this.recording.bind(this))
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
