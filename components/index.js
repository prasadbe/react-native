 
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Header from './header';
import MapArea from './mapview';
import styles from '../styles/index';
let mapStatetoProps = (state) => {
    return {
        map:state.mapReducer
    };
}
let mapDispatchProps = (dispatch) => {
    return {

    };
}
 class IndexC extends React.Component {
   constructor(props) {
     super(props);          
   }
    
   componentDidMount() {
        // Don't forget start!
   }

   render() {
     return (
       <View style={styles.container} >
        <Header></Header>
        <MapArea></MapArea>
      </View>
     );
   }
 }
 export default connect(mapStatetoProps,mapDispatchProps)(IndexC);