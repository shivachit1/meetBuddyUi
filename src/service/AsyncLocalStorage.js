import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeUserData = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user data: ', error);
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

export const removeStoredUserData = async () => {
    try {
      await AsyncStorage.removeItem('user');
      console.log("User removed from storage")
    } catch (error) {
      console.error('Error while removing user data: ', error);
    }
  };