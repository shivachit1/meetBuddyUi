import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Callout, Marker} from 'react-native-maps';

import MainMarker from '../../../assets/main_marker.png';
import BlackMarker from '../../../assets/black_marker.png';
import Avatar from '../../../assets/avatar.png';
import {useDispatch, useSelector} from 'react-redux';
import {ImageView} from '../../components/ImageView';
import {appStyle} from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {
  getDate,
  getDay,
  getDifference,
  getMonth,
  getTime,
  getWeekDay,
  getYear,
} from '../../util/dateFormatter';

export const CustomMarker = ({event, getAddress}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {focusMarkerId} = useSelector(state => state.uiReducer.mapView);
  const markerRef = useRef();

  const markerMatched = event.id == focusMarkerId;
  const MarkerIcon = markerMatched ? MainMarker : BlackMarker;

  useEffect(() => {
    if (markerMatched && markerRef.current) {
      markerRef.current.showCallout();
    }
  }, [focusMarkerId]);

  const handlePress = (e, event) => {
    navigation.navigate('EventDetailsView', {eventId: event.id});
  };

  const date = getDifference(event.eventStartTime);
  const organizer = event.createdBy;

  return (
    <Marker
      ref={markerRef}
      identifier={event.id.toString()}
      coordinate={event.coordinate}
      tracksViewChanges={true}
      icon={MarkerIcon}>
      <Callout tooltip onPress={e => handlePress(e, event)}>
        <View style={styles.callout}>
          {/*           <Text
            android_hyphenationFrequency="none"
            style={{
              paddingRight: 6,
              paddingBottom: 15,
              borderRadius: 40
            }}>
            <ImageView
              source={organizer.imageUrl ? {uri :organizer.imageUrl} : Avatar}
              imageStyle={{width: 30, height: 30, margin: 4}}
              roundImage={true}
            />
          </Text> */}

          <View>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#FFFFFF'}}>
              {event.eventTitle.substring(0, 30)}
            </Text>
            <Text style={{fontSize: 9, fontWeight: 'bold', color: '#C3C3C3'}}>
              Starts in : {date}
            </Text>
          </View>
          <View style={styles.pointer} />
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  callout: {
    paddingTop: 2,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: appStyle.blackColor.pureDark,
  },
  textStyle: {},
  pointer: {
    width: 0,
    height: 0,
    position: 'absolute',
    bottom: -9,
    alignSelf: 'center',
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    borderTopWidth: 8,
    borderTopColor: appStyle.blackColor.pureDark,
  },
});
