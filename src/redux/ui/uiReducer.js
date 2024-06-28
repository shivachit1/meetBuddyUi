import {lightMode} from '../../styles/theme';
import {
  THEME_CHANGE,
  SHOW_NOTIFICATION,
  ACTIVE_VIEW,
  SHOW_EVENTS_VIEW,
  MARKER_PRESSED,
  REMOVE_VIEW,
  GET_ADDRESS,
  SELECT_MAP_LOCATION,
  CLEAR_MAP_VIEW,
  POPULATE_MAP_VIEW,
  EVENT_SEARCH_FILTER,
} from './uiActions';

const uiState = {
  currentTheme: lightMode,
  views: [],
  eventsViewActive: true,
  notification: {
    isVisible: false,
    message: '',
  },
  eventSearchFilterState: {
    distance: 50,
    day: 0,
  },
  mapView: {
    focusMarkerId: '',
    clearMapView: false,
  },
};

export const uiReducer = (state = uiState, action) => {
  switch (action.type) {
    case EVENT_SEARCH_FILTER:
      return {
        ...state,
        eventSearchFilterState: {
          ...state.eventSearchFilterState,
          ...action.payload.eventSearchFilter,
        },
      };
    case ACTIVE_VIEW:
      return {
        ...state,
        views: [
          ...state.views.filter(
            view => view.viewName !== action.payload.viewName,
          ),
          {viewName: action.payload.viewName, props: action.payload.props},
        ],
      };
    case REMOVE_VIEW:
      return {
        ...state,
        views: state.views.filter(
          view => view.viewName !== action.payload.viewName,
        ),
      };
    case THEME_CHANGE:
      return {...state, currentTheme: action.payload.newTheme};
    case SHOW_EVENTS_VIEW:
      return {
        ...state,
        eventsViewActive: action.payload.value,
      };
    case CLEAR_MAP_VIEW:
      return {
        ...state,
        mapView: {...state, clearMapView: true},
      };
    case POPULATE_MAP_VIEW:
      return {
        ...state,
        mapView: {...state, clearMapView: false},
      };
    case SHOW_NOTIFICATION:
      const {message, show} = action.payload;
      return {...state, notification: {message: message, isVisible: show}};
    case MARKER_PRESSED:
      const {pressedMarkerId} = action.payload;
      return {
        ...state,
        mapView: {...state.mapView, focusMarkerId: pressedMarkerId},
      };
    case GET_ADDRESS:
      const {getAddress} = action.payload;

    default:
      return state;
  }
};
