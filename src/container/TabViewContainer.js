import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BasicButton} from '../components/Button';
import {appStyle} from '../styles/theme';
import {ProgressBar} from '../components/Progressbar';
import {TextView} from '../components/TextView';

// buttonNames and views should be in list, and index must match with name -> view
export const TabViewContainer = ({
  viewWidth,
  buttonNames,
  scrollEnabled,
  buttonsVisible,
  activePage,
  finalButtonCall,
  children,
}) => {
  const scrollViewRef = useRef();
  const buttonScrollViewRef = useRef();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (activePage) {
      tabButtonPressed(buttonNames.indexOf(activePage))
    }
  }, [activePage])

  const handleMomentumScrollEnd = e => {
    // Get the content offset of the ScrollView
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    // Calculate the index of the snapped item
    const snappedIndex = Math.round(contentOffsetX / viewWidth);
    // Get the item data based on the snapped index
    if (snappedIndex != currentTab) {
      setCurrentTab(snappedIndex);
    }
  };

  const tabButtonPressed = index => {
    scrollViewRef.current.scrollTo({x: viewWidth * index});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        ref={buttonScrollViewRef}
        style={{alignSelf: 'center'}}
        contentContainerStyle={{
          height: 16,
          width: '100%',
          marginTop: 12,
          marginBottom: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!buttonsVisible &&
          buttonNames.map((buttonName, index) => {
            return (
              <TouchableOpacity
                key={buttonName}
                style={{margin: 2}}
                onPress={() => tabButtonPressed(index)}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      currentTab == index
                        ? appStyle.blackColor.pureDark
                        : appStyle.blackColor.lightDark,
                  }}
                />
              </TouchableOpacity>
            );
          })}

        {buttonsVisible &&
          buttonNames.map((buttonName, index) => {
            return (
              <BasicButton
                key={index}
                buttonStyle={styles.tabButtonStyle}
                text={index + 1}
                selected={currentTab == index}
                triggerFunc={() => tabButtonPressed(index)}
              />
            );
          })}
      </ScrollView>

      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={viewWidth}
        disableIntervalMomentum={true}
        pagingEnabled={true}
        scrollEnabled={scrollEnabled}
        decelerationRate="fast"
        automaticallyAdjustKeyboardInsets={true}
        scrollEventThrottle={16}
        onScroll={e => handleMomentumScrollEnd(e)}
        contentContainerStyle={styles.scrollView}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            style: {
              ...styles.tabViewContainer,
              width: viewWidth,
            },
            key: child,
          }); // Pass combined styles
        })}
      </ScrollView>
      <View
        style={{
          marginTop: 35,
          marginBottom: 12,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        {currentTab != 0 && (
          <BasicButton
            buttonStyle={{
              backgroundColor: appStyle.blackColor.lightDark,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 6,
            }}
            text="Back"
            triggerFunc={() => tabButtonPressed(currentTab - 1)}
          />
        )}

        <BasicButton
          buttonStyle={{
            backgroundColor: appStyle.blackColor.pureDark,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 6,
          }}
          textStyle={{color: appStyle.pageColor}}
          text={currentTab == buttonNames.length - 1 ? 'Create Event' : 'Next'}
          triggerFunc={() => currentTab == buttonNames.length - 1 ? finalButtonCall() : tabButtonPressed(currentTab + 1)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tabButtonStyle: {
    margin: 2,
    borderRadius: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: 0,
  },
  progressBar: {
    margin: 2,
    borderRadius: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: 0,
  },
  scrollView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabViewContainer: {
    padding: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
