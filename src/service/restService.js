import { err } from 'react-native-svg';
import axiosInstance from './axiosInstance';

export const getLoggedInUserEvents = async userId => {
  try {
    const eventsRes = await axiosInstance.get('/events');
    const events = await eventsRes.data;
  
    return events;
  } catch (error) {
    console.error(error)
  }
};

export const getEventsNearBy = async eventType => {
  try {
    const eventsRes = await axiosInstance.get('/events');
    const events = await eventsRes.data;
    return events;
  } catch (error) {
    console.error(error)
  }
};

export const getEventByid = async eventId => {
  try {
    const eventRes = await axiosInstance.get('/events/' + eventId);
    const event = await eventRes.data;
  
    return event;
  } catch (error) {
    console.error(error)
  }
};

