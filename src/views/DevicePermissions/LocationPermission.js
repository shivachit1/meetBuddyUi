import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {SignInView} from './SignInView';
import {MapViewPage} from './Map/MapView';
import {TextView} from '../../src/components/TextView';
import {ImageTextButton} from '../../src/components/Button';
import {useEffect, useState} from 'react';
import {useDeviceLocation} from '../../redux/hooks/device';

export const LocationPermissionView = () => {
  const {currentTheme} = useSelector(state => state.uiReducer);
  const [locationAccess, setLocationAccess] = useState(false);

  useEffect(() => {
    if (locationAccess) {
      const {permissionGranted, userLocation} = useDeviceLocation();
    }
  }, [locationAccess]);

  const styles = getStyles(currentTheme);

  return (
    <View style={styles.container}>
      {locationAccess ? (
        <>
          <TextView
            text="MeetBuddy will need your device location to ensure you will get events nearby"
            textSize={24}
          />
          <ImageTextButton
            text="Yes"
            triggerFunc={() => setLocationAccess(true)}></ImageTextButton>
        </>
      ) : (
        <>
          <TextView
            text="Waiting for permissions"
            textSize={24}
          />
        </>
      )}
    </View>
  );
};

const getStyles = currentTheme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.pageColor,
    },
  });
};
