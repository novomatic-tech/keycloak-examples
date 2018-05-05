import constants from "../actions/constants";

export default function productsReducer(state = [], action) {
    if (action.type !== constants.GET_PRODUCTS || action.rejected || action.error) {
        return state;
    }
    return action.payload;
}
