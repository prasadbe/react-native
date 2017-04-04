import {
  StyleSheet
} from 'react-native';
export default styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  }, 
   containerMap: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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