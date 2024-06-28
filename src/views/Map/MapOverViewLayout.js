import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MapSearchBar} from './MapSearchBar';
import {IconButton} from '../../components/Button';
import {EventsListView} from '../EventsListView';
import {setActiveView} from '../../redux/ui/uiActions';

import LocationIcon from '../../../assets/location_blur_icon.png';
import PlusIcon from '../../../assets/plus_icon.png';
import BellOnIcon from '../../../assets/bell_blur.png';
import ChatIcon from '../../../assets/chat_icon.png';
import CalenderIcon from '../../../assets/calender_blur_icon.png';
import FriendsIcon from '../../../assets/heart.png';
import {commonStyles} from '../../styles/styles';
import {appStyle} from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';

export const MapOverViewLayout = ({
  showUserLocation,
  showEventCoordinate,
  flatListViewRef,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <>
      <MapSearchBar />
      <View style={styles.buttonsContainer}>
        <IconButton
          wrapperStyles={{...styles.iconWrapper, ...commonStyles.shadowProp}}
          imageStyle={styles.imageButtonStyle}
          iconSrc={PlusIcon}
          triggerFunc={() =>
            navigation.navigate('CreateEventView', {
              coordinate: {latitude: 60.224, longitude: 24.816},
            })
          }
        />
        <IconButton
          wrapperStyles={{...styles.iconWrapper, ...commonStyles.shadowProp}}
          imageStyle={styles.imageButtonStyle}
          iconSrc={BellOnIcon}
          triggerFunc={() => navigation.navigate('MyNotificationView')}
        />
        <IconButton
          wrapperStyles={{...styles.iconWrapper, ...commonStyles.shadowProp}}
          imageStyle={styles.imageButtonStyle}
          iconSrc={ChatIcon}
          triggerFunc={() => navigation.navigate('MessageView')}
        />
        <IconButton
          wrapperStyles={{...styles.iconWrapper, ...commonStyles.shadowProp}}
          imageStyle={styles.imageButtonStyle}
          iconSrc={CalenderIcon}
          triggerFunc={() => navigation.navigate('MyEventsView')}
        />
        <IconButton
          wrapperStyles={{...styles.iconWrapper, ...commonStyles.shadowProp}}
          imageStyle={styles.imageButtonStyle}
          iconSrc={LocationIcon}
          triggerFunc={() => showUserLocation()}
        />
      </View>

      <View style={styles.bottomContainer}>
        <EventsListView
          flatListViewRef={flatListViewRef}
          showEventCoordinate={showEventCoordinate}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    right: 10,
    bottom: 150,
    zIndex: 10,
  },
  iconWrapper: {
    borderWidth: 0,
    padding: 6,
    margin: 6,
    borderRadius: 8,
    backgroundColor: appStyle.pageColor,
  },
  imageButtonStyle: {
    width: 18,
    height: 18,
    borderWidth: 0,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
  },
});
