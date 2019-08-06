import * as types from "../actions/types";

const initialState = {
	savingsProducts: [],
	savingsProduct: null,
	isLoading: false,
	savingsProductCreated: false,
	savingsProductDeleted: false,
	savingsProductUpdated:false,
	error: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_SAVINGS_PRODUCT_SUCCESS:
			return {
				...state,
				savingsProducts: action.savingsProducts,
				isLoading: false
			};
		case types.GET_SINGLE_SAVINGS_SUCCESS:
			return {
				...state,
				savingsProduct: action.savingsProduct,
				isLoading: false
			};
		case types.ADD_SAVINGS_PRODUCT_INIT:
			return {
				...state, 
				savingsProductCreated: false,
				error: null
			};
		case types.ADD_SAVINGS_PRODUCT_SUCCESS:
			return {
				...state,
				isLoading: false,
				savingsProductCreated: true,
				error: null
			};
			case types.EDIT_SAVINGS_PRODUCT_INIT:
			return {
				...state,
				isLoading: false,
				savingsProductUpdated: false,
				savingsProduct: action.savingsProduct,
				error: null
			};
		case types.EDIT_SAVINGS_PRODUCT_SUCCESS:
			return {
				...state,
				isLoading: false,
				savingsProductUpdated: true,
				error: null
			};
			case types.EDIT_SAVINGS_PRODUCT_DONE:
			return {
				...state,
				savingsProductCreated: false,
				error: null
			};
		case types.DELETE_SAVINGS_PRODUCT_INIT:
			return {
				...state,
				savingsProductDeleted: false,
				error: null
			};
		case types.DELETE_SAVINGS_PRODUCT_SUCCESS:
			return {
				...state,
				isLoading: false,
				savingsProductDeleted: true,
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
