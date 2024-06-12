import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import {ImageTextButton} from '../components/Button';
import {useDispatch} from 'react-redux';
import {TextView} from '../components/TextView';
import {commonStyles} from '../styles/styles';
import {appStyle} from '../styles/theme';

import Avatar from '../../assets/avatar.png';
import {getDate} from '../util/dateFormatter';
import {useNavigation} from '@react-navigation/native';

const eventItemWidth = Dimensions.get('window').width;
export const EventCard = ({event}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const organizer = event.createdBy;

  const date = getDate(event.eventStartTime);
  return (
    <View>
      <TouchableOpacity
        style={{...styles.container, ...commonStyles.shadowProp}}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('EventDetailsView', {eventId: event.id})
        }>
        <ImageTextButton
          positionStyle={{
            position: 'absolute',
            top: -30,
            left: 5,
            zIndex: 5,
            borderWidth: 0,
          }}
          imageStyle={{width: 45, height: 45, padding: 4, borderRadius: 40, borderWidth: 2, borderColor: appStyle.blackColor.pureDark}}
          iconSrc={organizer.imageUrl ? {uri: organizer.imageUrl} : Avatar}
          text="Host"
          textStyle={{fontSize: 10, width: 25}}
          triggerFunc={() =>
            navigation.navigate('UserProfileView', {userId: organizer.id})
          }
        />
        <View style={styles.startingTimeContainer}>
          <TextView textSize={12} text={date} fontWeight="700" />
        </View>

        <View style={styles.cardContent}>
          <TextView text={event.eventTitle} textSize={16} fontWeight="bold" />
          <TextView
            textStyle={{ellipsizeMode: 'tail', fontSize: 12}}
            text={event.eventInfo}
            numberOfLines={3}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: eventItemWidth - 32,
    minHeight: 130,
    maxHeight: 130,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 2,
    padding: 16,
    paddingTop: 25,
    marginTop: 35,
    backgroundColor: appStyle.pageColor,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  startingTimeContainer: {
    position: 'absolute',
    top: 4,
    right: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    alignItems: 'flex-start',
    paddingTop: 8,
  },
});
