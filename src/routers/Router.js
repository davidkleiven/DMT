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

const MainNavigator = createStackNavigator({
  Command: {screen: CommandScreen},
});

const App = createAppContainer(MainNavigator);
export default App;