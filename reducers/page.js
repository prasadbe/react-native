import Type from '../type';
export default pageReducer = (state = {
    content:'map'
}, action) => {
    console.log(state);
    switch(action.type) {
        case Type.changePage : {
            return Object.assign({},state,{content:action.content});
        }
        default: {
            console.log(state);
            return state;
        }
            
    }
};