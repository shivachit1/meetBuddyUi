import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextView} from '../components/TextView';
import {
  getDay,
  getMonth,
  getTime,
  getWeekDay,
  getYear,
} from '../util/dateFormatter';
import {useDispatch, useSelector} from 'react-redux';
import {IconButton} from '../components/Button';

import HeartDarkIcon from '../../assets/heart_dark.png';
import HeartIcon from '../../assets/heart_grey.png';
import {addFavourites, removeFavourites} from '../redux/user/userActions';
import {useNavigation} from '@react-navigation/native';
import {showPopUpNotification} from '../redux/notifications/notification_action';
import {appStyle} from '../styles/theme';

export const EventItem = ({event}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {loggedInUser} = useSelector(state => state.userReducer);
  const isFollowing = false;

  const eventStartTime = event.eventStartTime;
  const day = getDay(eventStartTime);
  const month = getMonth(eventStartTime).substring(0, 3).toUpperCase();
  const year = getYear(eventStartTime);
  const time = getWeekDay(eventStartTime) + ' ' + getTime(eventStartTime);

  const favouriteToggling = () => {
    if (isFollowing) {
      dispatch(removeFavourites(loggedInUser.id, event.id, null));
    } else {
      dispatch(addFavourites(loggedInUser.id, event.id, null));
    }
  };

  return (
    <TouchableOpacity
      style={styles.eventContainer}
      key={event.id}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('EventDetailsView', {eventId: event.id})
      }>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.timeWrapperContainer}>
          <TextView
            textStyle={{marginTop: 0}}
            text={day}
            textSize={14}
            fontWeight="bold"
          />
          <TextView
            textStyle={{marginTop: 0}}
            text={month}
            textSize={12}
            fontWeight="bold"
          />
          <TextView textStyle={{marginTop: 0}} text={year} textSize={10} />
        </View>

        <View style={styles.columnContainer}>
          <TextView text={event.eventTitle} textSize={14} fontWeight="bold" />
          <TextView text={time} textSize={10} fontWeight="bold" />
          <TextView text={event.eventInfo} textSize={12} numberOfLines={2} />
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
    width: 22,
    height: 22,
  },
});
