import constants from './constants';
import {createAction} from 'redux-actions';
import {userManager} from '../index';
import axios from 'axios';

export const getProducts = createAction(constants.GET_PRODUCTS, async () => {
    const user = await userManager.getUser();
    const response = await axios.get(`/api/products`, {
        headers: {
            authorization: `Bearer ${user.access_token}`
        }
    });
    return response.data;
});