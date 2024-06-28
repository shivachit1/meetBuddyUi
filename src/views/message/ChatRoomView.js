import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {appStyle} from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {TextView} from '../../components/TextView';
import {TextInputView} from '../../components/TextInputView';
import {IconButton} from '../../components/Button';

import AvatarPng from '../../../assets/send.png';
import {MessageItemView} from './MessageItemView';
import {ViewContainer} from '../../container/ModalViewContainer';

export const ChatRoomView = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loggedInUser} = useSelector(state => state.userReducer);
  const {chatRoomId} = route.params;

  console.log(route);

  const handleChange = text => {
    console.log(text);
  };

  const UserChatBox = ({message}) => {
    return (
      <View
        style={{
          backgroundColor: appStyle.blackColor.pureDark,
          maxWidth: '70%',
          flexGrow: 1,
          marginBottom: 4,
          justifyContent: 'center',
          borderRadius: 10,
          alignSelf: 'flex-end',
        }}>
        <TextView
          textStyle={{
            color: appStyle.pageColor,
            padding: 6,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          textSize={10}
          text={message}
          fontWeight="bold"
        />
      </View>
    );
  };

  const OtherUserChatBox = ({message}) => {
    return (
      <View
        style={{
          backgroundColor: appStyle.blackColor.lightDark,
          maxWidth: '70%',
          alignSelf: 'flex-start',
          marginBottom: 4,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <TextView
          textStyle={{
            color: appStyle.blackColor.pureDark,
            padding: 6,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          textSize={10}
          text={message}
          fontWeight="bold"
        />
      </View>
    );
  };

  const messsages = ['First Message', 'Second Message', 'Third Message'];

  return (
    <ViewContainer
      style={styles.container}
      title={chatRoomId}
      backDropOpacity={0.5}>
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          key="ChatRoomMessage"
          contentContainerStyle={{
            flex: 1,
            padding: 10,
            justifyContent: 'flex-end',
          }}
          data={messsages}
          horizontal={false}
          keyExtractor={item => item}
          ListEmptyComponent={() => (
            <TextView
              textStyle={{alignSelf: 'center'}}
              text="No Messages"
              fontWeight="bold"
            />
          )}
          renderItem={({item, index}) => {
            if (index == 0) {
              return <OtherUserChatBox message={item} />;
            } else {
              return <UserChatBox message={item} />;
            }
          }}
        />
      </View>
      <KeyboardAvoidingView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
        }}>
        <TextInput
          style={{
            flexGrow: 1,
            borderRadius: 20,
            padding: 6,
            fontSize: 12,
            backgroundColor: appStyle.blackColor.lightDark,
            color: appStyle.blackColor.pureDark,
          }}
          placeholder="Write a message here"
          placeholderTextColor={appStyle.blackColor.midDark}
          type="text"
          isTextArea={true}
          multiline={true}
          handleChange={handleChange}
          fontWeight="bold"
        />
        <IconButton
          imageStyle={{
            width: 35,
            height: 35,
            objectFit: 'contain',
          }}
          iconSrc={AvatarPng}></IconButton>
      </KeyboardAvoidingView>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'start',
    justifyContent: 'start',
    backgroundColor: appStyle.pageColor,
  },
  textInputStyle: {
    width: '100%',
    marginTop: 6,
    paddingTop: 2,
    paddingLeft: 4,
    paddingBottom: 2,
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 6,
    color: appStyle.blackColor.pureDark,
    borderWidth: 1,
    borderColor: appStyle.blackColor.pureDark,
    justifyContent: 'center',
  },
  imageButtonStyle: {
    width: 22,
    height: 22,
  },
});
