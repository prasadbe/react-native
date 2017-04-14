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
import Vendor from './vendor';
import styles from '../styles/index';
let mapStatetoProps = (state) => {
    return {
        map:state.mapReducer,
        page:state.pageReducer
    };
}
let mapDispatchProps = (dispatch) => {
    return {

    };
}
 class IndexC extends React.Component {
   constructor(props) {
     console.log(props);
     super(props);          
   }
    
   componentDidMount() {
        // Don't forget start!
   }

   render() {
     return (
       <View style={styles.container} >
        <Header></Header>
        {(this.props.page.content == 'map') ? <MapArea></MapArea> : (this.props.page.content == 'vendor') ? <Vendor></Vendor> : <Text>Other</Text> 
        }
      </View>
     );
   }
 }
 export default connect(mapStatetoProps,mapDispatchProps)(IndexC);