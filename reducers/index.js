import Type from '../type';
let region= {
    latitude: 12.5950,
    longitude: 80.1525,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
};
let markers = [];
export default mapReducer = (state = {
    region : region,
    markers : markers
}, action) => {
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
        case Type.changeRegion : {
            console.log(action);
            //console.log(Object.assign({},state,{markers:state.markers.concat(action.marker)}));
            return Object.assign({},state,{
            region : {
                latitude: action.position.coords.latitude,
                longitude: action.position.coords.longitude,
                latitudeDelta: state.region.latitudeDelta,
                longitudeDelta: state.region.longitudeDelta,
            }
            });
        }
        default :
            return state;
    }
};