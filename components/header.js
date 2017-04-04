 
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  View
} from 'react-native';
import styles from '../styles/index';
import { connect } from 'react-redux';
let mapStatetoProps = (state) => {
    return {
        map:state.mapReducer
    };
}
let mapDispatchProps = (dispatch) => {
    return {

    };
}
 class Header extends React.Component {
   constructor(props) {
     super(props);          
   }

    onRegionChange(region) {
    }

   componentDidMount() {
        // Don't forget start!
   }
   render() {
     return (
        <View style={[styles.header]}>
            <View style={[styles.logo]}>
                <Image style={[styles.image]} source={require('../img/logo-burger-kat-mane.png')} resizeMode='contain' />
             </View>              
        </View>
     );
   }
 }
export default connect(mapStatetoProps,mapDispatchProps)(Header);