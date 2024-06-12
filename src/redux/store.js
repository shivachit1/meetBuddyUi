import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {thunk} from 'redux-thunk'
import { userReducer } from './user/userReducer';
import { uiReducer } from './ui/uiReducer';
import { eventsReducer } from './events/eventsReducer';
import { notificationReducer } from './notifications/notification_reducer';
import { organizerReducer } from './organizers/organizer_reducer';

const rootReducer = combineReducers({uiReducer, userReducer, eventsReducer, notificationReducer, organizerReducer})

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)))