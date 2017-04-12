import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Button
} from 'react-native';
import styles from '../styles/index';
import { connect } from 'react-redux';
import Type from '../type';
let mapStatetoProps = (state) => {
    return {
        map:state.mapReducer
    };
}
let mapDispatchProps = (dispatch) => {
    return {
      changePage :  (page) => {
            dispatch({
                type:Type.changePage,
                content:page
            });
        },
    };
}
 class CloseModal extends React.Component {
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
        <View style={styles.close}><Button  onPress={() => { this.props.changePage('map')} } title="Close"/></View>
     );
   }
 }
export default connect(mapStatetoProps,mapDispatchProps)(CloseModal);