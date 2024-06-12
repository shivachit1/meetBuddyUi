import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {useEffect, useState} from 'react';

import Geolocation from 'react-native-geolocation-service';

export const useDeviceLocation = () => {
  const [deviceLocation, setDeviceLocation] = useState(undefined);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location when it is in use to provide events nearby',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentLocation()
        } else {
          console.log('Location permission denied');
        }
      } else if (Platform.OS === 'ios') {
        // For iOS, permissions are handled in Info.plist file
        console.log('Location permission granted (iOS)');
        getCurrentLocation()
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setDeviceLocation({ latitude, longitude });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 500 }
    );
  };

  return {deviceLocation};
};
