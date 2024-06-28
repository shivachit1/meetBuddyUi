import {useEffect, useState} from 'react';

import {useDispatch} from 'react-redux';
import {signInUser} from '../user/userActions';
import {
  getStoredEventSearchFilterData,
  getStoredUserData,
} from '../../service/AsyncLocalStorage';
import {setEventSearchFilter} from '../ui/uiActions';

export const useGetUserData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userDataLookUp = async () => {
      const user = await getStoredUserData();
      if (user.id) {
        dispatch(signInUser(user));
      }
      setIsLoading(false);
    };

    userDataLookUp();
  }, []);

  useEffect(() => {
    const eventSearchFilterLookUp = async () => {
      const eventSearchFilterData = await getStoredEventSearchFilterData();
      console.log(eventSearchFilterData);
      if (eventSearchFilterData.distance) {
        dispatch(setEventSearchFilter(eventSearchFilterData));
      }
      setIsLoading(false);
    };

    eventSearchFilterLookUp();
  }, []);

  return isLoading;
};
