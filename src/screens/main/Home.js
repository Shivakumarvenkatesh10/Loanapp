import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {base_url} from '../../common/Api';
import axios from 'axios';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = ({navigation}) => {
  const date = new Date();
  const hrs = date.getHours();
  const flatListRef = useRef(null);
  const [currTime, setCurrTime] = useState(null);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState('');
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(res => {
      getDashBoardDet(res);
      getUserDet(res);
      setUserId(res);
    });
    if (hrs < 12) {
      setCurrTime('Good Morning');
    } else if (hrs < 16) {
      setCurrTime('Good Afternoon');
    } else {
      setCurrTime('Good Evening');
    }
  }, []);

  const getDashBoardDet = async id => {
    await axios.get(base_url + `DashBoard/${id}`).then(res => {
      if (res.data.success) {
        setData(res.data.result);
      } else {
        setMsg('No Data Found');
        setLoading(false);
        return;
      }
    });
    setLoading(false);
  };

  const getUserDet = async user => {
    await axios
      .get(base_url + 'Account/user/' + user)
      .then(res => setName('Hello ' + res.data.result.fullName));
  };

  const scrollToOffset = offset => {
    flatListRef.current.scrollToOffset({offset});
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{height: 180, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          const index = data.indexOf(item);
          const offset = index * 50; // Calculate the offset based on the fixed row height
          scrollToOffset(offset);
        }}>
        <View key={item.id}>
          <Image
            style={{
              width: SCREEN_WIDTH / 1.11,
              height: SCREEN_HEIGHT / 5,
              borderRadius: 10,
            }}
            source={require('../../assets/images/loanimage.jpeg')}
          />
          <View
            style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#333',
                padding: 15,
                fontSize: 22,
              }}>
              <FontAwesome5 name="rupee-sign" size={22} />
              {item.amount}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: 20,
              flexDirection: 'row',
            }}
            onPress={() =>
              index == 1
                ? navigation.navigate('DispatchScreen', {
                    amount: item.amount,
                    id: item.id,
                  })
                : navigation.navigate('Register')
            }>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#333',
                  padding: 15,
                }}>
                Apply for loan
              </Text>
            </View>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: '#FF0083',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="arrowright" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: !loading && '#FF0083'}]}>
      <StatusBar backgroundColor="#FF0083" barStyle="light-content" />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FF0083" />
        </View>
      ) : (
        <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
          <View style={styles.scrollView}>
            <View style={styles.topViewContainer}>
              <Text style={styles.nameText}>{name}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('UserProfile')}>
                <ImageBackground
                  source={require('../../assets/images/user.jpeg')}
                  style={styles.imgBack}
                  imageStyle={{borderRadius: 25}}></ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={{paddingBottom: 20}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'center',
                  color: '#fff',
                }}>
                {currTime}
              </Text>
            </View>
            <FlatList
              ref={flatListRef}
              keyExtractor={(item, idx) => idx.toString()}
              data={data}
              renderItem={renderItem}
              getItemLayout={(data, index) => ({
                length: 50,
                offset: 50 * index,
                index,
              })}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
  imgBack: {
    width: 35,
    height: 35,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  topViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
  },
  // serachContainer: {
  //   flexDirection: 'row',
  //   borderWidth: 1,
  //   borderColor: '#c6c6c6',
  //   borderRadius: 8,
  //   paddingHorizontal: 10,
  //   paddingVertical: Platform.OS === 'ios' ? 8 : 0,
  //   alignItems: 'center',
  // },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  upcomingText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  touchbleText: {
    color: '#0aada8',
  },
  customSwitch: {
    marginVertical: 20,
  },

  gridItem: {
    flex: 1,
    margin: 8,
    height: 150,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {flex: 1},
  buttonPressed: {opacity: 0.5},
  innerGridContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
