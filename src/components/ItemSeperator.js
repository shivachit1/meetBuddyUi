import {StyleSheet, View} from 'react-native';

export const ItemSeparator = ({height, backgroundColor}) => (
  <View
    style={{
      ...styles.separator,
      backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF',
      height: height ? height : 3
    }}
  />
);

const styles = StyleSheet.create({
  separator: {
    height: 3,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 6, // Adjust the margin as needed
    borderRadius: 20,
  },
});
