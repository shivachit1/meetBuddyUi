import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store.js';

import {HomeView} from './src/App.js';

const AppView = () => {
  return (
    <Provider store={store}>
      <HomeView />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppView);
