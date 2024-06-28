import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logOutUser} from '../redux/user/userActions';
import {IconTextButton} from '../components/Button';
import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';

import AvatarPng from '../../assets/avatar.png';

import CalenderIcon from '../../assets/calender_blur_icon.png';
import SignOutIcon from '../../assets/sign_out.png';
import {ImageView} from '../components/ImageView';
import {ItemSeparator} from '../components/ItemSeperator';
import {appStyle} from '../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '../styles/styles';

export const ProfileMenuView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loggedInUser} = useSelector(state => state.userReducer);

  return (
    <ViewContainer
      modelStyle={{...styles.modalView, ...commonStyles.shadowProp}}
      navigation={navigation}
      animationFromTop={true}
      hideCloseButton={true}
      backDropOpacity={0.3}
      viewName="ProfileView">
      <View style={styles.profileContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View>
            <ImageView
              imageStyle={styles.imageStyle}
              roundImage={true}
              source={
                loggedInUser.imageUrl ? {uri: loggedInUser.imageUrl} : AvatarPng
              }
            />
          </View>
        </View>

        <View style={{alignSelf: 'center'}}>
          <TextView text={loggedInUser.name} textSize={12} fontWeight="bold" />
        </View>
      </View>
      <ItemSeparator backgroundColor={appStyle.blackColor.lightDark} />
      <View
        style={{
          marginTop: 8,
          paddingLeft: 8,
          paddingRight: 8,
          marginBottom: 20,
        }}>
        <IconTextButton
          wrapperStyles={{borderRadius: 8, width: '100%'}}
          iconStyles={{borderRadius: 20}}
          imgUrlSrc={loggedInUser.imageUrl}
          iconSrc={AvatarPng}
          selected={true}
          text="View Profile"
          triggerFunc={() => navigation.navigate('ProfileView')}
        />
        <IconTextButton
          wrapperStyles={{borderRadius: 8, width: '100%'}}
          iconSrc={CalenderIcon}
          selected={true}
          text="My Events"
        />

        <IconTextButton
          wrapperStyles={{borderRadius: 8, width: '100%'}}
          iconSrc={CalenderIcon}
          selected={true}
          text="Reviews"
        />
        <IconTextButton
          wrapperStyles={{borderRadius: 8, width: '100%'}}
          iconSrc={CalenderIcon}
          selected={true}
          text="Setting"
        />
        <IconTextButton
          wrapperStyles={{
            width: '100%',
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: appStyle.buttonColor.error,
          }}
          textStyle={{color: appStyle.pageColor}}
          iconSrc={SignOutIcon}
          selected={true}
          text="Log out"
          triggerFunc={() => {
            dispatch(logOutUser());
            navigation.reset({index: 0, routes: [{name: 'SignInView'}]}); // navigate + only signInView present
          }}
        />
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'absolute',
    width: '45%',
    height: 'auto',
    right: 15,
    top: 72,
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
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 12,
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
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: appStyle.blackColor.pureDark,
    objectFit: 'cover',
  },
  scrollView: {
    justifyContent: 'flex-start',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    padding: 4,
    margin: 6,
    borderRadius: 20,
  },
  imageIconStyle: {
    width: 14,
    height: 14,
  },
});
