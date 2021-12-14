import axios from 'axios'
import { FETCH_USER } from './types';
//Makes a requst to a backend API 
export const fetchUser = () =>  async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({type: FETCH_USER, payload: res });
    
    
};
