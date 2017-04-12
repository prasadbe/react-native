import Type from '../type';
export default vendorReducer = (state = {
    id:0,
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
        default: {
            return state;
        }
            
    }
};