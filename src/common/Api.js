import NetInfo from '@react-native-community/netinfo';

export const getNetInfo = () => {
  let netInfo = undefined;
  const unsubscribe = NetInfo.addEventListener(state => {
    netInfo = state.isInternetReachable;
  });
  return netInfo === undefined ? true : netInfo;
};

export const base_url = 'http://20.197.2.74:5000/v1/api/';
