import {
  StyleSheet
} from 'react-native';
export default styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    height:950
    
  },
   scrollViewFull: {
    backgroundColor: '#fff',
  },  
  list_view :{
    height:380
  },
  thumbFull: {
    borderColor: 'white',
    flex: 1,
    flexDirection:'column',
    borderWidth: 1, 
    width:400,
    height:550,
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  thumbLarge : {
    height:400
  },
  horizontalScrollView: {
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
  button: {
    margin: 5,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderRadius: 3,
  },
  thumb: {
    margin: 10,
    padding: 5,
    backgroundColor: '#cccccc',
    width:390,
    height:300
  },
  thumbImg: {
    width:370,
    height:280
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  borderImg: {
    borderRadius:50,
    borderWidth: 0.5,
    width:90,
    height:90,
    borderColor: '#d6d7da',
  },
  vendor_names_text : {
    fontSize:16,
    color:'red',
  },
  vendor_image : {
    width:400,
    height:400,
    left:5,
  },
  vendor_img : {
    top:5,
    left:10,
    width:490,
    height:120,
    flexDirection:'row'
  },
  vendor_deals: {
    top:0,
    left:15,
    width:590,
    height:70,
    flexDirection:'column'
  },
  vendor_names : {
    paddingTop: 4,
    paddingRight: 22,
    width:150,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height:30,
    left:30,
  },
  close: {
    position: 'absolute',
    height:20,
    width:100,
    top: 30,
    right:-20,
    alignItems: 'center',
    justifyContent:'flex-end'
  },
  close_text : {
    color:'#fff'
  },
  red: {
    color: 'red',
  },container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    borderWidth:1,
    height:1500,
    borderColor:'red',
  }, 
   containerMap: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
  },containerMapInner: {
    position:'relative',
    top:20,
    left:10,
    width:480,
    zIndex:300,
    backgroundColor:'black',
    height:250,
    justifyContent:'flex-start'
  },
   containerVendor: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    height:1000,
    bottom: 0,
    justifyContent: 'flex-start',
  },
  nodealButtonView :{
   top:290,
   position:'relative',
   backgroundColor:'red',
   width:480,
    height:30,
   justifyContent:'flex-end'
  },
  nodealButton :{
    width:480,
    height:30,
    top:30,
    position:'relative'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
     width:480,
    zIndex:300,
    height:250,
    bottom: 0,
  },
  header: {
      backgroundColor:'blue',
      alignSelf: 'stretch',
      height:80,
      flexDirection:'row',
      justifyContent:'flex-start',
      top:0,
      left:0
  },
  logo : {
      width:40,
      height:70,
      flexDirection:'column',
      flex:1,
      justifyContent:'flex-start',
      left:5,
      top:5
  },
  image: {
      width:140,
      height:70,
      justifyContent:'flex-start',
      flexDirection:'row'
  }
});