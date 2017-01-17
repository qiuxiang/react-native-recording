
# react-native-recording

## Getting started

`$ npm install react-native-recording --save`

### Mostly automatic installation

`$ react-native link react-native-recording`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-recording` and add `Recording.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRecording.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.qiuxiang.rn.RecordingPackage;` to the imports at the top of the file
  - Add `new RecordingPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-recording'
  	project(':react-native-recording').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-recording/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-recording')
  	```


## Usage
```javascript
import Recording from 'react-native-recording';

// TODO: What do with the module?
Recording;
```
  