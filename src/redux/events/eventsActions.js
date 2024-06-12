import { getEventsNearBy } from '../../service/restService';
import * as EventService from '../../service/EventService';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const CREATE_NEW_EVENT = 'CREATE_NEW_EVENT';
export const FAV_EVENT = 'FAV_EVENT';
export const UNFAV_EVENT = 'UNFAV_EVENT';

export const fetchEvents = (userId) => async(dispatch) => {
  const events = await getEventsNearBy(userId)
  dispatch({
    type: FETCH_EVENTS,
    payload: {
      events
    },
  });
};

export const createNewEvent = (token, event) => async (dispatch) => {
  const newEvent = await EventService.createNewEvent(token, event)

  dispatch({
    type: CREATE_NEW_EVENT,
    payload: {
      event: newEvent
    },
  });

  return newEvent;
};
