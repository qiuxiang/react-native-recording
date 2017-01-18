import React, { Component } from 'react'
import {
  View,
  Animated,
  NativeModules,
  NativeAppEventEmitter } from 'react-native'

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      power: new Animated.Value(0),
      width: 0,
    }
  }

  componentDidMount() {
    NativeModules.Recording.start(8000, 1024)
    NativeAppEventEmitter.addListener('recording', this.recording.bind(this))
  }

  componentWillUnmount() {
    NativeModules.Recording.stop()
  }

  recording(data) {
    const power = Math.sqrt(data.reduce((result, value) => {
      result += value * value
      return result
    }, 0)) / 4
    Animated.timing(this.state.power, {
      toValue: power,
      duration: 100,
    }).start()
  }

  handleLayout(event) {
    this.setState({width: event.nativeEvent.layout.width})
  }

  render() {
    return <View style={{flex: 1}} onLayout={this.handleLayout.bind(this)}>
      <Animated.View style={{
        position: 'absolute',
        bottom: 0,
        width: this.state.width,
        height: this.state.power,
        backgroundColor: '#34495e',
      }} />
    </View>
  }
}
