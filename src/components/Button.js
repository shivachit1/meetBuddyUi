import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../styles/styles';
import {appStyle} from '../styles/theme';

export const BasicButton = ({
  buttonStyle,
  textStyle,
  selected,
  text,
  triggerFunc,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...commonStyles.buttonContainer,
        borderWidth: 1,
        borderColor: appStyle.blackColor.lightDark,
        backgroundColor: selected
          ? appStyle.blackColor.pureDark
          : 'transparent',
        ...buttonStyle,
      }}
      activeOpacity={0.4}
      onPress={() => triggerFunc()}>
      <Text
        style={{
          ...commonStyles.buttonText,
          fontSize: 12,
          ...textStyle,
          color: selected ? appStyle.pageColor : appStyle.blackColor.pureDark,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const IconTextButton = ({
  wrapperStyles,
  iconStyles,
  textStyle,
  selected,
  text,
  imgUrlSrc,
  iconSrc,
  triggerFunc,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...commonStyles.buttonContainer,
        backgroundColor: selected
          ? appStyle.blackColor.lightDark
          : appStyle.pageColor,
        ...commonStyles.shadowProp,
        ...wrapperStyles,
      }}
      activeOpacity={0.4}
      onPress={() => triggerFunc()}>
      {iconSrc && (
        <Image
          style={{...styles.imgButton, ...iconStyles}}
          source={imgUrlSrc ? {uri: imgUrlSrc} : iconSrc}
        />
      )}
      <Text style={{...commonStyles.buttonText, ...textStyle}}>{text}</Text>
    </TouchableOpacity>
  );
};

export const ButtonSucess = ({text, triggerFunc}) => {
  return (
    <TouchableOpacity
      style={{
        ...commonStyles.buttonContainer,
        padding: 10,
        borderRadius: 18,
        backgroundColor: appStyle.buttonColor.success,
      }}
      activeOpacity={0.4}
      onPress={() => triggerFunc()}>
      <Text
        style={{
          ...commonStyles.buttonText,
          fontSize: 12,
          color: appStyle.pageColor,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const ButtonError = ({text, iconSrc, triggerFunc}) => {
  return (
    <TouchableOpacity
      style={{
        ...commonStyles.buttonContainer,
        backgroundColor: appStyle.buttonColor.error,
        ...commonStyles.shadowProp,
      }}
      activeOpacity={0.4}
      onPress={() => triggerFunc()}>
      {iconSrc && <Image style={{...styles.imgButton}} source={iconSrc} />}
      <Text style={{...commonStyles.buttonText, color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export const ImageTextButton = ({
  positionStyle,
  imageStyle,
  iconSrc,
  textStyle,
  text,
  triggerFunc,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.imgButtonContainer, ...positionStyle}}
      activeOpacity={0.4}
      onPress={() => triggerFunc()}>
      <Image
        style={{...styles.imgButton, ...imageStyle}}
        source={iconSrc}
        alt="image"
      />
      {text && (
        <View style={styles.textContainer}>
          <Text style={{...styles.text, ...textStyle}}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const IconButton = ({
  wrapperStyles,
  imageStyle,
  iconSrc,
  triggerFunc,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.imgButtonContainer, ...wrapperStyles}}
      activeOpacity={0.4}
      onPress={() => triggerFunc()}>
      <Image
        style={{...styles.imgButton, ...imageStyle}}
        source={iconSrc}
        alt="image"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgButtonContainer: {
    alignItems: 'center',
    borderRadius: 40,
  },
  imgButton: {
    width: 16,
    height: 16,
  },
  textContainer: {
    alignSelf: 'center',
    position: 'absolute',
    padding: 0,
    paddingLeft: 7,
    paddingRight: 7,
    bottom: -8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appStyle.pageColor,
    backgroundColor: appStyle.blackColor.pureDark,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
