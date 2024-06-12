import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';
import {ItemSeparator} from '../components/ItemSeperator';
import {appStyle} from '../styles/theme';
import {TabViewContainer} from '../container/TabViewContainer';

export const MyNotificationView = ({navigation}) => {
  const dispatch = useDispatch();
  const {loggedInUser} = useSelector(state => state.userReducer);
  const {notifications} = useSelector(state => state.notificationReducer);

  const NotficationItemView = notification => {
    return (
      <View style={styles.notificationContainer} key={notification.id}>
        <TextView text={notification.id + notification.notificationMessage} />
      </View>
    );
  };

  return (
    <ViewContainer
      title="Notification"
      backDropOpacity={0.5}
      navigation={navigation}
      viewName="MyNotificationView">
      <TabViewContainer
        viewWidth={Dimensions.get('window').width * 0.8}
        buttonNames={[]}
        buttonsVisible={true}
        scrollEnabled={true}>
        <FlatList
          contentContainerStyle={styles.scrollView}
          data={notifications}
          horizontal={false}
          key={({item, index}) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({item, index}) => NotficationItemView(item)}
        />
      </TabViewContainer>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  scrollView: {
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: appStyle.blackColor.lightDark,
  },
});
