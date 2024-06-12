import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

import {appStyle} from '../styles/theme';
import {TextView} from '../components/TextView';

const deviceWidth = Dimensions.get('window').width;

export const SliderTwoPointerView = ({
  width,
  minValue,
  maxValue,
  value,
  handleChange,
  withArrowText = true,
}) => {
  const valuePerPix = width / maxValue;
  const slideLowPosition = useRef(
    new Animated.Value(value.lowerValue * valuePerPix),
  ).current;
  const slideHighPosition = useRef(
    new Animated.Value(value.highValue * valuePerPix),
  ).current;
  const [slideStarted, setSlideStarted] = useState({low: false, high: false});
  const [sliderValue, setSliderValue] = useState({
    lowerValue: value.lowerValue,
    highValue: value.highValue,
  });

  const [selectionWidth, setSelectionWidth] = useState(
    slideHighPosition.__getValue() - slideLowPosition.__getValue() + 8,
  );

  const [selectionLeftPadding, setSelectionLeftPadding] = useState(
    slideLowPosition.__getValue() + 8,
  );

  const handlePanResponderMove = (type, gestureState) => {
    const newValue = Math.max(
      minValue * valuePerPix,
      Math.min(gestureState.dx, width),
    );
    if (type === 'low') {
      if (newValue < slideHighPosition.__getValue()) {
        slideLowPosition.setValue(newValue);
        setSliderValue(prev => ({
          ...prev,
          lowerValue: parseInt(newValue / valuePerPix),
        }));
        handleChange({
          lowerValue: parseInt(newValue / valuePerPix),
          highValue: sliderValue.highValue,
        });
        setSelectionWidth(
          slideHighPosition.__getValue() - slideLowPosition.__getValue(),
        );
        setSelectionLeftPadding(slideLowPosition.__getValue() + 8);
      }
    } else {
      if (newValue > slideLowPosition.__getValue()) {
        slideHighPosition.setValue(newValue);
        setSliderValue(prev => ({
          ...prev,
          highValue: parseInt(newValue / valuePerPix),
        }));
        handleChange({
          lowerValue: sliderValue.lowerValue,
          highValue: parseInt(newValue / valuePerPix),
        });
        setSelectionWidth(
          slideHighPosition.__getValue() - slideLowPosition.__getValue(),
        );
        setSelectionLeftPadding(slideLowPosition.__getValue() + 8);
      }
    }
  };

  const createPanResponder = type =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        if (type === 'low') {
          gestureState.dx = slideLowPosition.__getValue();
          setSlideStarted(prev => ({...prev, low: true}));
        } else {
          gestureState.dx = slideHighPosition.__getValue();
          setSlideStarted(prev => ({...prev, high: true}));
        }
        setSelectionLeftPadding(slideLowPosition.__getValue() + 8);
      },
      onPanResponderMove: (event, gestureState) => {
        handlePanResponderMove(type, gestureState);
      },
      onPanResponderRelease: () => {
        setSlideStarted({low: false, high: false});
      },
    });

  const panResponderLow = useRef(createPanResponder('low')).current;
  const panResponderHigh = useRef(createPanResponder('high')).current;

  const ArrowTextView = ({value}) => (
    <View
      style={{
        position: 'absolute',
        width: 40,
        top: -26,
        borderRadius: 6,
        alignItems: 'center',
        padding: 4,
        paddingTop: 0,
        backgroundColor: appStyle.blackColor.pureDark,
      }}>
      <TextView
        textStyle={{color: appStyle.pageColor, textAlign: 'center'}}
        text={value}
        textSize={10}
        fontWeight="bold"
      />
      <View style={styles.pointer}></View>
    </View>
  );

  return (
    <View style={{marginTop : withArrowText ? 40 : 0}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{...styles.progressBarContainer, width: width}}></View>
        <View
          style={{
            ...styles.progressBar,
            transform: [{translateX: selectionLeftPadding}],
            width: selectionWidth,
          }}></View>
      </View>

      <Animated.View
        style={[
          styles.circleAnim,
          {transform: [{translateX: slideLowPosition}]},
        ]}
        {...panResponderLow.panHandlers}>
        {withArrowText && <ArrowTextView value={sliderValue.lowerValue} />}
        <View
          style={[
            styles.circleInactive,
            slideStarted.low && styles.circleActive,
          ]}></View>
      </Animated.View>
      <Animated.View
        style={[
          styles.circleAnim,
          {transform: [{translateX: slideHighPosition}]},
        ]}
        {...panResponderHigh.panHandlers}>
        {withArrowText && <ArrowTextView value={sliderValue.highValue} />}
        <View
          style={[
            styles.circleInactive,
            slideStarted.high && styles.circleActive,
          ]}></View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    zIndex: 2,
    backgroundColor: appStyle.blackColor.pureDark,
  },
  circleAnim: {
    top: -8,
    position: 'absolute',
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    zIndex: 4,
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
    bottom: -6,
    alignSelf: 'center',
    borderLeftWidth: 6,
    borderLeftColor: 'transparent',
    borderRightWidth: 6,
    borderRightColor: 'transparent',
    borderTopWidth: 6,
    borderTopColor: appStyle.blackColor.pureDark,
  },
});
