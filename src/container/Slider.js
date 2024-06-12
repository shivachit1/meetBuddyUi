import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

import { appStyle } from '../styles/theme';
import { TextView } from '../components/TextView';

export const SliderView = ({
  width,
  minValue,
  maxValue,
  value,
  handleChange,
  withArrowText
}) => {
  const valuePerPix = width / maxValue;
  const slidePosition = useRef(new Animated.Value(value * valuePerPix)).current;
  const [slideStarted, setSlideStarted] = useState(false);
  const [sliderValue, setSliderValue] = useState(value);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        gestureState.dx = slidePosition.__getValue();
        setSlideStarted(true);
      },
      onPanResponderMove: (event, gestureState) => {
        const newValue = Math.max(minValue, Math.min(gestureState.dx, width));
        slidePosition.setValue(newValue);
        setSliderValue(parseInt(newValue / valuePerPix));
        handleChange(parseInt(newValue / valuePerPix));
      },
      onPanResponderRelease: () => {
        setSlideStarted(false);
      },
    }),
  ).current;

  const ArrowTextView = () => {
    return (
      <View
        style={{
          position: 'absolute',
          width: 40,
          top: -28,
          borderRadius: 6,
          alignItems: "center",
          padding: 4,
          paddingTop: 0,
          backgroundColor: appStyle.blackColor.pureDark,
        }}>
        <TextView
          textStyle={{ color: appStyle.pageColor, textAlign: 'center' }}
          text={sliderValue}
          textSize={10}
          fontWeight="bold"
        />
        <View style={styles.pointer}></View>
      </View>
    )
  }

  return (
    <View style={styles.progressbarView}>
      <View style={{ ...styles.progressBarContainer, width: width }}></View>
      <Animated.View
        style={[styles.progressBar, { maxWidth: width, width: slidePosition }]}
        {...panResponder.panHandlers}>
        <View style={styles.circleAnim}>
          {withArrowText && <ArrowTextView/>}
          <View
            style={[
              styles.circleInactive,
              slideStarted && styles.circleActive,
            ]}></View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressbarView: {
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: 'red',
  },
  progressBarContainer: {
    position: 'absolute',
    height: 8,
    borderRadius: 10,
    backgroundColor: appStyle.blackColor.lightDark,
    zIndex: 2,
  },
  progressBar: {
    position: 'absolute',
    height: 8,
    borderRadius: 20,
    backgroundColor: appStyle.blackColor.pureDark,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 3,
  },
  circleAnim: {
    left: 8,
    right: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: appStyle.blackColor.pureDark,
  },
  circleActive: {
    backgroundColor: 'rgba(3, 6, 10, 0.4)',
  },
  circleInactive: {
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: 'rgba(3, 6, 10, 0)',
  },
  pointer: {
    width: 0,
    height: 0,
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    borderTopWidth: 8,
    borderTopColor: appStyle.blackColor.pureDark,
  },
});
