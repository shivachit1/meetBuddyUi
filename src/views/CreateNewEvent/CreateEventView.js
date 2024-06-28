import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {clearMapView} from '../../redux/ui/uiActions';
import {IconButton} from '../../components/Button';
import {TextView} from '../../components/TextView';
import {appStyle} from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {SliderView} from '../../container/Slider';
import {SliderTwoPointerView} from '../../container/SliderDual';
import {getAddressFromCoordinates} from '../../service/googleService';
import {EventCategory, EventType, ParticipantOption} from '../../modal/Enum';
import {eventTypeOptions, participantTypeOptions} from '../../modal/Event';

import CalenderIcon from '../../../assets/calender_blur_icon.png';
import DatePicker from 'react-native-date-picker';
import {getDate} from '../../util/dateFormatter';
import {createNewEvent} from '../../redux/events/eventsActions';
import {CustomerSearchAutoComplete} from '../CustomerSearchAutoComplete';
import {TabViewContainer} from '../../container/TabViewContainer';
import RadioButton from '../../components/RadioButton';
import CheckBox from '../../components/CheckBox';
import DateTimePicker from '../../components/DateAndTimePicker';

export const CreateEventView = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loggedInUser} = useSelector(state => state.userReducer);
  const [openTimePicker, setOpenTimePicker] = useState('');

  const newEventData = route.params?.newEventData;
  const activePage = route.params?.activePage;

  const [event, setEvent] = useState({
    eventType: EventType.PRIVATE,
    eventTitle: '',
    eventInfo: '',
    eventStartTime: undefined,
    hasEndTime: false,
    eventEndTime: undefined,
    ageLimit: {
      lowerValue: 20,
      highValue: 70,
    },
    participants: {
      option: ParticipantOption.NO_LIMIT,
      count: undefined,
    },
    coordinate: {
      latitude: null,
      longitude: null,
    },
    address: {
      streetName: '',
      streetNumber: '',
      postalCode: '',
      city: '',
      country: '',
    },
    categories: [],
    coHosts: [],
    invitedUsers: [],
    ...newEventData,
  });

  useEffect(() => {
    const findAddress = async () => {
      if (newEventData?.coordinate?.latitude) {
        const address = await getAddressFromCoordinates(
          newEventData.coordinate,
        );
        setEvent({...event, address: address});
      }
    };

    findAddress();
  }, [newEventData?.coordinate?.latitude]);

  const saveNewEvent = async () => {
    try {
      const newEvent = await dispatch(
        createNewEvent(loggedInUser.jwtToken, event),
      );
      navigation.goBack();
      navigation.navigate('EventSuccessView', {event: newEvent});
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (field, value) => {
    setEvent(prev => {
      return {...prev, [field]: value};
    });
  };

  const handleCoHostSelection = selectedUsers => {
    setEvent(prev => {
      return {...prev, coHosts: selectedUsers};
    });
  };

  const pages = ['Details', 'Address', 'Co-Hosts', 'Participants'];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          justifyContent: 'space-between',
        }}>
        <TextView
          textStyle={{alignSelf: 'center'}}
          text="New Event"
          textSize={16}
          fontWeight="bold"
        />
      </View>

      <TabViewContainer
        viewWidth={Dimensions.get('window').width}
        buttonNames={pages}
        showPageIndex={true}
        buttonsVisible={false}
        scrollEnabled={false}
        activePage={activePage}
        finalButtonCall={saveNewEvent}>
        <ScrollView indicatorStyle="white">
          <View>
            <TextView
              text="Select the type of event"
              textSize={14}
              fontWeight="bold"
            />
            <View style={{marginTop: 10}}>
              {eventTypeOptions.map(type => (
                <RadioButton
                  key={type.value}
                  label={type.label}
                  subLabel={type.subLabel}
                  selected={event.eventType === type.value}
                  onPress={value =>
                    setEvent(prev => {
                      return {...prev, eventType: type.value};
                    })
                  }
                />
              ))}
            </View>
          </View>

          <View style={{marginTop: 12}}>
            <TextView text="Event Name" textSize={14} fontWeight="bold" />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Name of the event"
              placeholderTextColor={appStyle.blackColor.midDark}
              value={event.eventTitle}
              onChangeText={value => handleChange('eventTitle', value)}
            />
          </View>

          <View style={{marginTop: 12}}>
            <TextView
              text="Event Description"
              textSize={14}
              fontWeight="bold"
            />
            <TextInput
              style={{...styles.textInputStyle, height: 100}}
              textAlignVertical="top"
              placeholder="Tell us more about event in detail"
              placeholderTextColor={appStyle.blackColor.midDark}
              value={event.eventInfo}
              onChangeText={value => handleChange('eventInfo', value)}
              multiline={true}
              maxLength={500}
            />
          </View>

          <View style={{marginTop: 12}}>
            <TextView
              text="Event Date and time"
              textSize={14}
              fontWeight="bold"
            />

            <View>
              <TextView
                text="Starting date and time"
                textSize={10}
                fontWeight="bold"
              />
              <TouchableOpacity
                onPress={() => setOpenTimePicker('eventStartTime')}>
                <TextInput
                  style={{
                    ...styles.textInputStyle,
                    flexGrow: 1,
                  }}
                  placeholder="Starting Date and Time"
                  placeholderTextColor={appStyle.blackColor.midDark}
                  value={
                    event.eventStartTime
                      ? getDate(event.eventStartTime)
                      : event.eventStartTime
                  }
                  readOnly={true}
                />
              </TouchableOpacity>
              {openTimePicker == 'eventStartTime' && (
                <DatePicker
                  modal
                  open={openTimePicker == 'eventStartTime'}
                  date={
                    event.eventStartTime
                      ? new Date(event.eventStartTime)
                      : new Date()
                  }
                  theme="light"
                  mode="datetime"
                  buttonColor={appStyle.blackColor.pureDark}
                  onConfirm={date => {
                    setOpenTimePicker('');
                    handleChange('eventStartTime', date.toISOString());
                  }}
                  onCancel={() => {
                    setOpenTimePicker('');
                  }}
                />
              )}
            </View>

            <View style={{marginTop: 16}}>
              <CheckBox
                label="Has end time"
                selected={event.hasEndTime}
                onPress={() =>
                  setEvent(prev => {
                    return {...prev, hasEndTime: !prev.hasEndTime};
                  })
                }></CheckBox>
            </View>

            {event.hasEndTime && (
              <View style={{marginTop: 4, marginBottom: 20}}>
                <TextView
                  text="Ending date and time"
                  textSize={10}
                  fontWeight="bold"
                />
                <TouchableOpacity
                  onPress={() => setOpenTimePicker('eventEndTime')}>
                  <TextInput
                    style={{
                      ...styles.textInputStyle,
                      flexGrow: 1,
                    }}
                    placeholder="Ending Date and Time"
                    placeholderTextColor={appStyle.blackColor.midDark}
                    value={
                      event.eventEndTime
                        ? getDate(event.eventEndTime)
                        : event.eventEndTime
                    }
                    readOnly={true}
                  />
                </TouchableOpacity>
                <TextView
                  textStyle={{color: appStyle.blackColor.midDark}}
                  text="Leave ending time empty if the event doesn't have end time"
                  textSize={9}
                  fontWeight="bold"
                />
                {openTimePicker == 'eventEndTime' && (
                  <DatePicker
                    modal
                    open={openTimePicker == 'eventEndTime'}
                    date={
                      event.eventEndTime
                        ? new Date(event.eventEndTime)
                        : new Date()
                    }
                    theme="light"
                    mode="datetime"
                    buttonColor={appStyle.blackColor.pureDark}
                    onConfirm={date => {
                      setOpenTimePicker('');
                      handleChange('eventEndTime', date.toISOString());
                    }}
                    onCancel={() => {
                      setOpenTimePicker('');
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>

        <ScrollView>
          <View>
            <TextView text="Address" textSize={14} fontWeight="bold" />

            <TouchableOpacity
              style={{
                padding: 8,
                alignSelf: 'center',
                backgroundColor: appStyle.blackColor.lightDark,
                alignItems: 'center',
                borderRadius: 8,
              }}
              onPress={() => {
                dispatch(clearMapView());
                navigation.navigate('MapViewPage', {
                  newEventData: event,
                  activePage: 'Address',
                });
              }}>
              <TextView
                textStyle={{marginTop: 0, alignItems: 'center'}}
                text="Choose from the map"
                textSize={10}
                fontWeight="bold"
              />
            </TouchableOpacity>

            <View style={{margin: 10}}>
              <View>
                <TextView
                  text="Street Address"
                  textSize={12}
                  fontWeight="bold"
                />
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Street Address"
                  placeholderTextColor={appStyle.blackColor.midDark}
                  value={event.address.streetName}
                  onChangeText={value =>
                    handleChange('address.streetName', value)
                  }
                />
              </View>

              <View style={{marginTop: 12}}>
                <TextView
                  text="Apartment, suites etc"
                  textSize={12}
                  fontWeight="bold"
                />
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Apartment no."
                  placeholderTextColor={appStyle.blackColor.midDark}
                  value={event.address.streetNumber}
                  onChangeText={value =>
                    handleChange('address.streetNumber', value)
                  }
                />
              </View>

              <View
                style={{
                  marginTop: 12,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1}}>
                  <TextView
                    text="Postal code"
                    textSize={12}
                    fontWeight="bold"
                  />
                  <TextInput
                    style={{...styles.textInputStyle}}
                    placeholder="i.e 02700"
                    placeholderTextColor={appStyle.blackColor.midDark}
                    value={event.address.postalCode}
                    onChangeText={value =>
                      handleChange('address.postalCode', value)
                    }
                  />
                </View>

                <View style={{flex: 1, marginLeft: 12}}>
                  <TextView text="City" textSize={12} fontWeight="bold" />
                  <TextInput
                    style={{...styles.textInputStyle, flexGrow: 1}}
                    placeholder="City"
                    placeholderTextColor={appStyle.blackColor.midDark}
                    value={event.address.city}
                    onChangeText={value => handleChange('address.city', value)}
                  />
                </View>
              </View>

              <View style={{marginTop: 12}}>
                <TextView text="Country Name" textSize={12} fontWeight="bold" />
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Country"
                  placeholderTextColor={appStyle.blackColor.midDark}
                  value={event.address.country}
                  onChangeText={value => handleChange('address.country', value)}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View>
          <TextView text="Co hosts for event" textSize={14} fontWeight="bold" />
          <TextView
            textStyle={{color: appStyle.blackColor.midDark, marginBottom: 12}}
            text="Skip this if there is no other co-organizer"
            textSize={10}
            fontWeight="bold"
          />
          <CustomerSearchAutoComplete
            title="Search for users"
            existingUsers={event.coHosts}
            handleDoneSelection={handleCoHostSelection}
          />
        </View>

        <ScrollView indicatorStyle="white">
          <View>
            <View>
              <TextView
                text="No of participants"
                textSize={14}
                fontWeight="bold"
              />
              <View style={{marginTop: 10}}>
                {participantTypeOptions.map(type => (
                  <RadioButton
                    key={type.option}
                    label={type.label}
                    subLabel={type.subLabel}
                    selected={event.participants.option === type.option}
                    onPress={() =>
                      setEvent(prev => {
                        return {
                          ...prev,
                          participants: {
                            option: type.option,
                            count: type.count,
                          },
                        };
                      })
                    }
                  />
                ))}
              </View>
              {event.participants.option == ParticipantOption.LIMIT && (
                <View
                  style={{
                    marginTop: -20,
                    marginBottom: 20,
                  }}>
                  <TextView
                    textStyle={{alignSelf: 'flex-end', paddingRight: 16}}
                    text={event.participants.count}
                    textSize={14}
                    fontWeight="bold"
                  />
                  <SliderView
                    value={event.participants.count}
                    width={Dimensions.get('window').width * 0.9}
                    maxValue={200}
                    minValue={0}
                    handleChange={value =>
                      setEvent(prev => {
                        return {
                          ...prev,
                          participants: {...prev.participants, count: value},
                        };
                      })
                    }
                  />
                </View>
              )}
            </View>
            <View style={{marginTop: 20}}>
              <TextView text="Age limit" textSize={14} fontWeight="bold" />
              <SliderTwoPointerView
                width={Dimensions.get('window').width * 0.9}
                minValue={18}
                maxValue={100}
                value={event.ageLimit}
                handleChange={value =>
                  setEvent(prev => {
                    return {...prev, ageLimit: value};
                  })
                }
                withArrowText={true}
              />
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <TextView text="Category" textSize={14} fontWeight="bold" />
            <TextView
              textStyle={{alignSelf: 'center'}}
              text="Select the categories best suites the event"
              textSize={10}
              fontWeight="bold"
            />

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 8,
              }}>
              {Object.keys(EventCategory).map(key => (
                <View key={key} style={{margin: 6}}>
                  <CheckBox
                    label={EventCategory[key]}
                    selected={event.categories.includes(key)}
                    onPress={() => {
                      if (!event.categories.includes(key)) {
                        setEvent(prev => {
                          return {
                            ...prev,
                            categories: [...prev.categories, key],
                          };
                        });
                      } else {
                        setEvent(prev => {
                          return {
                            ...prev,
                            categories: prev.categories.filter(
                              category => category != key,
                            ),
                          };
                        });
                      }
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </TabViewContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'start',
    justifyContent: 'start',
    backgroundColor: appStyle.pageColor,
  },
  textInputStyle: {
    width: '100%',
    marginTop: 6,
    paddingTop: 2,
    paddingLeft: 4,
    paddingBottom: 2,
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 6,
    color: appStyle.blackColor.pureDark,
    borderWidth: 1,
    borderColor: appStyle.blackColor.pureDark,
    justifyContent: 'center',
  },
  imageButtonStyle: {
    width: 22,
    height: 22,
  },
});
