import { getStoredUserData } from '../../service/AsyncLocalStorage';
import {
  SIGN_IN_USER,
  LOG_OUT_USER,
  DEVICE_LOCATION,
  FETCH_FAVOURITES,
  ADD_FAVOURITE,
  UPDATE_USER,
} from './userActions';

const userState = {
  deviceLocation: {},
  loggedInUser: {},
  isAuthenticated: false,
  followerData: {
    followings: [],
    followers: [],
  }
};

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {...state, loggedInUser: action.payload.user, isAuthenticated: true};
    case LOG_OUT_USER:
      return {...state, loggedInUser: {}, isAuthenticated: false};
    case UPDATE_USER:
      return {...state, loggedInUser: action.payload.user};
    case FETCH_FAVOURITES:
      const {followings, followers} = action.payload;
      return {
        ...state,
        followerData: {
          followings: followings,
          followers: followers,
        },
      };
    case DEVICE_LOCATION:
      const {coordinate} = action.payload;
      return {...state, deviceLocation: coordinate};
    default:
      return state;
  }
};
