import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';
import {appStyle} from '../styles/theme';
import {BasicButton} from '../components/Button';

import FriendsIcon from '../../assets/friends_blur_icon.png';
import BeerIcon from '../../assets/beer_blur.png';
import CoffeeIcon from '../../assets/coffee_blur_icon.png';
import {SliderView} from '../container/Slider';
import {setEventSearchFilter} from '../redux/ui/uiActions';

export const FilterView = () => {
  const dispatch = useDispatch();
  const {eventSearchFilterState} = useSelector(state => state.uiReducer);

  return (
    <ViewContainer
      title="Filter"
      backDropOpacity={0.5}
      modelStyle={{height: 'auto', paddingBottom: 20}}
      viewName="MyNotificationView">
      <View style={{marginLeft: 16, marginRight: 16}}>
        <View>
          <View>
            <TextView text="Distance" textSize={12} fontWeight="bold" />
            <View style={{marginTop: -12}}>
              <TextView
                textStyle={{alignSelf: 'flex-end'}}
                text={eventSearchFilterState.distance + ' km'}
                textSize={12}
                fontWeight="bold"
              />
              <SliderView
                value={eventSearchFilterState.distance}
                width={270}
                maxValue={150}
                minValue={0}
                handleChange={value =>
                  dispatch(
                    setEventSearchFilter({
                      ...eventSearchFilterState,
                      distance: value,
                    }),
                  )
                }
              />
            </View>
          </View>
          <View style={{marginTop: 16}}>
            <TextView text="When" textSize={12} fontWeight="bold" />
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              <BasicButton
                buttonStyle={{margin: 2, borderRadius: 6}}
                selected={eventSearchFilterState.day == 0}
                text="Today"
                iconSrc={FriendsIcon}
                triggerFunc={() =>
                  dispatch(
                    setEventSearchFilter({...eventSearchFilterState, day: 0}),
                  )
                }
              />
              <BasicButton
                buttonStyle={{margin: 2, borderRadius: 6}}
                selected={eventSearchFilterState.day == 1}
                text="Tomorrow"
                iconSrc={CoffeeIcon}
                triggerFunc={() =>
                  dispatch(
                    setEventSearchFilter({...eventSearchFilterState, day: 1}),
                  )
                }
              />
              <BasicButton
                buttonStyle={{margin: 2, borderRadius: 6}}
                selected={eventSearchFilterState.day == 2}
                text="Any Time"
                iconSrc={BeerIcon}
                triggerFunc={() =>
                  dispatch(
                    setEventSearchFilter({
                      ...eventSearchFilterState,
                      day: 2,
                    }),
                  )
                }
              />
            </View>
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
