import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    console.log(action);
    switch (action.type){
        case FETCH_USER:
            return action.payload || false; 
        default:
            return state;
    }
}
//Case 1: MAke a requiest to backend to get user, authredducer retujrns null
//request complete , user is logged in, returns user model
//request done