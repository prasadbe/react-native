 
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
import styles from '../styles/index';
let mapStatetoProps = (state) => {
    return {
        map:state.mapReducer,
        vendor:state.vendorReducer
    };
}
let mapDispatchProps = (dispatch) => {
    return {

    };
}
 class Vendor extends React.Component {
   constructor(props) {
     super(props);          
   }
    
   componentDidMount() {
        // Don't forget start!
   }

   render() {
     return (
       <View style={styles.container} >
        {(typeof(this.props.vendor.data.first_name) != 'undefined') ? <Text>Welcome {this.props.vendor.data.first_name}</Text> : <Text>Loading</Text>}
      </View>
     );
   }
 }
 export default connect(mapStatetoProps,mapDispatchProps)(Vendor);