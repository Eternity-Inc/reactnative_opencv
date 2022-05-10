import React, {useContext} from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {colors, fonts, metrics} from '../themes/themes';
import {GlobalContext} from '../store/globalStore';

function Sub_LeftHeaderComponent(props) {
  const navigation = useContext(GlobalContext)[2].navigation;
  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 9,
        marginLeft: 12,
      }}>
      <TouchableOpacity onPress={() => _goBack()}>
        <MaterialCommunityIcons
          name={'arrow-left'}
          size={fonts.size.iconNormal}
          color={colors.black}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: colors.black,
          marginLeft: 10,
          fontSize: fonts.size.font24,
          fontWeight: 'bold',
        }}>
        {props.name}
      </Text>
    </View>
  );
}

function Home_RightHeaderComponent() {
  const navigation = useContext(GlobalContext)[2].navigation;
  //const navigation = useContext(GlobalContext)[2].navigation;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 3,
        marginRight: 10,
      }}></View>
  );
}

export function HomeHeader() {
  //console.log(props);
  return (
    <View>
      <View
        style={{
          backgroundColor: colors.secondary,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 13,
          paddingHorizontal: 5,
        }}>
        <Home_LeftHeaderComponent />
        <Home_RightHeaderComponent />
      </View>
    </View>
  );
}
