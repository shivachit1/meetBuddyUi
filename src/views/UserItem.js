import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextView} from '../components/TextView';
import {useDispatch, useSelector} from 'react-redux';
import {IconButton} from '../components/Button';

import HeartDarkIcon from '../../assets/heart_dark.png';
import AvatarIcon from '../../assets/avatar.png';
import {useNavigation} from '@react-navigation/native';
import {ImageView} from '../components/ImageView';

export const UserItem = ({user}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      key={user.id}
      activeOpacity={0.4}
      onPress={() => navigation.navigate('UserProfileView', {userId: user.id})}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: "center"}}>
        <ImageView
          imageStyle={styles.imageStyle}
          source={AvatarIcon}
          roundImage={true}
        />

        <View style={styles.columnContainer}>
          <TextView text={user.userName} textSize={12} fontWeight="bold" />
          <TextView text={user.bio} textSize={12} numberOfLines={2} />
        </View>
      </View>

      <View>
        <IconButton
          wrapperStyles={styles.iconButtonWrapper}
          imageStyle={styles.imageIconStyle}
          iconSrc={HeartDarkIcon}
          triggerFunc={() =>
            navigation.navigate('UnFollowOrganizerConfirmView', {user: user})
          }
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    margin: 4,
  },
  columnContainer: {
    justifyContent: 'flex-start',
    paddingLeft: 14,
    paddingRight: 30,
  },
  timeWrapperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonWrapper: {
    paddingLeft: 35,
  },
  imageStyle: {
    width: 45,
    height: 45,
    borderRadius: 20,
    objectFit: 'cover',
  },
  imageIconStyle: {
    width: 22,
    height: 22,
  },
});
