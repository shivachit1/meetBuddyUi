import {useEffect, useState} from 'react';

import {useDispatch} from 'react-redux';
import {signInUser} from '../user/userActions';
import {getStoredUserData} from '../../service/AsyncLocalStorage';

export const useGetUserData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userDataLookUp = async () => {
      const user = await getStoredUserData();
      if(user.id) {
        dispatch(signInUser(user));
      }
      setIsLoading(false)
    };

    userDataLookUp();
  }, []);

  return isLoading
};
