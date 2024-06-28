import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveView} from '../redux/ui/uiActions';
import {
  addFavourites,
  logOutUser,
  removeFavourites,
} from '../redux/user/userActions';
import {ButtonError, IconButton, IconTextButton} from '../components/Button';
import {useEffect, useState} from 'react';
import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';

import AvatarPng from '../../assets/avatar.png';
import Share from '../../assets/share.png';

import CalenderIcon from '../../assets/calender_icon.png';
import HeartDarkIcon from '../../assets/heart_dark.png';
import EditIcon from '../../assets/edit.png';
import SignOutIcon from '../../assets/sign_out.png';
import {TabViewContainer} from '../container/TabViewContainer';
import {ImageView} from '../components/ImageView';
import {getUserProfileData} from '../service/restService';
import {getDay, getMonth, getWeekDay} from '../util/dateFormatter';
import {ItemSeparator} from '../components/ItemSeperator';
import {appStyle} from '../styles/theme';
import {EventItem, NextEventsView} from './EventItem';
import {useNavigation} from '@react-navigation/native';
import {showPopUpNotification} from '../redux/notifications/notification_action';
import {commonStyles} from '../styles/styles';

export const ProfileView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loggedInUser} = useSelector(state => state.userReducer);

  const {followings, followers} = useSelector(
    state => state.userReducer.followerData,
  );

  const buttonNames = ['New Events', 'Past Events', 'Reviews'];
  return (
    <ViewContainer
      modelStyle={styles.modalView}
      navigation={navigation}
      height={600}
      title={loggedInUser.name}
      animationFromTop={true}
      backDropOpacity={0.4}
      viewName="ProfileView">
      <View style={styles.profileContainer}>
        <ImageView
          imageStyle={styles.imageStyle}
          roundImage={true}
          source={
            loggedInUser.imageUrl ? {uri: loggedInUser.imageUrl} : AvatarPng
          }
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
              wrapperStyles={{
                ...commonStyles.shadowProp,
                ...styles.iconWrapper,
                alignSelf: 'flex-start',
              }}
              imageStyle={styles.imageButtonStyle}
              iconSrc={EditIcon}
              text="Edit profile"
              triggerFunc={() => navigation.navigate('EditProfileView', {})}
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
        <TextView
          text={loggedInUser.bio ? loggedInUser.bio : 'No Bio'}
          textSize={12}
        />
      </View>

      <TabViewContainer
        buttonNames={buttonNames}
        viewWidth={Dimensions.get('window').width * 0.8}
        buttonsVisible={true}
        scrollEnabled={true}>
        <FlatList
          key="Events"
          contentContainerStyle={styles.scrollView}
          data={[]}
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
          data={[]}
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
          data={[]}
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
    alignSelf: 'center',
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
    justifyContent: 'space-between',
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
    paddingLeft: 0,
    borderRadius: 6,
  },
  imageButtonStyle: {
    width: 25,
    height: 25,
    marginTop: -10,
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: appStyle.blackColor.pureDark,
    objectFit: 'cover',
  },
  scrollView: {
    justifyContent: 'flex-start',
  },
});
