import {storeEventSearchFilterData} from '../../service/AsyncLocalStorage';
import axiosInstance from '../../service/axiosInstance';
import {showPopUpNotification} from '../notifications/notification_action';

export const ACTIVE_VIEW = 'ACTIVE_VIEW';
export const REMOVE_VIEW = 'REMOVE_VIEW';
export const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR';
export const THEME_CHANGE = 'THEME_CHANGE';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const SHOW_EVENTS_VIEW = 'SHOW_EVENTS_VIEW';
export const GET_ADDRESS = 'GET_ADDRESS';
export const MARKER_PRESSED = 'MARKER_PRESSED';
export const CLEAR_MAP_VIEW = 'CLEAR_MAP_VIEW';
export const POPULATE_MAP_VIEW = 'POPULATE_MAP_VIEW';
export const EVENT_SEARCH_FILTER = 'EVENT_SEARCH_FILTER';

export const setEventSearchFilter = eventSearchFilter => dispatch => {
  dispatch({
    type: EVENT_SEARCH_FILTER,
    payload: {
      eventSearchFilter,
    },
  });

  storeEventSearchFilterData(eventSearchFilter);
};

export const setActiveView = (viewName, props) => dispatch => {
  dispatch({
    type: ACTIVE_VIEW,
    payload: {
      viewName,
      props,
    },
  });
};

export const removeView = viewName => dispatch => {
  dispatch({
    type: REMOVE_VIEW,
    payload: {
      viewName,
    },
  });
};

export const showEventsView = value => dispatch => {
  dispatch({
    type: SHOW_EVENTS_VIEW,
    payload: {
      value,
    },
  });
};

export const clearMapView = () => dispatch => {
  dispatch({
    type: CLEAR_MAP_VIEW,
  });
};

export const populateMapView = () => dispatch => {
  dispatch({
    type: POPULATE_MAP_VIEW,
  });
};

export const showNotification = message => dispatch => {
  dispatch({
    type: SHOW_NOTIFICATION,
    payload: {
      message: message,
      show: true,
    },
  });

  setTimeout(() => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        message: '',
        show: false,
      },
    });
  }, 4000);
};

export const markerPressed = markerId => dispatch => {
  dispatch({
    type: MARKER_PRESSED,
    payload: {
      pressedMarkerId: markerId,
    },
  });
};
