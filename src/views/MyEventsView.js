import {Dimensions, FlatList, StyleSheet} from 'react-native';

import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';
import {TabViewContainer} from '../container/TabViewContainer';
import {useDispatch, useSelector} from 'react-redux';

import {ItemSeparator} from '../components/ItemSeperator';
import {appStyle} from '../styles/theme';
import {EventItem} from './EventItem';

export const MyEventsView = () => {
  const dispatch = useDispatch();
  const {events} = useSelector(state => state.eventsReducer);
  const {myFavourites} = useSelector(state => state.userReducer);

  const buttonNames = ['UpComing', 'Interested', 'Past'];
  return (
    <ViewContainer
      title="My Calender"
      backDropOpacity={0.5}
      viewName="MyEventsView">
      <TabViewContainer
        viewWidth={Dimensions.get('window').width * 0.8}
        buttonNames={buttonNames}
        buttonsVisible={true}
        scrollEnabled={true}>
        <FlatList
          key="UpComing Events"
          contentContainerStyle={styles.scrollView}
          data={[]}
          horizontal={false}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={ItemSeparator}
          removeClippedSubviews={true}
          ListEmptyComponent={() => (
            <TextView
              textStyle={{alignSelf: 'center'}}
              text="No UpComing events"
              fontWeight="bold"
            />
          )}
          renderItem={({item}) => <EventItem event={item} />}
        />

        <FlatList
          key="Interested Events"
          contentContainerStyle={styles.scrollView}
          data={[]}
          horizontal={false}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={ItemSeparator}
          removeClippedSubviews={true}
          ListEmptyComponent={() => (
            <TextView
              textStyle={{alignSelf: 'center'}}
              text="No Interested events"
              fontWeight="bold"
            />
          )}
          renderItem={({item, index}) => <EventItem event={item} />}
        />

        <FlatList
          key="Past Events"
          contentContainerStyle={styles.scrollView}
          data={[]}
          horizontal={false}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={ItemSeparator}
          removeClippedSubviews={true}
          ListEmptyComponent={() => (
            <TextView
              textStyle={{alignSelf: 'center'}}
              text="No Past events"
              fontWeight="bold"
            />
          )}
          renderItem={({item, index}) => <EventItem event={item} />}
        />
      </TabViewContainer>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyle.pageColor,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventContainer: {
    alignItems: 'flex-start',
    padding: 6,
    borderColor: 'black',
    marginBottom: 4,
    borderRadius: 4,
  },
  scrollView: {
    justifyContent: 'center',
  },
});
