import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveView} from '../redux/ui/uiActions';
import {
  addFavourites,
  logOutUser,
  removeFavourites,
} from '../redux/user/userActions';
import {
  BasicButton,
  ButtonError,
  IconButton,
  IconTextButton,
} from '../components/Button';
import {useEffect, useState} from 'react';
import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';

import AvatarPng from '../../assets/avatar.png';
import Share from '../../assets/share.png';

import CalenderIcon from '../../assets/calender_icon.png';
import HeartDarkIcon from '../../assets/heart_dark.png';
import EditIcon from '../../assets/edit.png';
import BackButtonIcon from '../../assets/back_button_icon.png';
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
import {CustomerSearchAutoComplete} from './CustomerSearchAutoComplete';

export const InvitationView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loggedInUser} = useSelector(state => state.userReducer);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelection = users => {
    setSelectedUsers(users);
  };

  const sendInvitation = users => {
    setSelectedUsers(users);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <IconTextButton
            wrapperStyles={{borderWidth: 0, borderColor: 'transparent'}}
            text="Back"
            iconSrc={BackButtonIcon}
            triggerFunc={() => navigation.goBack()}
          />
          <IconTextButton
            wrapperStyles={{backgroundColor: appStyle.blackColor.pureDark}}
            textStyle={{color: appStyle.pageColor}}
            text="Send Invitation"
            triggerFunc={sendInvitation}
          />
        </View>

        <TextView text="Invite friends" textSize={14} fontWeight="bold" />
        <TextView
          textStyle={{color: appStyle.blackColor.midDark, marginBottom: 12}}
          text="Invite your friends for the event"
          textSize={10}
          fontWeight="bold"
        />
        <CustomerSearchAutoComplete
          existingUsers={[]}
          handleDoneSelection={handleUserSelection}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 20,
    backgroundColor: appStyle.pageColor,
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
