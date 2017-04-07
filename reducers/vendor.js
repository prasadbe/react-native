import Type from '../type';
export default vendorReducer = (state = {
    data:{

    }
}, action) => {
    console.log(state);
    switch(action.type) {
        case Type.loadData : {
            console.log(Object.assign({},state,{data:action.data}));
            return Object.assign({},state,{data:action.data});
        }
        default: {
            return state;
        }
            
    }
};