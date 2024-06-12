import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';
import {appStyle} from '../styles/theme';
import {BasicButton, IconTextButton} from '../components/Button';

import FriendsIcon from '../../assets/friends_blur_icon.png';
import BeerIcon from '../../assets/beer_blur.png';
import SaveIcon from '../../assets/save.png';
import CoffeeIcon from '../../assets/coffee_blur_icon.png';
import CelebrationIcon from '../../assets/celebration_blur_icon.png';
import SportsIcon from '../../assets/sports_blur.png';
import GymIcon from '../../assets/gym_blur.png';
import {useState} from 'react';
import {SliderView} from '../container/Slider';
import {commonStyles} from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

export const EventSuccessView = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const {loggedInUser} = useSelector(state => state.userReducer);
  const [distance, setDistance] = useState(60);

  const event = route.params?.event

  return (
    <ViewContainer
      backDropOpacity={0.5}
      modelStyle={styles.container}
      hideCloseButton={true}>
      <TextView
        textStyle={{textAlign: 'center', fontSize: 16}}
        text="Event created successfully"
        fontWeight="bold"
      />

      <TextView
        textStyle={{textAlign: 'center', fontSize: 12}}
        text="Next step is to send invitations to people you know"
      />
      <BasicButton
        buttonStyle={{
          backgroundColor: appStyle.blackColor.pureDark,
          marginTop: 16,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 6,
          ...commonStyles.shadowProp,
        }}
        textStyle={{color: appStyle.pageColor}}
        text="View Event"
        triggerFunc={() => navigation.navigate("EventDetailsView", {eventId: event?.id})}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
