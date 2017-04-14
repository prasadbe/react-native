import Type from '../type';
export default vendorReducer = (state = {
    id:0,
    isModal:false,
    data:{

    }
}, action) => {
    console.log(state);
    switch(action.type) {
        case Type.loadData : {
            console.log(Object.assign({},state,{data:action.data}));
            return Object.assign({},state,{data:action.data});
        }
        case Type.loadVendor : {
            return Object.assign({},state,{id:action.id});
        }
        case Type.showModal : {
            return Object.assign({},state,{isModal:action.status});
        }
        default: {
            return state;
        }
            
    }
};