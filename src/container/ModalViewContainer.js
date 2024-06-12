import {
  Pressable,
  StyleSheet,
  Animated,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeView, setActiveView} from '../redux/ui/uiActions';
import {TextView} from '../components/TextView';
import {useRef} from 'react';

import {commonStyles} from '../styles/styles';
import {IconButton} from '../components/Button';

import CloseIcon from '../../assets/close.png';
import {appStyle} from '../styles/theme';
import {useNavigation} from '@react-navigation/native';

const deviceWidth = Dimensions.get('window').width;

export const ViewContainer = ({
  modelStyle,
  backDropOpacity,
  title,
  hideCloseButton,
  disableBackDropPress,
  animationFromTop,
  contentInScrollView,
  children,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const animatedXY = useRef(
    new Animated.ValueXY({x: 10, y: animationFromTop ? -10 : 10}),
  ).current;
  const opacityValue = useRef(new Animated.Value(backDropOpacity)).current;

  Animated.parallel([
    Animated.timing(animatedXY, {
      toValue: {x: 0, y: 0},
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(opacityValue, {
      toValue: backDropOpacity,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start();

  const styles = getStyles();
  return (
    <KeyboardAvoidingView style={{...styles.container}}>
      <Animated.View style={{...commonStyles.backDrop, opacity: opacityValue}}>
        <Pressable
          style={commonStyles.backDrop}
          disabled={disableBackDropPress}
          onPress={() => navigation.goBack()}></Pressable>
      </Animated.View>

      <Animated.View
        style={{
          ...styles.modalView,
          ...modelStyle,
          transform: animatedXY.getTranslateTransform(),
        }}>
        <View style={styles.titleContainer}>
          {title && <TextView text={title} textSize={16} fontWeight="bold" />}
          {!hideCloseButton && (
            <IconButton
              imageStyle={styles.imageButtonStyle}
              iconSrc={CloseIcon}
              triggerFunc={() => navigation.goBack()}
            />
          )}
        </View>
        {contentInScrollView && (
          <ScrollView
            style={styles.scrollView}
            automaticallyAdjustKeyboardInsets={true}>
            {children}
          </ScrollView>
        )}
        {!contentInScrollView && (
          <View
            style={styles.scrollView}
            automaticallyAdjustKeyboardInsets={true}>
            {children}
          </View>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
    imageButtonStyle: {
      width: 22,
      height: 22,
    },
    modalView: {
      alignSelf: 'center',
      width: '80%',
      height: '70%',
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: appStyle.pageColor,
    },
    titleContainer: {
      width: '100%',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    scrollView: {
      flexGrow: 1,
    },
  });
};
