import {Animated, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useRef, useState} from 'react';
import { appStyle } from '../styles/theme';

export const TextInputView = ({
  textInputStyle,
  label,
  name,
  type,
  isTextArea,
  placeholderText,
  handleChange,
  showLabeOnFocus,
  error,
}) => {

  const [placeHolder, setPlaceHolder] = useState(placeholderText);
  const animateLabel = useRef(new Animated.Value(16)).current;
  const [showLabel, setShowLabel] = useState(false);

  const onTextChange = (fieldName, text) => {
    handleChange(fieldName, text);
    if (text.length > 0) {
      setShowLabel(showLabeOnFocus)
      Animated.timing(animateLabel, {
        toValue: -4,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animateLabel, {
        toValue: 16,
        duration: 100,
        useNativeDriver: true,
      }).start(() => setShowLabel(false));
    }
  };

  const styles = getStyles(isTextArea);
  return (
    <View style={{...styles.container, borderWidth: showLabel ?  1 : 0}}>
      <Animated.View style={{...styles.textLabel, transform: [{ translateY: animateLabel }], display: showLabel ? 'flex' : "none"}}>
        <Text style={{...styles.textLabel}}>{label}</Text>
      </Animated.View>
      <TextInput
        style={{...styles.textInput, ...textInputStyle}}
        name={name}
        inputMode={type}
        multiline={isTextArea}
        numberOfLines={isTextArea ? 10 : 1}
        placeholder={placeHolder}
        placeholderTextColor="rgba(3, 6, 10, 0.5)"
        color="black"
        textAlignVertical="top"
        onChangeText={value => onTextChange(name, value)}
      />
    </View>
  );
};

const getStyles = (currentTheme, isTextArea) => {
  return StyleSheet.create({
    container: {
      height: 40,
      borderColor: appStyle.blackColor.pureDark,
      borderWidth: 0,
      borderRadius: 8,
    },
    textLabel: {
      position: 'absolute',
      top: -3.5,
      marginLeft: 4,
      paddingLeft: 2,
      paddingRight: 2,
      fontWeight: 'bold',
      color: 'green',
      zIndex: 5,
      color: appStyle.blackColor.pureDark,
      backgroundColor: appStyle.pageColor
    },
    textInput: {
      height: isTextArea ? 200 : 'auto',
      fontWeight: 'bold',
      textAlign:"left",
      justifyContent:"flex-end",
      borderBottomColor: "green",
      padding: 3,
      paddingLeft: 8,
    },
  });
};
