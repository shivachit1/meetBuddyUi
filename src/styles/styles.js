import { StyleSheet } from "react-native";
import { appStyle } from "./theme";

export const commonStyles = StyleSheet.create({
    buttonContainer: {
      alignSelf:"center",
      flexDirection:"row",
      alignItems:"center",
      justifyContent: "center",
      padding: 6,
      paddingLeft: 12,
      paddingRight: 12,
      margin: 4,
      borderRadius: 20,
      backgroundColor: appStyle.pageColor
    },
    buttonText: {
      paddingLeft: 3,
      paddingRight: 2,
      fontSize: 10,
      fontWeight: "bold",
      textAlign: "center",
      color:"black",
    },
    backDrop: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: "rgba(3, 6, 10, 0.8)",
      },
      shadowProp: {
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        shadowColor: 'black',
      },
  });
