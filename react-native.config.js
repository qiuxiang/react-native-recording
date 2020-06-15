module.exports = {
  dependency: {
    platforms: {
      ios: { project: "lib/ios/react-native-recording.podspec" },
      android: { sourceDir: "lib/android" }
    }
  },
  dependencies: {
    "react-native-recording": {
      root: __dirname,
      platforms: {
        ios: { podspecPath: __dirname + "/lib/ios/react-native-recording.podspec" },
        android: {
          sourceDir: __dirname + "/lib/android",
          packageImportPath: "import cn.qiuxiang.react.recording.RecordingPackage;",
          packageInstance: "new RecordingPackage()"
        }
      }
    }
  }
};
