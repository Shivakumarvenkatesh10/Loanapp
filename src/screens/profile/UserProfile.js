import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet';
import {androidCameraPermission} from '../../common/Permission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../common/Api';
import CameraComponent from '../../common/CameraComponent';

const UserProfile = () => {
  const refRBSheet = useRef();
  const {logout} = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(res => {
      console.log(res);
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
        .then(res => {
          uploadImage(res);
          setProfileImage(res.path);
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
          uploadImage(res);
          setProfileImage(res.path);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const uploadImage = async res => {
    const formdata = new FormData();
    formdata.append('ProfileImage', {
      uri: res.path,
      type: res.mime,
      name: 'image.jpg',
    });
    formdata.append('UserId', userId);
    await fetch(base_url + 'Account/profile/upload', {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.result) {
          alert(res.message);
        } else {
          alert('Something Went Wrong');
          return;
        }
      });
  };

  const close = () => {
    refRBSheet.current.close();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}>
            {profileImage !== null &&
            profileImage !== undefined &&
            profileImage !== '' ? (
              <Avatar.Image
                source={{
                  uri: profileImage,
                }}
                size={100}
              />
            ) : (
              <ImageBackground
                source={require('../../assets/images/user.jpeg')}
                style={styles.imgBack}
                imageStyle={{borderRadius: 50}}></ImageBackground>
            )}
            <Entypo
              name="pencil"
              size={20}
              style={{position: 'absolute', right: -10}}
            />
          </TouchableOpacity>

          <View style={{marginLeft: 30}}>
            <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>
              John Doe
            </Title>
            <Caption style={styles.caption}>Bangalore</Caption>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}></View>
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity style={styles.touchable} onPress={() => logout()}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
  },
  caption: {
    fontFamily: 'Poppins-Bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  touchable: {
    backgroundColor: '#FF0083',
    padding: 10,
    borderRadius: 30,
    marginBottom: 30,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 16,
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
    width: 100,
    height: 100,
  },
});
