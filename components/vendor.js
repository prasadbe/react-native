import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  ListView,
  Text,
  ScrollView,
  TouchableHighlight,
  Modal,
  Button,
  Image,
  View
} from 'react-native';

import Countdown from 'react-native-countdown';
import { connect } from 'react-redux';
import CloseModal from './closemodal';
import styles from '../styles/index';
import MapView from 'react-native-maps';
import Type from '../type';
import Action from '../action';
import io from 'socket.io-client';
let mapStatetoProps = (state) => {
    return {
        map:state.mapReducer,
        vendor:state.vendorReducer
    };
}
let mapDispatchProps = (dispatch) => {
    return {
      loadData :  (data) => {
            dispatch({
                type:Type.loadData,
                data:data
            });
      },
      showModal : (status) => {
          dispatch({
            type:Type.showModal,
            status:status
          });
      }
    };
}
 class Vendor extends React.Component {
   constructor(props) {
     super(props);  

      this.socket = io.connect(Type.SocketUrl,{
         jsonp : false,
         timeout: 3000
      });

      this.socket.on('shop_opened', (data) => {
              if(this.props.vendor.id == data.id) {
                this.loadVendor();
              }
      });


      this.socket.on('coupon_added', (data) => {
              if(this.props.vendor.id == data.id) {
                this.loadVendor();
              }
      });


      this.socket.on('coupon_removed', (data) => {
              if(this.props.vendor.id == data.id) {
                this.loadVendor();
              }
      });  

      this.socket.on('shop_closed', (data) => {                
              if(this.props.vendor.id == data.id) {
                this.loadVendor();
              }
      });    
   }
    
  loadVendor() {
    Action.loadVendorDetail(this.props.vendor.id).then((data) => {
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          
          data.data.profile_picture = (data.data.profile_picture == '' || typeof(data.data.profile_picture) == 'undefined') ?  Type.localUrl+'/assets/img/noprofile.png' : Type.s3Url+data.data.profile_picture;
          data.data.stall_logo = (data.data.stall_logo == '' || typeof(data.data.stall_logo) == 'undefined') ?  Type.localUrl+'/assets/img/default-bb-stall.jpg' : Type.s3Url+data.data.stall_logo;
          data.data.burger_logo = (data.data.burger_logo == '' || typeof(data.data.burger_logo) == 'undefined') ?  Type.localUrl+'/assets/img/default-bb-burger.jpg' : Type.s3Url+data.data.burger_logo;
          
          data.data.dataSource  = ds.cloneWithRows([
            data.data.stall_logo,data.data.burger_logo
          ]);
          console.log(data.data.dataSource);
          this.props.loadData(data.data);
          
          //ScrollView.scrollToEnd({animated: true});
      })
      .catch((error) => {
          console.error(error);
      });
  }  

  componentWillMount() {
     console.log(this.props.vendor);
     this.loadVendor();
  }
   
   render() {
     return (
       <View style={styles.containerVendor} >
         
        {(typeof(this.props.vendor.data.first_name) != 'undefined') ? 
        <ScrollView style={styles.scrollView} horizontal={false}>
          <View style={styles.thumbFull}>
            {(this.props.vendor.data.is_closed == 1) ? <Button title="Shop Closed" color="red" style={styles.nodealButton} onPress={() => {
              
            }}  /> : <Button title="Shop Opened" color="red" style={styles.nodealButton} onPress={() => {
              
            }}  />}
            <View style={styles.vendor_img}>
              <Image source={{uri:this.props.vendor.data.profile_picture}}   style={styles.borderImg} />
              <View style={styles.vendor_names}>
                <Text style={styles.vendor_names_text}>
                  {this.props.vendor.data.first_name} {this.props.vendor.data.stall_name}                   
                </Text>
              </View>  
            </View>
            <View style={styles.vendor_deals}>        
              <Text style={styles.vendor_names_text}>
                My Stall : {this.props.vendor.data.stall_name} </Text>
              <Text style={styles.vendor_names_text}>
                My Burger : {this.props.vendor.data.stall_name}
              </Text>
            </View>   
            <View style={styles.vendor_image}> 
              <ListView horizontal={true} style={styles.list_view} scrollEnabled={true} showsHorizontalScrollIndicator={false}
            dataSource={this.props.vendor.data.dataSource}
            renderRow={(rowData) => <View style={styles.thumb}><Image source={{uri:rowData}}   style={styles.thumbImg} /></View>} />              
              </View>
          </View>
          
          <View style={styles.thumbFull}>
            <Text>ADDRESS {this.props.vendor.data.address} {this.props.vendor.vendor} </Text>
            {(this.props.vendor.data.coupons.length == 0) ? <Button title="No Deal Now" color="red" style={styles.nodealButton} disabled={true} onPress={() => {
              
            }} />
            : <Button title="Collect Deal Now" color="red" style={styles.nodealButton} onPress={() => {
              this.props.showModal(true)
            }}  />}<View style={styles.containerMapInner} >
          <MapView initialRegion={Object.assign({},this.props.map.region,{
            latitude:parseFloat(this.props.vendor.data.latitude),
            longitude:parseFloat(this.props.vendor.data.longitude)
          })} style={styles.mapInner}>
            <MapView.Marker pinColor="red" coordinate={{latitude:parseFloat(this.props.vendor.data.latitude),longitude:parseFloat(this.props.vendor.data.longitude)}}
            title={this.props.vendor.data.stall_name} description='' id={this.props.vendor.data.id}  />
          </MapView>
          
          </View>
          
          </View>
          <View style={styles.thumbFull}></View><Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.vendor.isModal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Deal Collected</Text>

            <TouchableHighlight onPress={() => {
              this.props.showModal(false)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal> 
          </ScrollView>
          
         : 
        <ActivityIndicator
        animating={true}   size="large" />}
        <CloseModal />
      </View>
     )
   }
 }
 export default connect(mapStatetoProps,mapDispatchProps)(Vendor);