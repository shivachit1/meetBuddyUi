import {StyleSheet, View} from 'react-native';
import {appStyle} from '../styles/theme';
import {TextView} from './TextView';

export const ProgressBar = ({progressPercentage}) => {
  return (
    <View style={styles.progressbarView}>
      <View style={styles.progressBarContainer}>
        <View style={{...styles.progressBar, width: progressPercentage}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressbarView: {
    marginTop: 6,
    marginBottom: 6,
    width: '100%',
    paddingLeft: 4,
    paddingRight: 4,
  },
  progressBarContainer: {
    height: 5,
    borderRadius: 10,
    backgroundColor: appStyle.blackColor.lightDark,
  },
  progressBar: {
    height: 5,
    borderRadius: 10,
    backgroundColor: appStyle.blackColor.pureDark,
  },
});
