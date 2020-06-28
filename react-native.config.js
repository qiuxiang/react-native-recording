module.exports = {
  dependency: {
    platforms: {
      ios: { project: "lib/ios" },
      android: { sourceDir: "lib/android" }
    }
  },
  dependencies: {
    "react-native-recording": {
      root: __dirname,
      platforms: {
        ios: { sourceDir: __dirname + "/lib/ios" },
        android: {
          sourceDir: __dirname + "/lib/android",
          packageImportPath: "import cn.qiuxiang.react.recording.RecordingPackage;",
          packageInstance: "new RecordingPackage()"
        }
      }
    }
  }
};
