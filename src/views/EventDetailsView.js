import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {TextView} from '../components/TextView';
import {BottomSheetContainer} from '../container/BottonSheetContainer';
import {
  BasicButton,
  ButtonError,
  ButtonSucess,
  IconButton,
  ImageTextButton,
} from '../components/Button';
import Avatar from '../../assets/avatar.png';
import MarkerIcon from '../../assets/marker_icon.png';
import ClockIcon from '../../assets/clock.png';
import FriendsBlurIcon from '../../assets/friends_blur_icon.png';
import ChatIcon from '../../assets/chat_icon.png';
import AvatarSampe from '../../assets/sample.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveView} from '../redux/ui/uiActions';
import {appStyle} from '../styles/theme';
import {ImageView} from '../components/ImageView';
import {useEffect, useState} from 'react';
import {addFavourites, removeFavourites} from '../redux/user/userActions';

import HeartDarkIcon from '../../assets/heart_dark.png';
import HeartIcon from '../../assets/heart_grey.png';
import {useNavigation} from '@react-navigation/native';
import {getEventByid} from '../service/restService';
import {showPopUpNotification} from '../redux/notifications/notification_action';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import {endEvent} from 'react-native/Libraries/Performance/Systrace';

export const EventDetailsView = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {loggedInUser} = useSelector(state => state.userReducer);

  const [selectedTimeZone, setSelectedTimeZone] = useState('Respond');

  const [event, setEvent] = useState();

  const {eventId} = route.params;

  useEffect(() => {
    const getEventDetails = async () => {
      const event = await getEventByid(eventId);
      setEvent(event);
    };

    getEventDetails();
  }, [eventId]);

  if (!event) {
    return <></>;
  }

  const favouriteToggling = () => {
    if (isFollowing) {
      dispatch(removeFavourites(loggedInUser.id, event.id, null));
    } else {
      dispatch(addFavourites(loggedInUser.id, event.id, null));
    }
  };

  const organizer = event.createdBy;
  const isFollowing = false;
  const imageSources = [Avatar, Avatar];
  const address =
    event.address.streetName +
    ' ' +
    event.address.streetNumber +
    ', ' +
    event.address.postalCode +
    ' ' +
    event.address.city +
    ', ' +
    event.address.country;

  const timeZones = ['Respond', 'Interested', 'Going'];
  return (
    <BottomSheetContainer
      title={event.eventTitle}
      modelStyles={styles.modalView}
      backDropOpacity={0.4}
      showScrollSign={true}
      viewName="EventDetailsView">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 2,
        }}>
        <View>
          <View style={styles.timeContainer}>
            <ImageView
              source={ClockIcon}
              imageStyle={{width: 16, height: 16}}
            />
            <TextView
              textStyle={{marginLeft: 6}}
              text={event.eventStartTime}
              textSize={12}
              fontWeight="bold"
            />
          </View>

          <View style={styles.timeContainer}>
            <ImageView
              source={MarkerIcon}
              imageStyle={{width: 16, height: 16}}
            />
            <TextView
              textStyle={{marginLeft: 6}}
              text={address}
              textSize={12}
              fontWeight="bold"
            />
          </View>

          <View style={styles.timeContainer}>
            <ImageView
              source={FriendsBlurIcon}
              imageStyle={{width: 16, height: 16}}
            />
            <TextView
              textStyle={{marginLeft: 6, color: appStyle.buttonColor.error}}
              text="4 only few seats left"
              textSize={10}
              fontWeight="bold"
            />
          </View>
        </View>
      </View>

      <View style={{marginTop: 0}}>
        <TextView text="Description" textSize={12} fontWeight="700" />
        <TextView text={event.eventInfo} textSize={12} numberOfLines={6} />
      </View>

      <View style={{marginTop: 10}}>
        <TextView text="Organizer" textSize={12} fontWeight="700" />
        <View style={styles.hostViewContainer}>
          <ImageTextButton
            positionStyle={{
              marginTop: 0,
              zIndex: 5,
            }}
            imageStyle={{width: 50, height: 50, borderRadius: 25}}
            iconSrc={
              event.createdBy.imageUrl
                ? {uri: event.createdBy.imageUrl}
                : Avatar
            }
            textStyle={{fontSize: 10, width: 35, color: appStyle.pageColor}}
            triggerFunc={() =>
              navigation.navigate('UserProfileView', {
                userId: event.createdBy.id,
              })
            }
          />
          <View style={styles.bioContainer}>
            <TextView
              textStyle={{color: appStyle.pageColor}}
              text={event.createdBy.name}
              textSize={12}
              fontWeight="bold"
            />
            <TextView
              textStyle={{color: appStyle.pageColor}}
              text="717 followers"
              textSize={12}
            />
            <TextView
              textStyle={{color: appStyle.pageColor}}
              text="Rating 3/5"
              textSize={12}
            />
          </View>

          <IconButton
            imageStyle={{width: 35, height: 35}}
            iconSrc={ChatIcon}
            selected={true}
            text="See all"
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 16,
        }}>
        <FlatList
          key="Photos"
          contentContainerStyle={styles.scrollView}
          data={imageSources}
          horizontal={true}
          renderItem={({item, index}) => (
            <>
              <IconButton
                imageStyle={{
                  ...styles.imageStyle,
                  marginLeft: index !== 0 ? -10 : 4,
                }}
                iconSrc={item}
                triggerFunc={() => navigation.navigate('UserProfileView', {})}
              />
            </>
          )}
        />

        <Picker
          style={{backgroundColor: 'red'}}
          mode="dropdown"
          placeholder="Rsafas"
          selectedValue={selectedTimeZone}
          onValueChange={itemValue => setSelectedTimeZone(itemValue)}>
          {timeZones.map(zone => (
            <Picker.Item key={zone} label={zone} value={zone} />
          ))}
        </Picker>
      </View>
    </BottomSheetContainer>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
  },
  addressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: appStyle.blackColor.lightDark,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostViewContainer: {
    alignSelf: 'center',
    padding: 8,
    marginTop: 6,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: appStyle.blackColor.pureDark,
  },
  iconButtonWrapper: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  bioContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  imageStyle: {
    width: 35,
    height: 35,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: appStyle.blackColor.pureDark,
  },
  textStyle: {
    marginLeft: 10,
  },
  scrollView: {
    width: '50%',
  },
});
