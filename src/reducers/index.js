import {combineReducers} from "redux";
import weatherReducer from "./weatherReducer";
import settingsReducer from "./settingsReducer";
import favoritesReducer from "./favoritesReducer";


const rootReducer= combineReducers(

    {
         weatherReducer,
         settingsReducer,
         favoritesReducer
    }
)

export default rootReducer;