import axiosInstance, { setAuthToken } from "./axiosInstance";


export const googleSignIn = async userInfo => {
  try {
    const response = await axiosInstance.post('/auth/google', { token: userInfo.idToken });
    const user = await response.data;
    return user;
  } catch (error) {
    console.log(error)
  }
};


export const getUserProfileData = async userId => {
    try {
      const response = await axiosInstance.get(
        '/users/' + userId + '/profileDetails',
      );
      const profileData = await response.data;
      return profileData;
    } catch (error) {
      console.error(error)
    }
  };

  export const getUserData = async (userId) => {
    try {
      const response = await axiosInstance.get(
        '/users/' + userId
      );
      const user = await response.data;
      return user;
    } catch (error) {
      console.error(error)
    }
  };

  export const updateUserData = async (userId, user) => {
    try {
      const response = await axiosInstance.put(
        '/users/' + userId, {user}
      );
      const updatedUser = await response.data;
      return updatedUser;
    } catch (error) {
      console.error(error)
    }
  };

  export const getMyFollowers = async (userId) => {
    try {
      const response = await axiosInstance.get('/follow/' + userId);
      const followersData = await response.data;
      return followersData;
    } catch (error) {
      console.error(error)
    }
  };

  export const followCheck = async (userId, targetedUserId) => {
    try {
      const response = await axiosInstance.get('/follow/' + userId + "/" + targetedUserId);
      const updatedData = await response.data;
      return updatedData;
    } catch (error) {
      console.error(error)
    }
  };

  export const followUser = async (userId, followedUserId) => {
    try {
      const response = await axiosInstance.post('/follow/' + userId, {
        followedUserId: followedUserId
      });
      const updatedData = await response.data;
      return updatedData;
    } catch (error) {
      console.error(error)
    }
  };
  
  export const unFollowUser = async (userId, unFollowedUserId) => {
    try {
      const data = {
        unFollowedUserId: unFollowedUserId,
      };
    
      const response = await axiosInstance.delete('/unfollow/' + userId, {data});
      const updatedData = await response.data;
      return updatedData
      
    } catch (error) {
      console.error(error)
    }
  };


  export const searchUser = async (token, userName) => {
    try {
      setAuthToken(token)
      const response = await axiosInstance.get(`/users?search=${userName}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error)
    }
  };
