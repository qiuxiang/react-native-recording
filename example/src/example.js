import React, { Component } from 'react'
import {
  View,
  NativeModules,
  NativeAppEventEmitter } from 'react-native'

export default class Main extends Component {
  constructor() {
    super()
    NativeModules.Recording.start(8000, 2048)
    NativeAppEventEmitter.addListener('recording', (data) => {
      console.log(data.length)
    })
  }

  render() {
    return <View />
  }
}
