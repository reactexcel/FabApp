import { combineReducers } from "redux";
import productNexhibition from './exhibitionList/reducer';
import user from "./profile/reducer";



export default combineReducers({
    productNexhibition,
    user,
});