import {
  FETCH_MY_FOLLOWERS,
  FOLLOW_ORGANIZER,
  UNFOLLOW_ORGANIZER,
} from './organizer_actions';

const favouritesState = {
  followedOrganizers: [],
};

const myFollowedUsersSample = [
  {
    userId: 1,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 1',
  },
  {
    userId: 2,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 2',
  },
  {
    userId: 3,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 3',
  },
  {
    userId: 4,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 4',
  },
  {
    userId: 5,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 5',
  },
  {
    userId: 6,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 6',
  },
  {
    userId: 7,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 7',
  },
  {
    userId: 8,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 8',
  },
  {
    userId: 9,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 9',
  },
  {
    userId: 10,
    userImageURL: 'Lunch Meet up',
    userName: 'Test 10',
  },
];

const addItemAndSortByUserName = (user, list) => {
  list.push(user);
  return list.sort((a, b) => a.userName.localeCompare(b.userName));
}

const removeItemAndSortByUserName = (user, list) => {
  return list.filter(item => item.userId !== user.userId).sort((a, b) => a.userName.localeCompare(b.userName));
}

export const organizerReducer = (state = favouritesState, action) => {
  switch (action.type) {
    case FETCH_MY_FOLLOWERS:
      return {
        ...state,
        followedOrganizers: myFollowedUsersSample.sort((a, b) => a.userName.localeCompare(b.userName)),
      };
    case FOLLOW_ORGANIZER:
      const {followedOrganizer} = action.payload;
      return {
        ...state,
        followedOrganizers: addItemAndSortByUserName(followedOrganizer, state.followedOrganizers),
      };
    case UNFOLLOW_ORGANIZER:
      const {unFollowedOrganizer} = action.payload;
      return {
        ...state,
        followedOrganizers: removeItemAndSortByUserName(unFollowedOrganizer, state.followedOrganizers),
      };
    default:
      return state;
  }
};
