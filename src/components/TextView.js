import { StyleSheet, Text } from "react-native";
import { appStyle } from "../styles/theme";

export const TextView = ({textStyle, text, textSize, fontWeight, numberOfLines}) => {

  const styles = getStyles(textSize, fontWeight);
  return <Text style={{...styles.textStyle, ...textStyle}} ellipsizeMode="tail" numberOfLines={numberOfLines}>{text}</Text>;
}

const getStyles = (textSize, fontWeight) => {
  return StyleSheet.create({
    textStyle: {
      color: appStyle.blackColor.pureDark,
      fontSize: textSize,
      fontWeight: fontWeight,
      marginTop: 4,
      fontFamily: 'Poppins-Bold'
    },
  });
};