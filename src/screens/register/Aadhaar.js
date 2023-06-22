import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import CameraComponent from '../../common/CameraComponent';
import {androidCameraPermission} from '../../common/Permission';
import {base_url} from '../../common/Api';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import axios from 'axios';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Aadhaar = ({navigation}) => {
  const refRBSheet = useRef();
  const [userId, setUserId] = useState(null);
  const [aadhaar, setAadhaar] = useState(null);
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [aadhaarFrontImage, setAadhaarFrontImage] = useState('');
  const [aadhaarBackImage, setAadhaarBackImage] = useState('');
  const [fview, setFview] = useState(true);
  const [bview, setBview] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(res => {
      setUserId(res);
    });
  }, []);

  const UploadImageFromGallery = async () => {
    const permissionAndroid = androidCameraPermission();
    if (permissionAndroid) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      })
        .then(async res => {
          if (aadhaarFrontImage === '') {
            await setAadhaarFront(res);
            await setAadhaarFrontImage(res.path);
            await setFview(false);
          } else {
            await setAadhaarBack(res);
            await setAadhaarBackImage(res.path);
            await setBview(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const uploadImageFromCamera = async () => {
    const permissionAndroid = androidCameraPermission();
    if (permissionAndroid) {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
      })
        .then(async res => {
          if (aadhaarFrontImage === '') {
            await setAadhaarFront(res);
            await setAadhaarFrontImage(res.path);
            await setFview(false);
          } else {
            await setAadhaarBack(res);
            await setAadhaarBackImage(res.path);
            await setBview(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const uploadAadhaar = async () => {
    navigation.navigate('Pan');
    // const formdata = new FormData();
    // formdata.append('AadharNumber', aadhaar);
    // formdata.append('BackImage', {
    //   uri: aadhaarBack.path,
    //   type: aadhaarBack.type,
    //   name: 'backimage.jpg',
    // });
    // formdata.append('FrontImage', {
    //   uri: aadhaarFront.path,
    //   type: aadhaarFront.type,
    //   name: 'frontimage.jpg',
    // });
    // formdata.append('UserId', userId);
    // await axios
    //   .post('http://20.197.2.74:5000/v1/api/Account/adhar/updated', formdata, {
    //     headers: {'Content-Type': 'multipart/form-data'},
    //   })
    //   .then(res => console.log(res));
  };

  const close = () => {
    refRBSheet.current.close();
  };

  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        {/* <ScrollView> */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#FF0083',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <Icon
            name="document-text-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TextInput
            placeholder="Aadhaar Number"
            style={{
              flex: 1,
              paddingVertical: 0,
              fontFamily: 'Poppins-Medium',
            }}
            value={aadhaar}
            onChangeText={text => setAadhaar(text)}
            keyboardType="number-pad"
            maxLength={16}
          />
        </View>

        <View>
          <Text
            style={{
              color: '#333',
              fontSize: 16,
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'center',
            }}>
            Upload Aadhaar Front Image
          </Text>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}
            style={{marginVertical: 20}}>
            <ImageBackground
              style={{
                height: 200,
                width: Dimensions.get('window').width / 1.1,
                backgroundColor: '#fff',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={{
                uri: aadhaarFrontImage,
              }}>
              {fview && (
                <View>
                  <Icon
                    style={{textAlign: 'center'}}
                    name="camera"
                    size={40}
                    color="#fff"
                  />
                  <Text
                    style={{
                      color: '#FF0083',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 30,
                    }}>
                    Select Image
                  </Text>
                </View>
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>
        {!fview && (
          <View>
            <Text
              style={{
                color: '#333',
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
              }}>
              Upload Aadhaar Back Image
            </Text>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
              style={{marginVertical: 20}}>
              <ImageBackground
                style={{
                  height: 200,
                  width: Dimensions.get('window').width / 1.1,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={{
                  uri: aadhaarBackImage,
                }}>
                {bview && (
                  <View>
                    <Icon
                      style={{textAlign: 'center'}}
                      name="camera"
                      size={40}
                      color="#fff"
                    />
                    <Text
                      style={{
                        color: '#FF0083',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 30,
                      }}>
                      Select Image
                    </Text>
                  </View>
                )}
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF0083',
              padding: 10,
              borderRadius: 30,
              marginBottom: 30,
            }}
            onPress={() => uploadAadhaar()}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                color: '#fff',
                fontSize: 16,
              }}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#fff',
          },
          container: {
            backgroundColor: '#FF0083',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <CameraComponent
          camera={uploadImageFromCamera}
          gallery={UploadImageFromGallery}
          close={close}
        />
      </RBSheet>
    </View>
  );
};

export default Aadhaar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  touch: {
    backgroundColor: '#000',
    borderRadius: 25,
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    padding: 10,
    textAlign: 'center',
  },
  imgBack: {
    height: 200,
    width: Dimensions.get('window').width / 1.1,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
