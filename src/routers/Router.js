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

const SettingsStack = createMaterialTopTabNavigator({
    CommandScreen: {
        screen: CommandScreen,
        navigationOptions: {
            title: 'Command Screen',
        }
    },
  }, { 
    lazy: true,
    swipeEnabled: false,
    tabBarOptions: { 
      indicatorStyle: { backgroundColor: "#469CCC" }, 
      style: {
        backgroundColor: '#33CCC7',
      },
    } 
  });

export default createAppContainer(createStackNavigator(
    {
      AvailableOptionScreen: {
        screen: SettingsStack,
        navigationOptions: { 
          headerLeft: null,
          headerStyle: { height: 0 },
        }
      },
      CommandScreen: {
          screen: CommandScreen,
          navigationOptions: { 
            title: 'DMT', 
            headerStyle: {
                backgroundColor: '#33CCC7'
            },
        }
      },
    },
    {}
  ));