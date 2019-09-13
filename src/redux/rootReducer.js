import { combineReducers } from "redux";
import productNexhibition from './exhibitionList/reducer';
import user from "./profile/reducer";
import auth from "./auth/reducer";
import chat from "./chat/reducer";


export default combineReducers({
    productNexhibition,
    user,
    auth,
    chat,
});