import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TermsAndCondition from './TermsAndCondition';
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BottomSheet = ({route, navigation}) => {
  console.log(route);
  let mobileno = route.params.mobile;
  let userId = route.params.userId;
  const refRBSheet = useRef();
  useEffect(() => {
    refRBSheet.current.open();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF0083',
      }}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={SCREEN_HEIGHT / 1.15}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <TermsAndCondition
          mobile={mobileno}
          userId={userId}
          navigation={navigation}
        />
      </RBSheet>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({});
