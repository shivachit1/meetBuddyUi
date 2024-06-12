import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextView } from './TextView';

const Checkbox = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View style={styles.checkbox}>
        {selected && <View style={styles.checkboxInner} />}
      </View>
      <TextView textStyle={styles.checkboxLabel} text={label} textSize={12} fontWeight="bold"/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    justifyContent: "center"
  },
  checkbox: {
    height: 16,
    width: 16,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxInner: {
    height: 8,
    width: 8,
    backgroundColor: '#000',
  },
  checkboxLabel: {
    marginLeft: 6,
    marginTop: 0,
    paddingTop: 0
  },
});

export default Checkbox;
