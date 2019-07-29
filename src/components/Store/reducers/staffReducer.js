import * as types from "../actions/types";

const initialState = {
	staffs: [],
	staff: null,
	isLoading: false,
	staffCreated: false,
	staffDeleted: false,
	staffUpdated:false,
	error: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_STAFF_SUCCESS:
			return {
				...state,
				staffs: action.staffs,
				isLoading: false
			};
		case types.GET_SINGLE_STAFF_SUCCESS:
			return {
				...state,
				staff: action.staff,
				isLoading: false
			};
		case types.ADD_STAFF_INIT:
			return {
				...state,
				staffCreated: false,
				error: null
			};
		case types.ADD_STAFF_SUCCESS:
			return {
				...state,
				isLoading: false,
				staffCreated: true,
				error: null
			};
			case types.EDIT_STAFF_INIT:
			return {
				...state,
				isLoading: false,
				staffUpdated: false,
				staff: action.staff,
				error: null
			};
		case types.EDIT_STAFF_SUCCESS:
			return {
				...state,
				isLoading: false,
				staffUpdated: true,
				error: null
			};
			case types.EDIT_STAFF_DONE:
			return {
				...state,
				staffUpdated: false,
				error: null
			};
		case types.DELETE_STAFF_INIT:
			return {
				...state,
				staffDeleted: false,
				error: null
			};
		case types.DELETE_STAFF_SUCCESS:
			return {
				...state,
				isLoading: false,
				staffDeleted: true,
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