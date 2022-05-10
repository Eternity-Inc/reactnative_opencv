import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  UIManager,
  findNodeHandle,
} from 'react-native';
import {colors, fonts, metrics} from '../themes/themes';
import {HomeHeader} from '../components/headers';
import {GlobalContext} from '../store/globalStore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export class HomeScreen extends React.Component {
  nativeComponentRef;
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    // const viewId = findNodeHandle(this.ref.current);
    // createFragment(viewId);
    if (this.props.navigation != undefined) {
      this.context[3]({navigation: this.props.navigation});
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <StatusBar hidden={false} />
        <HomeHeader navigation={this.props.navigation} />
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.container}>
            <View key={1} style={{marginHorizontal: 10, marginVertical: 10}}>
              <View style={{marginBottom: 5}}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                  this.props.navigation.navigate('SubsScreen', {
                    screen: 'BrownFrogScreen',
                    params: {
                      test: 'test',
                    },
                  });
                }}>
                  <Text style={{color: colors.white}}>Brownspot/Frogspot</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: 5}}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                  this.props.navigation.navigate('SubsScreen', {
                    screen: 'NitrogrenScreen',
                    params: {
                      test: 'test',
                    },
                  });
                }}>
                  <Text style={{color: colors.white}}>Nitrogen</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#147efb',
    borderRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
