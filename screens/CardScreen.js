import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { Camera, } from 'react-native-vision-camera';

export function CardScreen({ route, navigation }) {
  const [cameraPermission, setCameraPermission] = useState();

  const { item, imageSource, changePhoto ,update} = route.params;
  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);

  }, [navigation,update]);
  useEffect(() => {
 
    if (imageSource) {
      changePhoto(item, imageSource)
    }

  }, [imageSource]);


  const openCamera = () => {
    if (cameraPermission !== 'authorized') {

      navigation.navigate('PermissionScreen')
    } else {

      navigation.navigate('CameraScreen')
    }

  
  }
  return (

    <View style={styles.container}>

   
      {imageSource ? (
        <Image
          style={styles.image}
          source={{
            uri: `file://'${imageSource}`,
          }}
        />
      ) : null}
      <View style={[styles.imageContainer, imageSource ? { height: 0 } : null]} ><Text style={styles.text}>Place For Image</Text></View>
      <Text style={styles.text}>{item?.title}</Text>
      <Button title={!imageSource ? 'Take  a photo' : 'change photo'} onPress={() => openCamera()} style={styles.button}>

      </Button>

    </View>
  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'

  },
  imageContainer: {
    height: 200,
    width: '80%',
    borderWidth: 2,
  },
  image: {
    width: '50%',
    height: '50%',
    aspectRatio: 9 / 16,
  },
  button: {
    backgroundColor: 'blue',
    width: 200,
    height: 25
  },
  text: {
    fontSize: 25,
    fontWeight: '800',
    alignSelf: 'center'
  }



});