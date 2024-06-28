import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextView} from '../components/TextView';
import {BottomSheetContainer} from '../container/BottonSheetContainer';
import {
  BasicButton,
  ButtonError,
  ButtonSucess,
  IconButton,
  IconTextButton,
  ImageTextButton,
} from '../components/Button';
import Avatar from '../../assets/avatar.png';
import MarkerIcon from '../../assets/marker_icon.png';
import ClockIcon from '../../assets/clock.png';
import ShareIcon from '../../assets/upload.png';
import CalenderIcon from '../../assets/calender_blur_icon.png';
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
import FriendsIcon from '../../assets/friends_blur_icon.png';
import {useNavigation} from '@react-navigation/native';
import {getEventByid} from '../service/restService';
import {showPopUpNotification} from '../redux/notifications/notification_action';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import {endEvent} from 'react-native/Libraries/Performance/Systrace';
import {getDate, getTime} from '../util/dateFormatter';

export const EventDetailsView = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {loggedInUser} = useSelector(state => state.userReducer);

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

  const organizer = event.createdBy;
  const imageSources = [Avatar, Avatar, Avatar];
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

  const jointEventButton = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}>
        <BasicButton
          buttonStyle={{
            width: '70%',
            backgroundColor: appStyle.blackColor.pureDark,
            padding: 12,
            borderRadius: 8,
            justifyContent: 'center',
          }}
          textStyle={{
            color: appStyle.pageColor,
            alignSelf: 'center',
          }}
          selected={true}
          text="Join the event"
        />
      </View>
    );
  };
  return (
    <BottomSheetContainer
      title={event.eventTitle}
      modelStyles={styles.modalView}
      backDropOpacity={0.2}
      showScrollSign={true}
      scrollView={true}
      actionButtonView={jointEventButton()}>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          right: 0,
          top: 10,
        }}>
        <IconTextButton
          wrapperStyles={{
            borderRadius: 8,
            backgroundColor: appStyle.blackColor.lightDark,
          }}
          iconStyles={{marginRight: 6}}
          text="Share"
          iconSrc={ShareIcon}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{...styles.rowContainer, marginTop: 4}}>
            <ImageView
              source={CalenderIcon}
              imageStyle={{
                width: 20,
                height: 20,
              }}
            />
            <View>
              <TextView
                textStyle={{marginLeft: 6}}
                text="Time"
                textSize={12}
                fontWeight="bold"
              />
              <TextView
                textStyle={{marginLeft: 6, color: appStyle.blackColor.midDark}}
                text={getDate(event.eventStartTime)}
                textSize={10}
                fontWeight="bold"
              />
            </View>
          </View>

          <View style={{...styles.rowContainer, marginTop: 4}}>
            <ImageView
              source={MarkerIcon}
              imageStyle={{width: 17, height: 22, objectFit: 'contain'}}
            />
            <View>
              <TextView
                textStyle={{marginLeft: 6}}
                text="Location"
                textSize={12}
                fontWeight="bold"
              />
              <TextView
                textStyle={{marginLeft: 6, color: appStyle.blackColor.midDark}}
                text={address}
                textSize={10}
                fontWeight="bold"
              />
            </View>
          </View>

          <View style={{...styles.rowContainer, marginTop: 4}}>
            <ImageView
              source={FriendsIcon}
              imageStyle={{
                width: 20,
                height: 20,
              }}
            />
            <View>
              <TextView
                textStyle={{marginLeft: 6}}
                text="Age Limit"
                textSize={12}
                fontWeight="bold"
              />
              <TextView
                textStyle={{marginLeft: 6, color: appStyle.blackColor.midDark}}
                text={
                  event.ageLimit.lowerValue + ' - ' + event.ageLimit.highValue
                }
                textSize={10}
                fontWeight="bold"
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{marginTop: 10}}>
        <TextView
          textStyle={{marginLeft: 6}}
          text="Responses"
          textSize={12}
          fontWeight="bold"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 6,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
            <FlatList
              style={{
                alignSelf: 'center',
                maxWidth: 80,
              }}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              data={imageSources}
              showsHorizontalScrollIndicator={false}
              disableIntervalMomentum={true}
              horizontal={true}
              keyExtractor={({item, index}) => index}
              renderItem={({item, index}) => (
                <ImageView
                  key={index}
                  imageStyle={{
                    ...styles.imageStyle,
                    marginLeft: index !== 0 ? -10 : 4,
                  }}
                  roundImage={true}
                  source={
                    event.createdBy.imageUrl
                      ? {uri: event.createdBy.imageUrl}
                      : Avatar
                  }
                />
              )}
              ListEmptyComponent={() => (
                <TextView text="No responses/invites" />
              )}
              snapToAlignment="center"
              viewabilityConfig={{
                itemVisiblePercentThreshold: '80%',
              }}
            />

            <TextView
              textStyle={{
                marginLeft: 6,
                marginTop: 0,
                borderBottomWidth: 1,
              }}
              text="View All"
              textSize={12}
              fontWeight="bold"
            />
          </TouchableOpacity>
          <BasicButton
            selected={true}
            textStyle={{color: appStyle.pageColor}}
            text="Invite +"
            iconSrc={ClockIcon}
            triggerFunc={() => navigation.navigate('InvitationView')}
          />
        </View>
      </View>

      <View style={{marginTop: 16}}>
        <TextView text="Description" textSize={14} fontWeight="700" />
        <TextView
          textStyle={{color: appStyle.blackColor.midDark}}
          text={event.eventInfo}
          textSize={12}
          fontWeight="bold"
        />
      </View>

      <View style={{marginTop: 10}}>
        <TextView text="Organizer" textSize={12} fontWeight="700" />
        <View style={styles.hostViewContainer}>
          <ImageTextButton
            positionStyle={{
              marginTop: 0,
              zIndex: 5,
            }}
            imageStyle={{width: 40, height: 40, borderRadius: 25}}
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
              text={event.createdBy.name}
              textSize={12}
              fontWeight="bold"
            />
            <TextView
              textStyle={{color: appStyle.blackColor.midDark}}
              text="717 followers"
              textSize={12}
              fontWeight="bold"
            />
          </View>

          <IconTextButton
            wrapperStyles={{
              backgroundColor: appStyle.blackColor.lightDark,
              padding: 8,
              borderRadius: 8,
              justifyContent: 'center',
            }}
            textStyle={{
              color: appStyle.blackColor.pureDark,
              alignSelf: 'center',
            }}
            text="Message"
            triggerFunc={() =>
              navigation.navigate('ChatRoomView', {chatRoomId: organizer.name})
            }
          />
        </View>
      </View>
    </BottomSheetContainer>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    maxHeight: '90%',
  },
  addressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: appStyle.blackColor.lightDark,
  },
  rowContainer: {
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
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  textStyle: {
    marginLeft: 10,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
