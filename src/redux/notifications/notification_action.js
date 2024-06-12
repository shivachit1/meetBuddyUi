export const FETCH_NOTIFICATION = 'FETCH_NOTIFICATION';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const POP_UP_NOTIFICATION = 'POP_UP_NOTIFICATION';

export const fetchNotification = () => dispatch => {
  dispatch({
    type: FETCH_NOTIFICATION,
  });
};

export const addNotification = () => dispatch => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      notification: {
        id: 11,
        notificationType: 'event',
        notificationMessage: 'This is new Notification regarding',
      },
    },
  });
};

export const showPopUpNotification = message => dispatch => {
  dispatch({
    type: POP_UP_NOTIFICATION,
    payload: {
      message: message,
    },
  });

  const timeOut = setTimeout(() => {
    clearTimeout(timeOut);
    dispatch({
      type: POP_UP_NOTIFICATION,
      payload: {
        message: null,
      },
    });
  }, 2000);
};
