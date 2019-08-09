    
import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator,createAppContainer } from 'react-navigation';
import {
  Easing,
  Animated
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import HotList from '../views/HotList.js'
import Seek from '../views/Seek'
import Mine from '../views/Mine'
import Detail from '../views/Detail'
import {Button} from 'react-native'
const bottomRouteConfigs={
    MovieList:{
        screen:HotList,
        navigationOptions:{
            tabBarLabel:'热映',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-eye" size={20} color={tintColor} />
              ),
        }
    },
    Seek:{
        screen:Seek,
        navigationOptions:{
            tabBarLabel:'找片',
            tabBarIcon:({tintColor})=>(
                <Icon name="ios-eye" size={20} color={tintColor}></Icon>
            )
        }
    },
    Mine:{
        screen:Mine,
        navigationOptions:{
            tabBarLabel:'我的',
            tabBarIcon:({tintColor})=>(
                <Icon name="ios-person" size={20} color={tintColor}></Icon>
            )
        }
    }
}
const BottomTabNavigatorConfig={
    tabBarOptions: {
        activeTintColor: '#494949',
        inactiveTintColor: '#999999',
        labelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        style: {
          borderTopWidth: 1,
          borderTopColor: '#c3c3c3',
          height: 50,
          backgroundColor: '#fff'
        },
    },
    // tabBarComponent:TabBarComponent
}
const BottomTab=createBottomTabNavigator(bottomRouteConfigs,BottomTabNavigatorConfig);
const myApp=createStackNavigator({
    Home:{
        screen:BottomTab,
        navigationOptions:{
            header:null
        }
    },
    Detail:{
        screen:Detail,
        navigationOptions:{
            headerTitle:'详情',
            headerRight:<Icon name="md-share" onPress={()=>{alert('分享')}} size={22} color="#fff" style={{marginRight:15}}></Icon>,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#2A362C',
                opacity: 1,
            },
            headerTitleStyle: { // android 居中
                flex: 1,
                textAlign: 'center'
            }
        }
    },
},{
    headerMode: 'screen',
    mode: 'modal',
    navigationOptions: {
        gesturesEnabled: false,
    },
    transitionConfig: () => ({
        transitionSpec: {
          duration: 300,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
  
          const width = layout.initWidth;
          const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [width, 0, 0],
          });
  
          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
          });
  
          return { opacity, transform: [{ translateX }] };
        },
    }),
});
export default createAppContainer(myApp);