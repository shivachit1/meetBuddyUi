import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HeartDarkIcon from '../../../assets/avatar.png';
import {useNavigation} from '@react-navigation/native';
import {appStyle} from '../../styles/theme';
import {ImageView} from '../../components/ImageView';
import {TextView} from '../../components/TextView';

export const MessageItemView = ({message}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {loggedInUser} = useSelector(state => state.userReducer);

  console.log(message);

  return (
    <TouchableOpacity
      style={styles.eventContainer}
      key={message}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('ChatRoomView', {chatRoomId: message})
      }>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <ImageView source={HeartDarkIcon} imageStyle={styles.imageStyle} />

        <View style={styles.columnContainer}>
          <TextView text={message} textSize={12} fontWeight="bold" />

          <TextView
            text={message}
            textSize={10}
            fontWeight="bold"
            textStyle={{color: appStyle.blackColor.midDark}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingLeft: 14,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 4,
    backgroundColor: appStyle.blackColor.lightDark,
  },
  timeWrapperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 40,
    height: 40,
  },
});
