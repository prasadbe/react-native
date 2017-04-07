 
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import styles from '../styles/index';
import Type from '../type';
import Action from '../action';
let mapStatetoProps = (state) => {
    return {
        map:state.mapReducer
    };
}
let mapDispatchProps = (dispatch) => {
    return {
        addNewMarker : (data) => {
            dispatch({
                type:Type.newMarker,
                marker:data
            });
        },
        clearAllMarker :  () => {
            dispatch({
                type:Type.clearMarker
            });
        },
        changePage :  (page) => {
            dispatch({
                type:Type.changePage,
                content:page
            });
        },
        loadData :  (data) => {
            dispatch({
                type:Type.loadData,
                data:data
            });
        },
    };
}
 class MapArea extends React.Component {
   constructor(props) {
     super(props);    
     console.log(props.map.markers);     
   }

   componentWillMount() {
        // Don't forget start!
        this.props.clearAllMarker();
        Action.loadMapApi().then((data) => {
                for(let i in data.vendor) {
                    var markers = {coordinate:{latitude:parseFloat(data.vendor[i].latitude),longitude:parseFloat(data.vendor[i].longitude)},
                                    title:data.vendor[i].stall_name,
                                    description:'',
                                    id:data.vendor[i].id};
                    this.props.addNewMarker(markers);
                }
        })
        .catch((error) => {
            console.error(error);
        });
   }
   showVendor(id) {
        this.props.changePage('vendor');
        Action.loadVendorDetail(id).then((data) => {
            this.props.loadData(data.data)
        })
        .catch((error) => {
            console.error(error);
        });
   }
   render() {
     return (
       <View style={styles.containerMap} >
        <MapView initialRegion={this.props.map.region} 
         style={styles.map}>
         {this.props.map.markers.map(marker => (
            <MapView.Marker
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description} onPress={() => { this.showVendor(marker.id) }} key={marker.id} pinColor="#ff0000"
            />
        ))}</MapView>
                </View>
     );
   }
 }
 export default connect(mapStatetoProps,mapDispatchProps)(MapArea);