import { 
    createAppContainer,
} from 'react-navigation';

import {
    createMaterialTopTabNavigator
} from 'react-navigation-tabs';

import {
    createStackNavigator
} from 'react-navigation-stack';

import CommandScreen from '../components/CommandScreen';
import SettingsScreen from '../components/SettingsScreen';

const MainNavigator = createStackNavigator({
  Command: {screen: CommandScreen},
  Settings: {screen: SettingsScreen}
});

const App = createAppContainer(MainNavigator);
export default App;