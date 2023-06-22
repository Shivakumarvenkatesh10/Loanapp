import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Lottie from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DispatchScreen = ({route}) => {
  const animationRef = useRef(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [id, setId] = useState('');
  const [percent, setPercent] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('userToken').then(res => setUserId(res));
    setAmount(route.params.amount);
    setId(route.params.id);
    setPercent(route.params.amount);
    if (animationRef.current) {
      animationRef.current.play();
    }
    // return () => {
    //   if (animationRef.current) {
    //     animationRef.current.reset();
    //   }
    // };
  }, [id]);

  const onAnimationFinish = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopTextContainer}>
        <Text style={styles.headertext}>Welcome</Text>
        <View style={{flexDirection: 'row'}}></View>
      </View>
      <View style={styles.bottomSheet}>
        <ScrollView>
          <View style={styles.TopTextContainer}>
            <Text style={styles.text}>Congratulations</Text>
            <Lottie
              ref={animationRef}
              source={require('../../assets/comps/yes.json')}
              autoPlay
              onAnimationFinish={onAnimationFinish}
              style={{
                height: SCREEN_HEIGHT * 0.25,
                position: 'relative',
                bottom: 30,
              }}
            />
          </View>
          <View style={{flex: 1, top: -100}}>
            <Text style={[styles.text, {textAlign: 'center'}]}>
              Transaction Summary
            </Text>
            <View style={styles.summary}>
              <View style={styles.alignContent}>
                <Text style={styles.subtext}>Next Payment Date</Text>
                <Text style={styles.subtext}>02/04/2023</Text>
              </View>
              <View style={styles.alignContent}>
                <Text style={styles.subtext}>Interest Rate </Text>
                <Text style={styles.subtext}>10%</Text>
              </View>
              <View style={styles.alignContent}>
                <Text style={styles.subtext}>Monthly Repayment </Text>
                <Text style={styles.subtext}>{amount}.00</Text>
              </View>
              <View style={styles.alignContent}>
                <Text style={styles.subtext}>No. of Payments </Text>
                <Text style={styles.subtext}>2</Text>
              </View>
              <View style={styles.alignContent}>
                <Text style={styles.subtext}>Reason </Text>
                <Text style={styles.subtext}>Emergency Bills</Text>
              </View>
              <View style={styles.alignContent}>
                <Text style={styles.subtext}>Total Payback Amount:-</Text>
                <Text style={styles.subtext}>10,050.00</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.button}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Medium',
                    color: '#fff',
                    fontSize: 16,
                  }}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {marginTop: 0, backgroundColor: '#000'},
                ]}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Medium',
                    color: '#fff',
                    fontSize: 16,
                  }}>
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DispatchScreen;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgba(219,10,91,1)'},
  TopTextContainer: {flex: 1, alignItems: 'center', paddingTop: 20},
  headertext: {fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 30},
  bottomSheet: {
    height: SCREEN_HEIGHT * 0.9,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  text: {fontFamily: 'Poppins-SemiBold', fontSize: 20},
  subtext: {fontFamily: 'Poppins-Medium'},
  summary: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    borderRadius: 5,
    padding: 20,
  },
  alignContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FF0083',
    padding: 10,
    borderRadius: 30,
    marginVertical: 20,
  },
});
