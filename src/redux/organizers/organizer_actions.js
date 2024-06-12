import { showPopUpNotification } from "../notifications/notification_action"

export const FETCH_MY_FOLLOWERS = "FETCH_MY_FOLLOWERS"
export const FOLLOW_ORGANIZER = "FOLLOW_ORGANIZER"
export const UNFOLLOW_ORGANIZER= "UNFOLLOW_ORGANIZER"

export const fetchMyFollowers = () => dispatch => {
    dispatch({
        type: FETCH_MY_FOLLOWERS,
    })
}

export const followOrganizer = (followedOrganizer) => dispatch => {
    dispatch({
        type: FOLLOW_ORGANIZER,
        payload: {
            followedOrganizer : followedOrganizer
        }
    })
    dispatch(showPopUpNotification(followedOrganizer.userName + " added to favourites"))
}

export const unFollowOrganizer = (unFollowedOrganizer) => dispatch => {
    dispatch({
        type: UNFOLLOW_ORGANIZER,
        payload: {
            unFollowedOrganizer : unFollowedOrganizer
        }
    })
    dispatch(showPopUpNotification(unFollowedOrganizer.userName + " removed from favourites"))
}