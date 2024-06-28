import axiosInstance, {setAuthToken} from './axiosInstance';

export const createNewEvent = async (token, event) => {
  try {
    setAuthToken(token);
    const newEvent = {...event, coHosts: event.coHosts.map(user => user.id)};
    const res = await axiosInstance.post('/events', {event: newEvent});
    const newCreatedEvent = await res.data;

    return newCreatedEvent;
  } catch (error) {
    console.error(error);
  }
};

export const getEventsNearBy = async userId => {
  try {
    const eventsRes = await axiosInstance.get('/events');
    const events = await eventsRes.data;
    return events;
  } catch (error) {
    console.error(error);
  }
};

export const getEventByid = async eventId => {
  try {
    const eventRes = await axiosInstance.get('/events/' + eventId);
    const event = await eventRes.data;

    return event;
  } catch (error) {
    console.error(error);
  }
};
