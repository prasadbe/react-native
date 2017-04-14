import Type from '../type';
let markers = [];
let getRegionForCoordinates = (points) => {
  return {
    latitude: points.latitude,
    longitude: points.longitude,
    latitudeDelta: 0.0043,
    longitudeDelta:  0.0034
  };
};
let region= getRegionForCoordinates({latitude:12.5950,longitude:80.1525});
export default mapReducer = (state = {
    region : region,
    markers : markers
}, action) => {
    console.log(action);
    switch(action.type) {
        case Type.allMarker : {
            return Object.assign({},state,{markers:action.markers});
        }
        case Type.newMarker : {
            //console.log(Object.assign({},state,{markers:state.markers.concat(action.marker)}));
            return Object.assign({},state,{markers:state.markers.concat(action.marker)});
        }
        case Type.clearMarker : {
            //console.log(Object.assign({},state,{markers:state.markers.concat(action.marker)}));
            return Object.assign({},state,{markers:[]});
        } 
        case Type.removeMarker : {
            return Object.assign({},state, {
                markers:state.markers.filter((val) => {
                    return (val.id != action.data.id);
                })
            })
        }
        case Type.changeRegion : {
            console.log(action);
            //console.log(Object.assign({},state,{markers:state.markers.concat(action.marker)}));
            return Object.assign({},state,{
            region : getRegionForCoordinates({latitude:action.position.coords.latitude,longitude:action.position.coords.longitude})
            });
        }
        default :
            return state;
    }
};