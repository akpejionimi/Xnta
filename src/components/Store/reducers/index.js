import { combineReducers} from "redux";

import authreducer from "./auth"
import customerReducer from "./customer";
import staffReducer from "./staffReducer"



const rootReducer = combineReducers({
    auth: authreducer,
    customer : customerReducer,
    staff: staffReducer
});


export default rootReducer;