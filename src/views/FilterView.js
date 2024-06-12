import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';
import {appStyle} from '../styles/theme';
import {IconTextButton} from '../components/Button';

import FriendsIcon from '../../assets/friends_blur_icon.png';
import BeerIcon from '../../assets/beer_blur.png';
import SaveIcon from '../../assets/save.png';
import CoffeeIcon from '../../assets/coffee_blur_icon.png';
import CelebrationIcon from '../../assets/celebration_blur_icon.png';
import SportsIcon from '../../assets/sports_blur.png';
import GymIcon from '../../assets/gym_blur.png';
import {useState} from 'react';
import {SliderView} from '../container/Slider';

export const FilterView = () => {
  const dispatch = useDispatch();
  const {loggedInUser} = useSelector(state => state.userReducer);
  const [distance, setDistance] = useState(60);

  return (
    <ViewContainer
      title="Filter"
      backDropOpacity={0.5}
      modelStyle={{height: 400}}
      viewName="MyNotificationView">
      <View style={{marginLeft: 16, marginRight: 16}}>
        <View>
          <View>
            <TextView text="Distance" textSize={14} fontWeight="bold" />
            <View style={{marginTop: -12}}>
              <TextView
                textStyle={{alignSelf: 'flex-end'}}
                text={distance + " km"}
                textSize={12}
                fontWeight="bold"
              />
              <SliderView
                value={distance}
                width={270}
                maxValue={150}
                minValue={0}
                handleChange={value => setDistance(value)}
              />
            </View>
          </View>
          <View style={{marginTop: 16}}>
            <TextView text="Category" textSize={14} fontWeight="bold" />
            <TextView
              textStyle={{alignSelf: 'center'}}
              text="Select only 6 of them max"
              textSize={10}
              fontWeight="700"
            />
            <View
              style={{marginTop: 12, flexDirection: 'row', flexWrap: 'wrap'}}>
              <IconTextButton
                text="Meet up"
                iconSrc={FriendsIcon}
                selected={true}
                triggerFunc={() => showEvents(EventType.MEET_UP)}
              />
              <IconTextButton
                text="Coffee"
                selected={true}
                iconSrc={CoffeeIcon}
                triggerFunc={() => showEvents(EventType.COFFEE)}
              />
              <IconTextButton
                text="Drinks"
                selected={true}
                iconSrc={BeerIcon}
                triggerFunc={() => showEvents(EventType.DRINKS)}
              />
              <IconTextButton
                text="Celebration"
                selected={true}
                iconSrc={CelebrationIcon}
                triggerFunc={() => showEvents(EventType.CELEBRATION)}
              />
              <IconTextButton
                text="Gym"
                iconSrc={GymIcon}
                triggerFunc={() => showEvents(EventType.GYM)}
              />
              <IconTextButton
                text="Sports"
                iconSrc={SportsIcon}
                triggerFunc={() => showEvents(EventType.SPORTS)}
              />
            </View>
          </View>
          <View style={{marginTop: 28}}>
            <IconTextButton
              wrapperStyles={{
                width: 80,
                justifyContent: 'space-around',
                backgroundColor: appStyle.blackColor.lightDark,
              }}
              textStyle={{fontSize: 12}}
              text="Save"
              iconSrc={SaveIcon}
              triggerFunc={() => showEvents(EventType.COFFEE)}
            />
          </View>
        </View>
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  scrollView: {
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: appStyle.blackColor.lightDark,
  },
});
