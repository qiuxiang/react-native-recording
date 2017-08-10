import React, {Component} from 'react'
import {WebView} from 'react-native'
import Recording from 'react-native-recording'

export default class Main extends Component {
  componentDidMount() {
    Recording.init(44100, 4096)
    Recording.start()
    Recording.on('recording', data => {
      if (this.webView) {
        this.webView.postMessage(data)
      }
    })
  }

  componentWillUnmount() {
    Recording.stop()
  }

  render() {
    return <WebView
      ref={ref => this.webView = ref}
      style={{flex: 1}}
      source={require('./webview.html')}/>
  }
}
