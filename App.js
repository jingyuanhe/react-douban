/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Navigation from './src/navigation/index'
import SplashScreen from 'react-native-splash-screen';
export default class App extends Component{
  render(){
    return (<Navigation></Navigation>)
  }
  componentDidMount(){
    setTimeout(()=>{
      SplashScreen.hide();
    },1500)
  }
}

