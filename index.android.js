/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import Indexc from './components/index';
import MapArea from './components/mapview';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import mapReducer from './reducers';
import styles from './styles/index';
const store = createStore(combineReducers({mapReducer}));
export default class IPL extends Component {   
  render() {
    return (
      <Provider store={store}>    
        <Indexc />  
      </Provider>
    );
  }
}
AppRegistry.registerComponent('IPL', () => IPL);
