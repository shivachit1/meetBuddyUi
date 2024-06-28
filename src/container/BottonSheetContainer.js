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
import {useDispatch} from 'react-redux';
import {removeView} from '../redux/ui/uiActions';
import {TextView} from '../components/TextView';
import {useEffect, useRef, useState} from 'react';

import {commonStyles} from '../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {appStyle} from '../styles/theme';

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
  actionButtonView,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const scrollUp = useRef(new Animated.Value(deviceHeight)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [isScrollViewAtTop, setIsScrollViewAtTop] = useState(true);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => isScrollViewAtTop,
    onPanResponderMove: (event, gesture) => {
      const constrainedOffsetY = Math.max(
        Math.min(gesture.dy, deviceHeight),
        0,
      );
      scrollUp.setValue(constrainedOffsetY);

      const opacity = Math.min(
        backDropOpacity,
        Math.max(
          0,
          backDropOpacity -
            constrainedOffsetY / (backDropOpacity * deviceHeight),
        ),
      );
      opacityValue.setValue(opacity);
    },
    onPanResponderGrant: (event, gesture) => {
      setIsScrollViewAtTop(Math.abs(gesture.dy) > 5);
    },
    onPanResponderRelease: () => {
      const currentPosition = scrollUp._value;
      if (currentPosition > 300) {
        removeViewWithAnim();
      } else {
        showViewWithAnim();
      }
    },
  });

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

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY === 0) {
      setIsScrollViewAtTop(true);
    } else {
      setIsScrollViewAtTop(false);
    }
  };

  console.log(isScrollViewAtTop);

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

        {scrollView ? (
          <ScrollView
            style={styles.scrollView}
            onScroll={handleScroll}
            indicatorStyle="default"
            scrollEventThrottle={16}>
            {children}
          </ScrollView>
        ) : (
          <View style={styles.scrollView}>{children}</View>
        )}

        {actionButtonView}
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
      height: height ? height : '60%',
      width: '100%',
      padding: 10,
      paddingBottom: 0,
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
