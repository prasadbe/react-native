 
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
        loadVendor :  (id) => {
            dispatch({
                type:Type.loadVendor,
                id:id
            });
        },
        changeRegion : (position) => {
            dispatch({
                type:Type.changeRegion,
                position:position
            });
        },
    };
}
 class MapArea extends React.Component {
   constructor(props) {
     super(props);    
     console.log(props.map.markers);     
   }

   watchID = null;

    componentDidMount() {        
        this.watchID = navigator.geolocation.getCurrentPosition((position) => {
            this.props.changeRegion(position);
            var markers = {coordinate:{latitude:parseFloat(position.coords.latitude),longitude:parseFloat(position.coords.longitude)},
                                    title:'itsyou',
                                    description:'',
                                    id:'me',
                                    color:'#00ff00'
                            };
            this.props.addNewMarker(markers);
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
        // Don't forget start!
        this.props.clearAllMarker();
        
    }

    componentWillMount() {
        Action.loadMapApi().then((data) => {
                for(let i in data.vendor) {
                    var markers = {coordinate:{latitude:parseFloat(data.vendor[i].latitude),longitude:parseFloat(data.vendor[i].longitude)},
                                    title:data.vendor[i].stall_name,
                                    description:'',
                                    id:data.vendor[i].id,
                                    color:'#ff0000'
                                };
                    this.props.addNewMarker(markers);
                }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    showVendor(id) {
        this.props.changePage('vendor');
        this.props.loadVendor(id);
        
   }
   render() {
     return (
       <View style={styles.containerMap} >
        <MapView initialRegion={this.props.map.region} 
         style={styles.map}>
         {this.props.map.markers.map(marker => (
            (marker.id == 'me')
            ?
            <MapView.Marker
            image={require('../images/1231195_tn.jpg')}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description} key={marker.id} pinColor={marker.color}
            />
            :

            <MapView.Marker
            image={require('../images/RSSBurger.png')}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description} onPress={() => { if(parseInt(marker.id) > 0) { this.showVendor(marker.id) } }} key={marker.id} pinColor={marker.color}
            /> 
        ))}</MapView>
                </View>
     );
   }
 }
 export default connect(mapStatetoProps,mapDispatchProps)(MapArea);