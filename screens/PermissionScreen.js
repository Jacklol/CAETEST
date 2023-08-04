import React, { useCallback, useEffect, useState } from 'react';
import {  Text,  View } from 'react-native';
import { StyleSheet, Linking } from 'react-native';
import { Camera } from 'react-native-vision-camera';
export function PermissionScreen({ navigation }) {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined');
  const requestCameraPermission = useCallback(async () => {
  
    const permission = await Camera.requestCameraPermission();
   
    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);
  useEffect(() => {
    requestCameraPermission()
    if (cameraPermissionStatus === 'authorized') {
      navigation.navigate({
        name: 'CardScreen',
        params: {update:true},
        merge: true,
      });
    }
  }, [cameraPermissionStatus, navigation]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.hyperlink} onPress={requestCameraPermission}>
        Grant permission to camera
      </Text>
      <Text>PermissionScreen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  permissionsContainer: {

  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
    fontSize:35
  },
  bold: {
    fontWeight: 'bold',
  },
});