import { combineReducers} from "redux";

import authreducer from "./auth";
import customerReducer from "./customer";
import staffReducer from "./staffReducer";
import savingsProductReducer from "./savingsProduct";



const rootReducer = combineReducers({
    auth: authreducer,
    customer : customerReducer,
    staff: staffReducer,
    savingsProduct: savingsProductReducer

});


export default rootReducer;