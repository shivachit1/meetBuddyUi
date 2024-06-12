import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  followUser,
  getMyFollowers,
  getUserData,
  unFollowUser,
  updateUserData,
} from '../../service/UserService';
import axiosInstance from '../../service/axiosInstance';
import {addNewFavourite, deleteFavourite} from '../../service/restService';
import {showPopUpNotification} from '../notifications/notification_action';
import {setActiveView} from '../ui/uiActions';
import { removeStoredUserData, storeUserData } from '../../service/AsyncLocalStorage';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DEVICE_LOCATION = 'DEVICE_LOCATION';
export const FETCH_FAVOURITES = 'FETCH_FAVOURITES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';

export const signInUser = (user) => async dispatch => {
  dispatch({
    type: SIGN_IN_USER,
    payload: {
      user: user,
    },
  });
  storeUserData(user)
};

export const updateUser = user => async dispatch => {
  const updatedUser = await updateUserData(user.id, user);
  dispatch({
    type: UPDATE_USER,
    payload: {
      user: updatedUser,
    },
  });
};

export const logOutUser = () => async dispatch => {
  try {
    await GoogleSignin.signOut();
    dispatch({
      type: LOG_OUT_USER,
    });
    removeStoredUserData()

  } catch (error) {
    console.error('Error signing out: ', error);
  }
};

export const setDeviceLocation = coordinate => dispatch => {
  dispatch({
    type: DEVICE_LOCATION,
    payload: {
      coordinate,
    },
  });
};

export const fetchUserFollowInfo = userId => async dispatch => {
  const followData = await getMyFollowers(userId);
  dispatch({
    type: FETCH_FAVOURITES,
    payload: {
      ...followData
    },
  });
};

export const followUserAction = (userId, followedUserId) => async dispatch => {
  await followUser(userId, followedUserId);
  dispatch(fetchUserFollowInfo(userId));
};

export const unFollowUserAction =
  (userId, unFollowedUserId) => async dispatch => {
    await unFollowUser(userId, unFollowedUserId);
    dispatch(fetchUserFollowInfo(userId));
  };
