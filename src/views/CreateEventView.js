import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {clearMapView} from '../redux/ui/uiActions';
import {BasicButton, IconButton} from '../components/Button';
import {TextView} from '../components/TextView';
import {appStyle} from '../styles/theme';
import {commonStyles} from '../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {SliderView} from '../container/Slider';
import {SliderTwoPointerView} from '../container/SliderDual';
import RadioButton from '../components/RadioButton';
import Checkbox from '../components/CheckBox';
import {getAddressFromCoordinates} from '../service/googleService';
import {EventCategory, EventType, ParticipantOption} from '../modal/Enum';
import {eventTypeOptions, participantTypeOptions} from '../modal/Event';

import CloseIcon from '../../assets/close.png';
import DatePicker from 'react-native-date-picker';
import {getDate} from '../util/dateFormatter';
import {createNewEvent} from '../redux/events/eventsActions';
import {CustomerSearchAutoComplete} from './CustomerSearchAutoComplete';
import { TabViewContainer } from '../container/TabViewContainer';

export const CreateEventView = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loggedInUser} = useSelector(state => state.userReducer);
  const [open, setOpen] = useState(false);

  const newEventData = route.params?.newEventData;
  const activePage = route.params?.activePage;

  const [event, setEvent] = useState({
    eventType: EventType.PRIVATE,
    eventTitle: '',
    eventInfo: '',
    eventStartTime: undefined,
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

  const saveNewEvent = () => {
    try {
      const newEvent = dispatch(createNewEvent(loggedInUser.jwtToken, event));
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

  const ShowDatePicker = ({field}) => {
    let date;
    if (field == 'startDateTime') {
      date = event.eventStartTime ? new Date(event.eventStartTime) : new Date();
    } else if (field == 'endDateTime') {
      date = event.eventEndTime ? new Date(event.eventEndTime) : new Date();
    }

    return (
      <DatePicker
        modal
        open={open}
        date={date}
        theme="light"
        mode="datetime"
        buttonColor={appStyle.blackColor.pureDark}
        onConfirm={date => {
          if (field == 'startDateTime') {
            setEvent(prev => {
              return {...prev, eventStartTime: date.toISOString()};
            });
          } else if (field == 'endDateTime') {
            setEvent(prev => {
              return {...prev, eventEndTime: date.toISOString()};
            });
          }

          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    );
  };

  const pages = [
    'Details',
    'Address',
    'Participants',
    'Co-Hosts',
    'Categories'
  ];

  return (
    <View style={styles.container}>
      <View style={{...commonStyles.backDrop, opacity: 0.4}}>
        <Pressable
          style={commonStyles.backDrop}
          disabled={true}
          onPress={() => navigation.goBack()}></Pressable>
      </View>

      <View style={styles.modalView}>
        <View style={{flexDirection: 'row', padding:8, justifyContent: 'space-between'}}>
          <TextView
            textStyle={{alignSelf: 'center'}}
            text="New Event"
            textSize={16}
            fontWeight="bold"
          />
          <IconButton
            imageStyle={styles.imageButtonStyle}
            iconSrc={CloseIcon}
            triggerFunc={() => navigation.goBack()}
          />
        </View>

        <TabViewContainer
          viewWidth={Dimensions.get('window').width * 0.8}
          buttonNames={pages}
          showPageIndex={true}
          buttonsVisible={false}
          scrollEnabled={false}
          activePage={activePage}
          finalButtonCall={saveNewEvent}>
          <ScrollView
            indicatorStyle="white">
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
                placeholder="Add Title"
                placeholderTextColor="rgba(3, 6, 10, 0.2)"
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
                placeholder="Description about the event"
                placeholderTextColor="rgba(3, 6, 10, 0.2)"
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
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <TextInput
                    style={{
                      ...styles.textInputStyle,
                      flexGrow: 1,
                    }}
                    placeholder="Starting Date and Time"
                    placeholderTextColor="rgba(3, 6, 10, 0.2)"
                    value={
                      event.eventStartTime
                        ? getDate(event.eventStartTime)
                        : event.eventStartTime
                    }
                    readOnly={true}
                  />
                </TouchableOpacity>
                <ShowDatePicker field="startDateTime" />
              </View>

                <View style={{marginTop: 8, marginBottom: 20}}>
                  <TextView
                    text="Ending date and time"
                    textSize={10}
                    fontWeight="bold"
                  />
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <TextInput
                      style={{
                        ...styles.textInputStyle,
                        flexGrow: 1,
                      }}
                      placeholder="Ending Date and Time"
                      placeholderTextColor="rgba(3, 6, 10, 0.2)"
                      value={
                        event.eventEndTime
                          ? getDate(event.eventEndTime)
                          : event.eventEndTime
                      }
                      readOnly={true}
                    />
                  </TouchableOpacity>
                  <TextView
                  text="Leave ending time empty if the event doesn't have end time"
                  textSize={9}
                  fontWeight="bold"
                />
                  <ShowDatePicker field="endDateTime" />
                </View>
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
                    activePage: "Address"
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
                    placeholderTextColor="rgba(3, 6, 10, 0.2)"
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
                    placeholderTextColor="rgba(3, 6, 10, 0.2)"
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
                      placeholderTextColor="rgba(3, 6, 10, 0.2)"
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
                      placeholderTextColor="rgba(3, 6, 10, 0.2)"
                      value={event.address.city}
                      onChangeText={value =>
                        handleChange('address.city', value)
                      }
                    />
                  </View>
                </View>

                <View style={{marginTop: 12}}>
                  <TextView
                    text="Country Name"
                    textSize={12}
                    fontWeight="bold"
                  />
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Country"
                    placeholderTextColor="rgba(3, 6, 10, 0.2)"
                    value={event.address.country}
                    onChangeText={value =>
                      handleChange('address.country', value)
                    }
                  />
                </View>
              </View>
            </View>
          </ScrollView>

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
                    paddingRight: 12,
                    marginBottom: 20,
                  }}>
                  <TextView
                    textStyle={{alignSelf: 'flex-end'}}
                    text={event.participants.count}
                    textSize={14}
                    fontWeight="bold"
                  />
                  <SliderView
                    value={event.participants.count}
                    width={250}
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
            <View>
              <TextView text="Age limit" textSize={14} fontWeight="bold" />
              <SliderTwoPointerView
                width={250}
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

          <View>
            <TextView
              text="Co hosts for event"
              textSize={14}
              fontWeight="bold"
            />
            <CustomerSearchAutoComplete
              title="Add co-hosts"
              existingUsers={event.coHosts}
              handleDoneSelection={handleCoHostSelection}
            />
          </View>

          <ScrollView indicatorStyle="white">
            <View>
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
                    <Checkbox
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: '80%',
    maxHeight: '85%',
    height: '75%',
    borderRadius: 12,
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
    backgroundColor: appStyle.blackColor.lightDark,
    justifyContent: 'center',
  },
  imageButtonStyle: {
    width: 22,
    height: 22,
  },
});
