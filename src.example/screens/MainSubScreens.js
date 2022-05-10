import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {GlobalContext} from '../store/globalStore';
import {NitrogrenScreen} from '../screens/NitrogrenScreen'
import {BrownFrogScreen} from '../screens/BrownFrogScreen'

const subStack = createStackNavigator();

export class SubScreens extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <subStack.Navigator>
        <subStack.Screen
          name="NitrogrenScreen"
          component={NitrogrenScreen}
          options={{headerShown: false}}
        />
        <subStack.Screen
          name="BrownFrogScreen"
          component={BrownFrogScreen}
          options={{headerShown: false}}
        />
      </subStack.Navigator>
    );
  }
}
