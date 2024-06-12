import {ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {MapViewPage} from './views/Map/MapView';
import {SignInView} from './views/SignInView';
import {useEffect} from 'react';
import {fetchEvents} from './redux/events/eventsActions';
import {showEventsView} from './redux/ui/uiActions';
import {fetchNotification} from './redux/notifications/notification_action';
import {fetchUserFollowInfo} from './redux/user/userActions';
import {UserProfileView} from './views/UserProfileView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileMenuView} from './views/ProfileMenu';
import {ProfileView} from './views/ProfileView';
import {MyNotificationView} from './views/MyNotificaionView';
import {MessageView} from './views/MessageView';
import {MyEventsView} from './views/MyEventsView';
import {EventDetailsView} from './views/EventDetailsView';
import {CreateEventView} from './views/CreateEventView';
import {UnFollowOrganizerConfirmView} from './views/UnFollowOrganizerConfirmView';
import {EditProfileView} from './views/EditProfile';
import {useGetUserData} from './redux/hooks/localstorage';
import {FilterView} from './views/FilterView';
import {CustomerSearchAutoComplete} from './views/CustomerSearchAutoComplete';
import {EventSuccessView} from './views/SuccessView';

const Stack = createNativeStackNavigator();

export const HomeView = () => {
  const isLoading = useGetUserData();
  const dispatch = useDispatch();
  const {loggedInUser, isAuthenticated} = useSelector(
    state => state.userReducer,
  );

  useEffect(() => {
    if (loggedInUser.id) {
      dispatch(fetchEvents(loggedInUser.id));
      dispatch(showEventsView(true));
      dispatch(fetchNotification(loggedInUser.id));
      dispatch(fetchUserFollowInfo(loggedInUser.id));
    }
  }, [loggedInUser.id]);

  if (isLoading) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{animationTypeForReplace: 'pop', gestureEnabled: true}}
        initialRouteName={isAuthenticated ? 'MapViewPage' : 'SignInView'}>
        <Stack.Group>
          <Stack.Screen
            name="MapViewPage"
            component={MapViewPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignInView"
            component={SignInView}
            options={{headerShown: false}}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: 'transparentModal',
            animation: 'fade',
            animationDuration: 2000,
          }}>
          <Stack.Screen
            name="FilterView"
            component={FilterView}
            options={{headerShown: false, cardShadowEnabled: true}}
          />
          <Stack.Screen
            name="UserProfileView"
            component={UserProfileView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileMenuView"
            component={ProfileMenuView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileView"
            component={ProfileView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProfileView"
            component={EditProfileView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyNotificationView"
            component={MyNotificationView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MessageView"
            component={MessageView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyEventsView"
            component={MyEventsView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EventDetailsView"
            component={EventDetailsView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateEventView"
            component={CreateEventView}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="EventSuccessView"
            component={EventSuccessView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UnFollowOrganizerConfirmView"
            component={UnFollowOrganizerConfirmView}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="CustomerSearchAutoComplete"
            component={CustomerSearchAutoComplete}
            options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
