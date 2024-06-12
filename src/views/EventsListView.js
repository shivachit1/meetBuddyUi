import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {TextView} from '../components/TextView';
import {useEffect, useState} from 'react';

import {appStyle} from '../styles/theme';
import { EventCard } from './EventItemView';

const eventItemWidth = Dimensions.get('window').width;
export const EventsListView = ({
  flatListViewRef,
  showEventCoordinate,
}) => {
  const dispatch = useDispatch();
  const showEventsView = useSelector(state => state.uiReducer.eventsViewActive);
  
  const {events} = useSelector(state => state.eventsReducer);

  const [snapped, setSnapped] = useState(false);

  useEffect(() => setSnapped(true), []);

  const showLocation = (event, index) => {
    if (snapped) showEventCoordinate(event);
  };

  const eventIndexs = events.slice(0, 6);; // dots indicator
  const [activeIndex, setActiveIndex] = useState(0);
  const handleMomentumScrollEnd = e => {
    // Get the content offset of the ScrollView
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    // Calculate the index of the snapped item
    const snappedIndex = Math.round(contentOffsetX / eventItemWidth);
    // Get the item data based on the snapped index
    if (snappedIndex != activeIndex) {
      if (snappedIndex <= 4) {
        setActiveIndex(snappedIndex);
      } else if (snappedIndex == events.length - 1) {
        setActiveIndex(5);
      }
    }
  };

  const NoEvent = ({text}) => (
    <View style={{...styles.container, alignItems: 'center'}}>
      <TextView text="No events near by, try moving the map" textSize={14} />
    </View>
  );

  return (
    <View style={styles.horizontalContainer}>
      <Pressable style={styles.dotContainer}>
        {eventIndexs.map((_, index) => (
          <View
            key={index}
            style={{
              ...styles.dot,
              backgroundColor:
                index === activeIndex
                  ? appStyle.blackColor.pureDark
                  : appStyle.blackColor.lightDark,
            }}
          />
        ))}
      </Pressable>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          display: showEventsView ? 'flex' : 'none',
        }}
        data={events}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
        ref={flatListViewRef}
        horizontal={true}
        key={({item, index}) => item.id}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => <EventCard event={item}/>}
        ListEmptyComponent={() => <NoEvent/>}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={e => handleMomentumScrollEnd(e)}
        snapToInterval={Dimensions.get('window').width}
        onViewableItemsChanged={(item, index) => {
          if (item.viewableItems.length == 1) {
            showLocation(item.viewableItems[0].item);
          }
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: '80%',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    bottom: 5,
  },
  flatListContainer: {
    justifyContent: 'flex-end',
  },
  optionButtonContainer: {
    flexDirection: 'row',
  },
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
    top: 6,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startingTimeTextStyle: {
    color: appStyle.blackColor.midDark,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 8 / 2,
    backgroundColor: appStyle.blackColor.lightDark,
    marginHorizontal: 8 / 2,
  },
});
