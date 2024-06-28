import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async user => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user data: ', error);
  }
};

export const storeEventSearchFilterData = async eventSearchFilter => {
  try {
    await AsyncStorage.setItem(
      'eventSearchFilterData',
      JSON.stringify(eventSearchFilter),
    );
  } catch (error) {
    console.error('Error storing vent search filter data: ', error);
  }
};

export const getStoredUserData = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? await JSON.parse(user) : {};
  } catch (error) {
    console.error('Error retrieving user data: ', error);
  }
};

export const getStoredEventSearchFilterData = async () => {
  try {
    const eventSearchFilterData = await AsyncStorage.getItem(
      'eventSearchFilterData',
    );
    return eventSearchFilterData ? await JSON.parse(eventSearchFilterData) : {};
  } catch (error) {
    console.error('Error retrieving event search filter data: ', error);
  }
};

export const removeStoredUserData = async () => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('eventSearchFilterData');
    console.log('User data removed from storage');
  } catch (error) {
    console.error('Error while removing user data: ', error);
  }
};
