import {useEffect, useState} from 'react';
import {appStyle} from '../styles/theme';
import {commonStyles} from '../styles/styles';

import HeartDarkIcon from '../../assets/heart_dark.png';
import HeartIcon from '../../assets/heart.png';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {followCheck, followUser, unFollowUser} from '../service/UserService';

export const FollowButton = ({targetedUserId}) => {
  const {loggedInUser} = useSelector(state => state.userReducer);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const checkFollow = async () => {
      const isFollowing = await followCheck(loggedInUser.id, targetedUserId);
      setFollowing(isFollowing);
    };
    checkFollow();
  }, [loggedInUser.id]);

  const handleFollow = () => {
    try {
      followUser(loggedInUser.id, targetedUserId);
      setFollowing(pre => true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnFollow = () => {
    try {
      unFollowUser(loggedInUser.id, targetedUserId);
      setFollowing(pre => false);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(following);

  return (
    <TouchableOpacity
      style={{
        ...commonStyles.buttonContainer,
        backgroundColor: appStyle.blackColor.lightDark,
        ...commonStyles.shadowProp,
      }}
      activeOpacity={0.4}
      onPress={() => (following ? handleUnFollow() : handleFollow())}>
      <Image
        style={styles.imgButton}
        source={following ? HeartDarkIcon : HeartIcon}
      />
      <Text style={commonStyles.buttonText}>
        {following ? 'Following' : 'Follow'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgButton: {
    width: 16,
    height: 16,
    objectFit: '',
  },
});
