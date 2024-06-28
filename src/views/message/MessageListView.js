import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ViewContainer} from '../../container/ModalViewContainer';
import {MessageItemView} from './MessageItemView';
import {ItemSeparator} from '../../components/ItemSeperator';

export const MessageView = () => {
  const navigation = useNavigation();
  const {followerData} = useSelector(state => state.userReducer);

  if (!followerData) {
    return <></>;
  }

  const messsages = ['First Message', 'Second Message', 'Third Message'];

  return (
    <ViewContainer title="Messages" backDropOpacity={0.5}>
      <FlatList
        key="Messages"
        contentContainerStyle={styles.scrollView}
        data={messsages}
        horizontal={false}
        keyExtractor={item => item}
        ItemSeparatorComponent={ItemSeparator}
        removeClippedSubviews={true}
        ListEmptyComponent={() => (
          <TextView
            textStyle={{alignSelf: 'center'}}
            text="No Messages"
            fontWeight="bold"
          />
        )}
        renderItem={({item}) => <MessageItemView message={item} />}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
  },
});
