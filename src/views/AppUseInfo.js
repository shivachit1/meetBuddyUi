import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {SignInView} from './SignInView';
import {MapViewPage} from './Map/MapView';
import {ViewContainer} from '../container/ModalViewContainer';
import {TextView} from '../components/TextView';

export const AppUseInfoView = () => {
  const {userName} = useSelector(state => state.userReducer);

  return (
    <ViewContainer
      title="Info"
      backDropOpacity={0.6}
      modelStyles={styles.modalView}>
      <View>
        <TextView text="How to use create new event" />
        <TextView text="How to join as event venue" />
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: currentTheme.pageColor,
  },
  modalView: {
    position: 'absolute',
    width: '80%',
    top: 120,
    alignSelf: 'center',
    borderRadius: 12,
  },
});
