import {StyleSheet, View, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {showEventsView} from '../../redux/ui/uiActions';
import {
  IconButton,
  IconTextButton,
  ImageTextButton,
} from '../../components/Button';
import {TextInputView} from '../../components/TextInputView';
import CalenderIcon from '../../../assets/calender_blur_icon.png';
import FriendsIcon from '../../../assets/friends_blur_icon.png';
import MovieIcon from '../../../assets/movie_icon.png';
import MusicIcon from '../../../assets/music_icon.png';
import TrekkingIcon from '../../../assets/trekking_icon.png';
import BeerIcon from '../../../assets/beer_blur.png';
import CoffeeIcon from '../../../assets/coffee_blur_icon.png';
import CelebrationIcon from '../../../assets/celebration_blur_icon.png';
import SportsIcon from '../../../assets/sports_blur.png';
import AvatarPng from '../../../assets/avatar.png';
import GymIcon from '../../../assets/gym_blur.png';
import FilterIcon from '../../../assets/filter.png';
import {fetchEvents} from '../../redux/events/eventsActions';
import {EventCategory, EventType} from '../../modal/Enum';

import {commonStyles} from '../../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {appStyle} from '../../styles/theme';
import {useState} from 'react';
import {eventTypeOptions} from '../../modal/Event';

export const MapSearchBar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loggedInUser} = useSelector(state => state.userReducer);
  const {eventsType} = useSelector(state => state.eventsReducer);
  const [eventType, setEventType] = useState('');

  const handleChange = (name, value) => {
    console.log(value);
  };

  const showEvents = eventType => {
    console.log(eventType);
  };

  return (
    <View style={styles.navContainer}>
      <View style={{...styles.searchContainer, ...commonStyles.shadowProp}}>
        <TextInputView
          textInputStyle={styles.textInputStyle}
          name="searchText"
          label="Search"
          placeholderText="Search"
          handleChange={handleChange}
          showLabel={false}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            wrapperStyles={{...styles.iconWrapper}}
            imageStyle={styles.imageButtonStyle}
            iconSrc={FilterIcon}
            triggerFunc={() => navigation.navigate('FilterView')}
          />
          <ImageTextButton
            imageStyle={{width: 35, height: 35, borderRadius: 25, zIndex: 100}}
            iconSrc={
              loggedInUser.imageUrl ? {uri: loggedInUser.imageUrl} : AvatarPng
            }
            triggerFunc={() => navigation.navigate('ProfileMenuView')}
          />
        </View>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.searchButtons}>
        <IconTextButton
          text={EventCategory.ALL}
          iconSrc={CalenderIcon}
          selected={true}
          triggerFunc={() => showEvents(EventCategory.ALL)}
        />
        <IconTextButton
          text={EventCategory.CELEBRATION}
          iconSrc={CelebrationIcon}
          triggerFunc={() => showEvents(EventType.CELEBRATION)}
        />
        <IconTextButton
          text={EventCategory.MUSIC}
          iconSrc={MusicIcon}
          triggerFunc={() => showEvents(EventType.SPORTS)}
        />
        <IconTextButton
          text={EventCategory.MEET_UP}
          iconSrc={FriendsIcon}
          triggerFunc={() => showEvents(EventCategory.MEET_UP)}
        />

        <IconTextButton
          text={EventCategory.COFFEE}
          iconSrc={CoffeeIcon}
          triggerFunc={() => showEvents(EventType.COFFEE)}
        />
        <IconTextButton
          text={EventCategory.DRINKS}
          iconSrc={BeerIcon}
          triggerFunc={() => showEvents(EventType.DRINKS)}
        />

        <IconTextButton
          text={EventCategory.GYM}
          iconSrc={GymIcon}
          triggerFunc={() => showEvents(EventType.GYM)}
        />
        <IconTextButton
          text={EventCategory.SPORTS}
          iconSrc={SportsIcon}
          triggerFunc={() => showEvents(EventType.SPORTS)}
        />

        <IconTextButton
          text={EventCategory.MOVIE}
          iconSrc={MovieIcon}
          triggerFunc={() => showEvents(EventType.SPORTS)}
        />
        <IconTextButton
          text={EventCategory.TRAVEL}
          iconSrc={TrekkingIcon}
          triggerFunc={() => showEvents(EventType.SPORTS)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'space-between',
    zIndex: 0,
  },
  searchContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    paddingRight: 10,
    borderRadius: 50,
    backgroundColor: 'white',
    zIndex: 0,
  },
  searchButtons: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  textInputStyle: {
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  navBarContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    right: 15,
  },
  iconWrapper: {
    borderWidth: 0,
    padding: 6,
    margin: 6,
    borderRadius: 8,
    backgroundColor: appStyle.pageColor,
  },
  imageButtonStyle: {
    width: 18,
    height: 18,
    borderWidth: 0,
  },
});
