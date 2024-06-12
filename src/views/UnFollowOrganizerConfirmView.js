import {StyleSheet, View} from 'react-native';
import {TextView} from '../components/TextView';
import {BottomSheetContainer} from '../container/BottonSheetContainer';
import {BasicButton, ButtonError, IconTextButton} from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {appStyle} from '../styles/theme';
import {removeFavourites, unFollowUserAction} from '../redux/user/userActions';
import {useNavigation} from '@react-navigation/native';
import {showPopUpNotification} from '../redux/notifications/notification_action';

import HeartIcon from '../../assets/heart_grey.png';

import CloseIcon from '../../assets/close.png';

export const UnFollowOrganizerConfirmView = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {loggedInUser} = useSelector(state => state.userReducer);
  const {user} = route.params;

  const handleUnFollow = user => {
    dispatch(unFollowUserAction(loggedInUser.id, user.id));
    navigation.navigate("UserProfileView", {userId : user.id, unFollowed : true})
  };

  return (
    <BottomSheetContainer
      modelStyles={styles.modalView}
      height={150}
      alignItems="center"
      showScrollSign={false}
      backDropOpacity={0.3}
      viewName="UnFollowOrganizerConfirmView">
      <View style={styles.modalContent}>
        <TextView
          textSize={12}
          fontWeight="bold"
          text={'Are you sure you want to unfollow?'}
        />
        <TextView
          textStyle={{alignSelf: 'center'}}
          textSize={14}
          fontWeight="bold"
          text={user.userName}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-evenly',
          }}>
          <IconTextButton
            wrapperStyles={{borderWidth: 0, padding: 6}}
            imageStyle={styles.imageButtonStyle}
            text="Cancel"
            selected={true}
            iconSrc={CloseIcon}
            triggerFunc={() => navigation.goBack()}
          />
          <IconTextButton
            wrapperStyles={{borderWidth: 0, padding: 6}}
            imageStyle={styles.imageButtonStyle}
            iconSrc={HeartIcon}
            text="UnFollow"
            selected={true}
            triggerFunc={() => handleUnFollow(user)}
          />
        </View>
      </View>
    </BottomSheetContainer>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '90%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 16,
    borderRadius: 10,
    backgroundColor: appStyle.pageColor,
  },
  modalContent: {
    flex: 1,
    bottom: 16,
    borderRadius: 10,
  },
  buttonStyle: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    backgroundColor: appStyle.blackColor.lightDark,
  },
  imageButtonStyle: {
    width: 22,
    height: 22,
  },
});
