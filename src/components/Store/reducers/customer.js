import * as types from "../actions/types";

const initialState = {
	customers: [],
	customer: null,
	isLoading: false,
	customerCreated: false,
	customerDeleted: false,
	customerUpdated:false,
	error: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_CUSTOMERS_SUCCESS:
			return {
				...state,
				customers: action.customers,
				isLoading: false
			};
		case types.GET_SINGLE_CUSTOMER_SUCCESS:
			return {
				...state,
				customer: action.customer,
				isLoading: false
			};
		case types.ADD_CUSTOMER_INIT:
			return {
				...state,
				customerCreated: false,
				error: null
			};
		case types.ADD_CUSTOMER_SUCCESS:
			return {
				...state,
				isLoading: false,
				customerCreated: true,
				error: null
			};
			case types.EDIT_CUSTOMER_INIT:
			return {
				...state,
				isLoading: false,
				customerUpdated: false,
				customer: action.customer,
				error: null
			};
		case types.EDIT_CUSTOMER_SUCCESS:
			return {
				...state,
				isLoading: false,
				customerUpdated: true,
				error: null
			};
			case types.EDIT_CUSTOMER_DONE:
			return {
				...state,
				customerUpdated: false,
				error: null
			};
		case types.DELETE_CUSTOMER_INIT:
			return {
				...state,
				customerDeleted: false,
				error: null
			};
		case types.DELETE_CUSTOMER_SUCCESS:
			return {
				...state,
				isLoading: false,
				customerDeleted: true,
				error: null
			};
		case types.LOADING:
			return {
				...state,
				isLoading: true
			};
		case types.ERROR_OCCURED:
			return {
				...state,
				isLoading: false,
				error: action.error
			};
		default:
			return state;
	}
};

export default reducer;