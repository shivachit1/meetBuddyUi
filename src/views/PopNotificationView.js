import {StyleSheet, Text, View} from 'react-native';
import {appStyle} from '../styles/theme';

export const PopNotificationView = ({route}) => {
  const {message} = route.params;

  if (!message) <></>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: appStyle.buttonColor.success,
    borderRadius: 10,
    zIndex: 200,
  },
  text: {
    width: 'auto',
    padding: 10,
    color: appStyle.pageColor,
    fontSize: 12,
  },
});
