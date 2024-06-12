import {
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useRef, useState} from 'react';
import {AnimatedMapView} from 'react-native-maps/lib/MapView';
import {
  markerPressed,
  populateMapView,
  showEventsView,
} from '../../redux/ui/uiActions';
import {lightStyle} from '../../styles/mapStyles';

import {useDeviceLocation} from '../../redux/hooks/device';
import {MapOverViewLayout} from './MapOverViewLayout';
import {CustomMarker} from './Marker';
import {appStyle} from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {BasicButton} from '../../components/Button';
import {commonStyles} from '../../styles/styles';
import {TextView} from '../../components/TextView';

export const MapViewPage = ({route}) => {
  const {deviceLocation} = useDeviceLocation(); // helps to get device location permissions
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {clearMapView} = useSelector(state => state.uiReducer.mapView);

  const [currentRegion, setCurrentRegion] = useState({
    latitudeDelta: 0.079,
    longitudeDelta: 0.079,
  });
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const newEventData = route.params?.newEventData;
  const activePage = route.params?.activePage;

  // map refs/state
  const mapRef = useRef(null);
  const userLocationRef = useRef();

  // event ref/states
  const flatListViewRef = useRef(null);
  const {events} = useSelector(state => state.eventsReducer);

  const showUserLocation = () => {
    animateCameraView({
      ...userLocationRef.current,
      latitudeDelta: 0.079,
      longitudeDelta: 0.079,
    });
    setCurrentRegion({...currentRegion, ...userLocationRef.current})
  };

  const showEventCoordinate = event => {
    dispatch(markerPressed(event.id));
    animateCameraView({
      ...currentRegion,
      ...event.coordinate,
    });
  };

  const animateCameraView = regionValue =>
    mapRef.current?.animateToRegion(regionValue, 500);

  const handleConfirmPosition = () => {
    dispatch(populateMapView());
    navigation.navigate('CreateEventView', {
      newEventData: {
        ...newEventData,
        coordinate: {
          latitude: selectedCoordinate.latitude,
          longitude: selectedCoordinate.longitude,
        },
      },
      activePage: activePage
    });
  };

  if (!deviceLocation) {
    return (
      <ActivityIndicator
        style={{flex: 1, backgroundColor: appStyle.pageColor}}
      />
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedMapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        toolbarEnabled={false}
        customMapStyle={lightStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={true}
        loadingEnabled={true}
        initialRegion={{
          latitude: deviceLocation.latitude,
          longitude: deviceLocation.longitude,
          latitudeDelta: 0.079,
          longitudeDelta: 0.079,
        }}
        userLocationUpdateInterval={5000}
        onMapReady={() => showUserLocation()}
        onRegionChange={region => {
          if (clearMapView) {
            setSelectedCoordinate(region);
          }
        }}
        onRegionChangeComplete={region => setCurrentRegion(region)}
        loadingIndicatorColor={appStyle.blackColor.pureDark}
        onUserLocationChange={e =>
          (userLocationRef.current = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }>
        {!clearMapView &&
          events.map((event, index) => (
            <CustomMarker key={event.id} event={event} />
          ))}

        {clearMapView && (
          <Marker
            tracksViewChanges={true}
            coordinate={
              selectedCoordinate || {
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              }
            }
          />
        )}
      </AnimatedMapView>

      {clearMapView && (
        <View style={styles.markerChooseView}>
          <TextView
            textStyle={{textAlign: 'center', fontSize: 12}}
            text="Move the map to place the marker in order to choose right location."
            fontWeight="bold"
          />
          <View style={styles.markerFixed}>
            <BasicButton
              buttonStyle={{
                backgroundColor: appStyle.blackColor.lightDark,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 6,
                ...commonStyles.shadowProp,
              }}
              text="Cancel"
              triggerFunc={() => navigation.navigate('CreateEventView')}
            />
            <BasicButton
              buttonStyle={{
                backgroundColor: appStyle.blackColor.pureDark,
                marginLeft: 30,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 6,
                ...commonStyles.shadowProp,
              }}
              textStyle={{color: appStyle.pageColor}}
              text="Confirm"
              triggerFunc={() => handleConfirmPosition()}
            />
          </View>
        </View>
      )}

      {!clearMapView && (
        <MapOverViewLayout
          mapRef={mapRef}
          flatListViewRef={flatListViewRef}
          showEventsView={showEventsView}
          showUserLocation={showUserLocation}
          showEventCoordinate={showEventCoordinate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-start',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerIconStyle: {
    width: 35,
    height: 35,
    resizeMode: 'contain', // or 'contain', 'stretch', 'repeat', 'center'
    justifyContent: 'center', // if you want to align children inside the ImageBackground
    alignItems: 'center',
  },
  callOutStyle: {
    flex: 1,
  },
  markerChooseView: {
    position: 'absolute',
    bottom: 30,
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 3,
    backgroundColor: appStyle.pageColor,
  },
  markerFixed: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    zIndex: 3,
    backgroundColor: appStyle.pageColor,
  },
});
