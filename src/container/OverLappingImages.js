import {FlatList, StyleSheet, Text} from 'react-native';
import {appStyle} from '../styles/theme';
import {ImageView} from '../components/ImageView';
import {TextView} from '../components/TextView';

export const OverLappingImagesView = ({imageSources, endText}) => {
  
  return (
    <FlatList
      key="Photos"
      contentContainerStyle={styles.scrollView}
      data={imageSources}
      horizontal={true}
      renderItem={({item, index}) => (
        <>
          <ImageView
            imageStyle={{
              ...styles.imageStyle,
              marginLeft: index !== 0 ? -6 : 0,
            }}
            source={item}
            roundImage={true}
          />
          {endText && <TextView text={endText} />}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: 45,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageStyle: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: appStyle.blackColor.pureDark,
  },
});
