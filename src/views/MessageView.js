import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {ViewContainer} from '../container/ModalViewContainer';
import {useNavigation} from '@react-navigation/native';

export const MessageView = () => {
  const navigation = useNavigation();
  const {followerData} = useSelector(state => state.userReducer);

  if (!followerData) {
    return <></>;
  }

  return (
    <ViewContainer
      title="Messages"
      backDropOpacity={0.5}
      navigation={navigation}
      viewName="MyFavsView"></ViewContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
  },
});
