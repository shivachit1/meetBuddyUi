import {Animated, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useRef, useState} from 'react';
import {appStyle} from '../styles/theme';

export const TextInputWithLabel = ({
  textInputStyle,
  label,
  name,
  value,
  type,
  isTextArea,
  placeholderText,
  handleChange,
  showLabeOnFocus,
  textLengthMax,
  error,
}) => {
  const [textLengthSize, setTextlengthSize] = useState(value.length);

  const onTextChange = (fieldName, text) => {
    handleChange(fieldName, text);
    setTextlengthSize(text.length);
  };

  const styles = getStyles(isTextArea);
  return (
    <View style={{...styles.container}}>
      <Text style={{...styles.textLabel}}>{label}</Text>
      <TextInput
        style={{...styles.textInput, ...textInputStyle, borderWidth: 0.2}}
        name={name}
        value={value}
        inputMode={type}
        multiline={isTextArea}
        placeholder={placeholderText}
        placeholderTextColor="rgba(3, 6, 10, 0.5)"
        color="black"
        maxLength={textLengthMax}
        returnKeyLabel={label}
        onChangeText={value => onTextChange(name, value)}
      />
      {textLengthMax && (
        <Text style={{...styles.textLengthStyle}}>
          {textLengthSize + '/' + textLengthMax}
        </Text>
      )}
    </View>
  );
};

const getStyles = (currentTheme, isTextArea) => {
  return StyleSheet.create({
    container: {
      borderColor: appStyle.blackColor.pureDark,
      marginBottom: 10,
    },
    textLabel: {
      marginBottom: 2,
      paddingLeft: 2,
      paddingRight: 2,
      fontWeight: '600',
      color: 'green',
      zIndex: 5,
      color: appStyle.blackColor.pureDark,
    },
    textInput: {
      height: isTextArea ? 100 : 'auto',
      padding: 3,
      paddingLeft: 8,
      borderRadius: 4,
    },
    textLengthStyle: {
      textAlign: 'right',
      marginBottom: 2,
      paddingLeft: 2,
      paddingRight: 2,
      fontWeight: '600',
      color: 'green',
      zIndex: 5,
      fontSize: 10,
      color: appStyle.blackColor.pureDark,
    },
  });
};
