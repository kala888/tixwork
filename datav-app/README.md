##Build Android


1. generate keystore

keytool -genkeypair -v -keystore rnappkey.keystore -alias rnappkey -keyalg RSA -keysize 2048 -validity 10000

passcode:rnappkey

## 如何更新 iconfont使用
#### iconfont 使用 https://github.com/iconfont-cli/react-native-iconfont-cli

1. 修改iconfont.json中的js地址

2. 执行npx iconfont-rn


### android 打包

sdk java 11

```shell
yarn
cd ios && pod install
cd .. && cd android
./gradlew clean aR

```


### 远程连接adb
```shell
adb connect 192.168.50.24
```