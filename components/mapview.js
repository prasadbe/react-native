 
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
console.log(window.navigator.userAgent);
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';


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
        }, removeMarker : (data) => {
            dispatch({
                type:Type.removeMarker,
                data:data
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
     this.socket = io.connect(Type.SocketUrl,{
         jsonp : false,
         timeout: 3000
     });
        this.socket.on('customer_location_changed', (data) => {  
                data.coupon_name = null;
                data.profile_picture = require('../images/RSSBurger.png');
                var markers = this.markerData(data);
                this.props.addNewMarker(markers);
        }); 

        this.socket.on('shop_opened', (data) => {
                var markers = this.markerData(data);
                this.props.addNewMarker(markers);
        });  

        this.socket.on('coupon_added', (data) => {
              var markers = this.markerData(data);
              this.props.removeMarker(markers);  
              this.props.addNewMarker(markers);
      });


      this.socket.on('coupon_removed', (data) => {
                var markers = this.markerData(data);
                this.props.removeMarker(markers);
                this.props.addNewMarker(markers);
      });  

      this.socket.on('shop_closed', (data) => {                
               var markers = this.markerData(data);
                this.props.removeMarker(markers);
      });
     
   }

   watchID = null;
    markerData(data) {
        return {coordinate:{latitude:parseFloat(data.latitude),longitude:parseFloat(data.longitude)},
                        title:data.name,
                        description:'',
                        image:(data.profile_picture == '') ? {uri:Type.localUrl+'/assets/img/default-bb-burger.jpg'} : {uri:Type.s3Url+data.profile_picture},
                        id:data.id,
                        color:'#0000ff',
                        coupon_name: (data.coupon_name != null) ? data.coupon_name.replace('<span>','').replace('</span>','').replace('<br>','') : ''
                };
    }
    componentDidMount() {        
        this.watchID = navigator.geolocation.getCurrentPosition((position) => { 
            position.coords.title = 'itsyou',
            position.coords.description = '',
            position.coords.image = require('../images/RSSBurger.png'),
            position.coords.id = 'me',
            position.coords.color = '#00ff00';
            position.coords.name = 'me';
            position.coords.coupon_name = '';
            var markers = this.markerData(position.coords);
            this.props.addNewMarker(markers);
            this.socket.emit('queue', {action:'customer_location_changed', latitude:position.coords.latitude, longitude:position.coords.longitude, id: 1, name: 'hj'}); 

             Action.loadMapApi().then((data) => {
                    for(let i in data.vendor) {
                        data.vendor[i].name = data.vendor[i].stall_name;
                        var markers = this.markerData(data.vendor[i]);
                        this.props.addNewMarker(markers);
                    }
            })
            .catch((error) => {
                console.error(error);
            });

            console.log(this.socket);
            
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
        // Don't forget start!
        this.props.clearAllMarker();
        
    }

    componentWillMount() {
       
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
            <MapView.Marker            
            coordinate={marker.coordinate} onPress={() => {
                this.showVendor(marker.id)
            }}
            title={marker.title}
            description={marker.description} key={marker.id} pinColor={marker.color}>
                <View style={styles.lightView} onPress={() => {
                this.showVendor(marker.id)
            }}><Image source={marker.image} style={styles.lightImg} />
                {(marker.coupon_name == null || marker.coupon_name == '') ? <Text> </Text> : <View style={styles.coupon_name_view}><Text style={styles.coupon_name_text}>{marker.coupon_name}</Text></View>}
            </View>
            </MapView.Marker>
        ))}</MapView>
                </View>
     );
   }
 }
 export default connect(mapStatetoProps,mapDispatchProps)(MapArea);