import { ADD_NOTIFICATION, FETCH_NOTIFICATION, POP_UP_NOTIFICATION } from "./notification_action";

const notificationState = {
  notifications: [],
  isLoading: false,
  popUpNotification: null
};

const notificationsSample = [
  {
    id: 1,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 2,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 3,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 4,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 5,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 6,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 7,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 8,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 9,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 10,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 11,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  },
  {
    id: 12,
    notificationType: "event",
    notificationMessage: "This is simple Notification regarding",
  }
];

export const notificationReducer = (state = notificationState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATION:
      return { ...state, notifications: notificationsSample };
    case ADD_NOTIFICATION:
      const { notification } = action.payload;
      notification.id = state.notifications.length + 1;
      return { ...state, notifications: state.notifications.concat(notification) };
      case POP_UP_NOTIFICATION:
        const { message } = action.payload;
        return { ...state, popUpNotification: message };
    default:
      return state;
  }
};
