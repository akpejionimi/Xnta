import axios from "../../utils/axios-base";

import * as types from "./types";


export const loading = () => {
	return {
		type: types.LOADING
	};
};

export const getStaffSuccess = staffs => {
	return {
		type: types.GET_STAFF_SUCCESS,
		staffs
	};
};

export const errorOccured = error => {
	return {
		type: types.ERROR_OCCURED,
		error
	};
};

// This is possible because of the redux-thunk middleware
export const getStaffs = () => {
	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	return dispatch => {
		dispatch(loading());
		axios
			.get("/staff", config)
			.then(res => {
				dispatch(getStaffSuccess(res.data));
			})
			.catch(err => dispatch(errorOccured(err.message)));
	};
};

export const getSingleStaff = staffId => {
	return dispatch => {
		dispatch(loading());
		axios
			.get(`/staff/${staffId}`)
			.then(res => {
				dispatch({ type: types.GET_SINGLE_STAFF_SUCCESS, staff: res.data });
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};

export const addStaffInit = () => {
	return {
		type: types.ADD_STAFF_INIT
	};
};

// This is possible because of the redux-thunk middleware
export const addStaff = staffData => {
	return (dispatch, getState) => {
		dispatch(loading());
		// const token = getState().auth.token;

		// Headers
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		// If token, add to headers
		// if (token) {
		// 	config.headers["x-access-token"] = token;
		// }
		axios
			.post("/staff", staffData, config)
			.then(res => {
				return dispatch({ type: types.ADD_STAFF_SUCCESS });
			})
			.then(() => {
				dispatch(addStaffInit());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};

