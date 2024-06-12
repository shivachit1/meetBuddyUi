import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {TextView} from './TextView';

const RadioButton = ({containerStyle, label, subLabel, selected, onPress}) => {
  return (
    <TouchableOpacity style={{...styles.radioButton, ...containerStyle}} onPress={onPress}>
      <View style={styles.radioButtonOuter}>
        {selected && <View style={styles.radioButtonInner} />}
      </View>
      <View style={{alignSelf: 'center'}}>
        {label && (
          <TextView
            textStyle={styles.radioButtonLabel}
            text={label}
            textSize={12}
            fontWeight="bold"
          />
        )}

        {subLabel && (
          <TextView
            textStyle={{...styles.radioButtonLabel, marginTop: 0}}
            text={subLabel}
            textSize={8}
            fontWeight="bold"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  radioButtonOuter: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioButtonLabel: {
    marginLeft: 6,
    alignSelf: 'flex-start',
  },
});

export default RadioButton;
