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
import NewConnectionScreen from '../components/newConnectionScreen';
import KnownConnectionsScreen from '../components/KnownConnectionsScreen';
import TextOutputScreen from '../components/TextOutputScreen';

const MainNavigator = createStackNavigator({
  Command: {screen: CommandScreen},
  Settings: {screen: SettingsScreen},
  NewConnection: {screen: NewConnectionScreen},
  KnownConnections: {screen: KnownConnectionsScreen},
  TextOutput: {screen: TextOutputScreen}
});

const App = createAppContainer(MainNavigator);
export default App;