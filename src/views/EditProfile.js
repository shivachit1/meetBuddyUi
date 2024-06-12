import {StyleSheet, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logOutUser, updateUser} from '../redux/user/userActions';
import {ButtonError, IconTextButton} from '../components/Button';
import {ViewContainer} from '../container/ModalViewContainer';
import AvatarPng from '../../assets/avatar.png';
import SignOutPng from '../../assets/sign_out.png';
import {TextView} from '../components/TextView';
import {ImageView} from '../components/ImageView';
import {TextInputView} from '../components/TextInputView';
import Share from '../../assets/share.png';
import SaveIcon from '../../assets/save.png';
import EditIcon from '../../assets/edit.png';
import {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInputWithLabel } from '../components/TextInputWithLabel';
import { ItemSeparator } from '../components/ItemSeperator';
import { appStyle } from '../styles/theme';

export const EditProfileView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const {loggedInUser} = useSelector(state => state.userReducer);

  const [user, setUser] = useState({
    id: loggedInUser.id,
    userName: loggedInUser.userName,
    bio: loggedInUser.bio,
    imageUrl: loggedInUser.imageUrl,
  });

  const handleChange = (field, value) => {
    setUser({...user, [field]: value});
  };

  const formSubmit = () => {
    dispatch(updateUser(user));
    navigation.navigate("ProfileView")
  };

  return (
    <ViewContainer
      title="Edit Profile"
      height={550}
      backDropOpacity={0.5}
      viewName="ProfileView">
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <ImageView
          imageStyle={styles.imageStyle}
          roundImage={true}
          source={user.imageUrl ? {uri: loggedInUser.imageUrl} : AvatarPng}
        />
        <IconTextButton
          wrapperStyles={styles.iconButtonWrapper}
          imageStyle={styles.imageButtonStyle}
          text="Change Picture"
          selected={true}
          iconSrc={EditIcon}
          triggerFunc={() => console.log('Add profile pic')}
        />
      </View>
      <ItemSeparator backgroundColor={appStyle.blackColor.lightDark}/>
      <View style={styles.profileContainer}>
        <View style={styles.bioContainer}>
          <TextInputWithLabel
            label="Display Name"
            placeholderText="Display Name"
            name="name"
            textSize={10}
            value={user.userName}
            showLabeOnFocus={true}
            handleChange={handleChange}
          />
          <TextInputWithLabel
            name="bio"
            label="Bio"
            placeholderText="Bio"
            isTextArea={true}
            textSize={12}
            value={user.bio}
            showLabeOnFocus={true}
            textLengthMax={150}
            handleChange={handleChange}
          />
        </View>
      </View>

      <View>
        <IconTextButton
          wrapperStyles={styles.iconButtonWrapper}
          imageStyle={styles.imageButtonStyle}
          text="Save"
          selected={true}
          iconSrc={SaveIcon}
          triggerFunc={() => formSubmit()
          }
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
    marginTop: 20,
  },
  rowContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 15,
    marginTop: -2,
  },
  bioContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: appStyle.blackColor.pureDark,
    objectFit: "cover",
  },
});
