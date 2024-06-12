import {
  Pressable,
  StyleSheet,
  Animated,
  View,
  Dimensions,
  ScrollView,
  PanResponder,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeView, setActiveView} from '../redux/ui/uiActions';
import {TextView} from '../components/TextView';
import {useEffect, useRef} from 'react';

import {commonStyles} from '../styles/styles';
import {UnFollowConfirmView} from '../views/UnFollowOrganizerConfirmView';
import {IconButton} from '../components/Button';

import CloseIcon from '../../assets/close.png';
import {appStyle} from '../styles/theme';
import { useNavigation } from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;

export const BottomSheetContainer = ({
  backDropOpacity,
  modelStyles,
  height,
  top,
  title,
  alignItems,
  showScrollSign,
  viewName,
  children,
  scrollView,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const scrollUp = useRef(new Animated.Value(deviceHeight)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const constrainedOffsetY = Math.max(
          Math.min(gesture.dy, deviceHeight),
          -10,
        );
        scrollUp.setValue(constrainedOffsetY);

        // Calculate opacity based on gesture movement
        const opacity = Math.min(
          0.8,
          Math.max(
            0,
            backDropOpacity -
              constrainedOffsetY / (backDropOpacity * deviceHeight),
          ),
        );
        opacityValue.setValue(opacity);
      },
      onPanResponderRelease: () => {
        const currentPosition = scrollUp._value;
        if (currentPosition > 300) {
          removeViewWithAnim();
        } else {
          showViewWithAnim();
        }
      },
    }),
  ).current;

  useEffect(() => {
    showViewWithAnim();
  }, []);

  const showViewWithAnim = () => {
    Animated.parallel([
      Animated.timing(scrollUp, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: backDropOpacity,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const removeViewWithAnim = () => {
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(scrollUp, {
        toValue: Dimensions.get('window').height,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.goBack());
  };

  const styles = getStyles(height, alignItems);
  return (
    <View style={{...styles.container}}>
      <Animated.View style={{...commonStyles.backDrop, opacity: opacityValue}}>
        <Pressable
          style={commonStyles.backDrop}
          onPress={() => removeViewWithAnim()}></Pressable>
      </Animated.View>

      <Animated.View
        style={{
          ...styles.modalView,
          top: top,
          transform: [{translateY: scrollUp}],
          ...modelStyles,
        }}
        {...panResponder.panHandlers}>
        {showScrollSign && <View style={{...styles.scrollabeSign}} />}
        <View style={styles.titleContainer}>
          <TextView text={title} textSize={16} fontWeight="bold" />
        </View>

        {scrollView && (
          <ScrollView style={styles.scrollView}>{children}</ScrollView>
        )}
        {!scrollView && <View style={styles.scrollView}>{children}</View>}
      </Animated.View>
    </View>
  );
};

const getStyles = (height, alignItems) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 5,
      justifyContent: alignItems ? alignItems : 'flex-start',
      alignItems: alignItems ? alignItems : 'flex-start',
    },
    titleContainer: {
      marginTop: 16,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    scrollabeSign: {
      position: 'absolute',
      width: 60,
      top: 12,
      alignSelf: 'center',
      borderTopColor: 'grey',
      borderTopWidth: 3,
      marginBottom: 10,
      borderRadius: 2,
    },
    modalView: {
      height: height ? height : '70%',
      width: '100%',
      padding: 10,
      paddingBottom: 30,
      marginBottom: -10,
      alignItems: alignItems ? alignItems : 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: appStyle.pageColor,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    scrollView: {
      flexGrow: 1,
      width: '100%',
    },
  });
};
