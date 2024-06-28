import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {IconTextButton} from '../components/Button';
import GoogleIcon from '../../assets/google.png';
import {appStyle} from '../styles/theme';
import {useEffect} from 'react';
import {googleSignIn} from '../service/UserService';
import {signInUser} from '../redux/user/userActions';
import {useNavigation} from '@react-navigation/native';
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '../../config/config';

GoogleSignin.configure({
  iosClientId: IOS_CLIENT_ID,
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
});

export const SignInView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const init = async () => {
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      } catch (err) {
        console.error('Play Services error:', err);
      }
    };
    init();
  }, []);

  const GoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (err) {
      console.log(err);
    }
  };

  const logInWithGoogle = async () => {
    try {
      const userInfo = await GoogleLogin();
      const user = await googleSignIn(userInfo);
      dispatch(signInUser(user));
      navigation.reset({index: 0, routes: [{name: 'MapViewPage'}]}); // navigate + removes the signInView
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }

      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>MeetBuddy</Text>
      <IconTextButton
        wrapperStyles={styles.wrapperStyles}
        textStyle={{fontSize: 12}}
        text="Log in with Google"
        iconSrc={GoogleIcon}
        triggerFunc={() => logInWithGoogle()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appStyle.pageColor,
  },
  wrapperStyles: {
    width: 200,
    justifyContent: 'space-evenly',
    paddingLeft: 16,
    paddingRight: 16,
    padding: 12,
    backgroundColor: appStyle.blackColor.lightDark,
  },
  headingText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    color: appStyle.blackColor.pureDark,
  },
});
