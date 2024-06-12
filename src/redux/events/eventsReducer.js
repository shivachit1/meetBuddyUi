import {
  CREATE_NEW_EVENT,
  FAV_EVENT,
  FETCH_EVENTS,
  UNFAV_EVENT,
} from './eventsActions';

const eventsState = {
  events: [],
  myFavEvents: [],
};

const addItemAndSortByTitle = (user, list) => {
  list.push(user);
  return list.sort((a, b) => a.eventTitle.localeCompare(b.userName));
};

const removeItemAndSortByTitle = (event, list) => {
  return list
    .filter(item => item.id !== event.id)
    .sort((a, b) => a.eventTitle.localeCompare(b.eventTitle));
};

export const eventsReducer = (state = eventsState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      const {events} = action.payload;
      return {...state, events: events};
    case CREATE_NEW_EVENT:
      const {event} = action.payload;
      return {...state, events: state.events.concat(event)};
    case FAV_EVENT:
      const {favEvent} = action.payload;
      return {
        ...state,
        myFavEvents: addItemAndSortByTitle(favEvent, state.myFavEvents),
      };
    case UNFAV_EVENT:
      const {unFavEvent} = action.payload;
      return {
        ...state,
        myFavEvents: removeItemAndSortByTitle(unFavEvent, state.myFavEvents),
      };
    default:
      return state;
  }
};
