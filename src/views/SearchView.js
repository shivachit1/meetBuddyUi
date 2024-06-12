import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { BasicButton } from "../components/Button";
import { ViewContainer } from "../container/BottonSheetContainer";
import { TextView } from "../components/TextView";

export const SearchView = () => {
  const dispatch = useDispatch();

  return (
    <ViewContainer
    modelStyles={styles.modalView}
    backDropOpacity={0.4}>
      <TextView text="Event tags"></TextView>
      <ScrollView style={styles.container} 
      showsVerticalScrollIndicator={true}
      scrollEnabled={true}
      horizontal={true}
      contentContainerStyle={{
        flexDirection:"row",
            justifyContent: "flex-start",
          }}>
        <BasicButton text="All" triggerFunc={() => console.log("hello")} />
        <BasicButton text="Sports" triggerFunc={() => console.log("hello")} />
        <BasicButton text="Concert" triggerFunc={() => console.log("hello")} />
        <BasicButton text="Coffee" triggerFunc={() => console.log("hello")} />
        <BasicButton text="Lunch" triggerFunc={() => console.log("hello")} />
        <BasicButton text="Dinner" triggerFunc={() => console.log("hello")} />
        <BasicButton text="Gym" triggerFunc={() => console.log("hello")} />
        <BasicButton text="Swimming" triggerFunc={() => console.log("hello")} />
        <BasicButton text="Hang out in Beach" triggerFunc={() => console.log("hello")} />
      </ScrollView>
      <View style={styles.container} 
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
            justifyContent: "flex-start",
          }}>
        <TextView text="Distance"></TextView>
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  modalView: {
    position: "absolute",
    width: "70%",
    top: 100,
    alignSelf: "center",
    borderRadius: 12
  },
});
