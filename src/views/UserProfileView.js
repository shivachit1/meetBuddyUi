import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {followUserAction} from '../redux/user/userActions';
import {IconTextButton} from '../components/Button';
import {useEffect, useState} from 'react';
import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';

import AvatarPng from '../../assets/avatar.png';
import Share from '../../assets/share.png';

import HeartDarkIcon from '../../assets/heart_dark.png';
import HeartIcon from '../../assets/heart_grey.png';
import ChatIcon from '../../assets/chat_icon.png';
import {TabViewContainer} from '../container/TabViewContainer';
import {ImageView} from '../components/ImageView';
import {ItemSeparator} from '../components/ItemSeperator';
import {EventItem} from './EventItem';
import {useNavigation} from '@react-navigation/native';
import {getUserProfileData} from '../service/UserService';

export const UserProfileView = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loggedInUser} = useSelector(state => state.userReducer);
  const [userProfileData, setUserProfileData] = useState();

  const {userId, unFollowed} = route.params;

  useEffect(() => {
    const fetchUserAndEvents = async userId => {
      const profileData = await getUserProfileData(userId);
      setUserProfileData(profileData);
    };

    fetchUserAndEvents(userId);
  }, [unFollowed]);

  useEffect(() => {
    if (unFollowed) {
      updateUnfollow();
      route.params.unFollowed = undefined;
    }
  }, [unFollowed]);

  if (!userProfileData) {
    return <></>;
  }

  const followingToggling = () => {
    if (isFollowed) {
      navigation.navigate('UnFollowOrganizerConfirmView', {user: user});
    } else {
      Vibration.vibrate(20);
      dispatch(followUserAction(loggedInUser.id, userId));
      updatefollow();
    }
  };

  const updatefollow = () => {
    setUserProfileData({
      ...userProfileData,
      followData: {
        followings: userProfileData.followData.followings,
        followers: userProfileData.followData.followers.concat(loggedInUser.id),
      },
    });
  };

  const updateUnfollow = () => {
    setUserProfileData({
      ...userProfileData,
      followData: {
        followings: userProfileData.followData.followings,
        followers: userProfileData.followData.followers.filter(
          id => id != loggedInUser.id,
        ),
      },
    });
  };

  const user = userProfileData.user;
  const {followers, followings} = userProfileData.followData;
  const isFollowed = followers.includes(loggedInUser.id);

  const buttonNames = ['New Events', 'Past Events', 'Reviews'];
  return (
    <ViewContainer
      modelStyles={styles.modalView}
      navigation={navigation}
      height={600}
      title={user.name}
      backDropOpacity={0.5}
      viewName="UserProfileView">
      <View style={styles.profileContainer}>
        <ImageView
          imageStyle={styles.imageStyle}
          roundImage={true}
          source={user.imageUrl ? {uri: user.imageUrl} : AvatarPng}
        />

        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <TextView
                text={followers.length}
                textSize={14}
                fontWeight="bold"
              />
              <TextView
                textStyle={{marginTop: -2}}
                text="Followers"
                textSize={10}
                fontWeight="bold"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <TextView
                text={followings.length}
                textSize={14}
                fontWeight="bold"
              />
              <TextView
                textStyle={{marginTop: -2}}
                text="Following"
                textSize={10}
                fontWeight="bold"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            <IconTextButton
              wrapperStyles={{borderWidth: 0, padding: 6, borderRadius: 8}}
              imageStyle={styles.imageButtonStyle}
              iconSrc={isFollowed ? HeartDarkIcon : HeartIcon}
              text={isFollowed ? 'Following' : 'Follow'}
              selected={true}
              triggerFunc={() => followingToggling()}
            />
            <IconTextButton
              wrapperStyles={{borderWidth: 0, padding: 6, borderRadius: 8}}
              imageStyle={styles.imageButtonStyle}
              iconSrc={ChatIcon}
              text="Message"
              selected={true}
              triggerFunc={() =>
                navigation.navigate('ChatRoomView', {chatRoomId: user.name})
              }
            />
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: -10,
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 8,
        }}>
        <TextView text={user.bio ? user.bio : 'No Bio'} textSize={12} />
      </View>

      <TabViewContainer
        buttonNames={buttonNames}
        viewWidth={Dimensions.get('window').width * 0.85}
        buttonsVisible={true}
        scrollEnabled={true}>
        <FlatList
          key="Events"
          contentContainerStyle={styles.scrollView}
          data={userProfileData.upComingEvents}
          horizontal={false}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={() => (
            <TextView
              textStyle={{alignSelf: 'center'}}
              text="No new events"
              fontWeight="bold"
            />
          )}
          renderItem={({item}) => <EventItem event={item} />}
        />

        <FlatList
          key="Past events"
          contentContainerStyle={styles.scrollView}
          data={userProfileData.pastEvents}
          horizontal={false}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={() => (
            <TextView
              textStyle={{alignSelf: 'center'}}
              text="No Past events"
              fontWeight="bold"
            />
          )}
          renderItem={({item}) => <EventItem event={item} />}
        />

        <FlatList
          key="Reviews"
          contentContainerStyle={styles.scrollView}
          data={userProfileData.reviews}
          horizontal={false}
          ListEmptyComponent={() => (
            <TextView
              textStyle={{alignSelf: 'center'}}
              text="0 Reviews"
              fontWeight="bold"
            />
          )}
          renderItem={({item, index}) => <EventItem event={item} />}
        />
      </TabViewContainer>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
  },
  bioContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  columnContainer: {
    paddingLeft: 20,
    width: '100%',
    justifyContent: 'flex-start',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    padding: 4,
    margin: 4,
  },
  buttonsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButtonWrapper: {
    paddingLeft: 6,
    borderRadius: 6,
  },
  imageButtonStyle: {
    width: 25,
    height: 25,
    marginTop: -10,
    borderRadius: 4,
  },
  imageStyle: {
    width: 70,
    height: 70,
  },
  scrollView: {
    justifyContent: 'flex-start',
  },
});
