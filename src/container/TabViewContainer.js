import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {BasicButton} from '../components/Button';
import {appStyle} from '../styles/theme';
import {ProgressBar} from '../components/Progressbar';
import {TextView} from '../components/TextView';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const buttonScrollViewRef = useRef();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (activePage) {
      tabButtonPressed(buttonNames.indexOf(activePage));
    }
  }, [activePage]);

  useEffect(() => {
    const backAction = () => {
      if (currentTab > 0) {
        tabButtonPressed(currentTab - 1);
        return true; // Return true to prevent default back button behavior
      }
      return false; // Return false to allow the default back button behavior to close the app
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentTab]);

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
        style={{alignSelf: scrollEnabled ? 'flex-start' : 'center'}}
        contentContainerStyle={
          scrollEnabled ? styles.tabButtonStyle : styles.scrollIndicator
        }>
        {!scrollEnabled &&
          buttonNames.map((buttonName, index) => {
            return (
              <TouchableOpacity
                key={buttonName}
                style={{margin: 0}}
                onPress={() => tabButtonPressed(index)}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    margin: 4,
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
                buttonStyle={{...styles.tabButtonStyle, borderWidth: 0}}
                textStyle={{
                  color:
                    currentTab == index
                      ? appStyle.blackColor.pureDark
                      : appStyle.blackColor.midDark,
                }}
                text={buttonName}
                selected={currentTab == index}
                triggerFunc={() => tabButtonPressed(index)}
              />
            );
          })}
      </ScrollView>

      <ScrollView
        ref={scrollViewRef}
        style={{height: '100%'}}
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

      {!scrollEnabled && ( // means if scrolling is blocked then there should be some button to change views
        <View
          style={{
            marginTop: 15,
            marginBottom: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <BasicButton
            buttonStyle={{
              backgroundColor: appStyle.blackColor.lightDark,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 6,
            }}
            text={currentTab == 0 ? 'Close' : 'Back'}
            triggerFunc={() =>
              currentTab == 0
                ? navigation.goBack()
                : tabButtonPressed(currentTab - 1)
            }
          />
          <BasicButton
            buttonStyle={{
              backgroundColor: appStyle.blackColor.pureDark,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 6,
            }}
            selected={true}
            text={
              currentTab == buttonNames.length - 1 ? 'Create Event' : 'Next'
            }
            triggerFunc={() =>
              currentTab == buttonNames.length - 1
                ? finalButtonCall()
                : tabButtonPressed(currentTab + 1)
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tabButtonStyle: {
    margin: 0,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 3,
  },
  scrollIndicator: {
    height: 16,
    marginTop: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
