import axios from "../../utils/axios-base";
import * as dateFns from 'date-fns';
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
	return dispatch => {
		dispatch(loading());
		axios
			.get("/staff")
 			.then(res => {
				dispatch(getStaffSuccess(res.data));
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
	};
};


export const getSingleStaff = staffId => {
	return dispatch => {
		dispatch(loading());
		axios
			.get(`/staff/${staffId}`)
			.then(res => {
				res.data.createdAt = dateFns.format(res.data.createdAt, 'DD-MM-YYYY')
				res.data.updatedAt = dateFns.format(res.data.updatedAt, 'DD-MM-YYYY')
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

export const editStaffInit = staffId => {
	return (dispatch, getState) => {
		const config = {
			headers: {"Content-Type": "application/json"}
		};
		axios
			.get(`staff/edit/${staffId}`, config)
			.then(res => {
				res.data.entryDate = dateFns.format(res.data.entryDate, 'YYYY-MM-DD')
				res.data.dateEmployed = dateFns.format(res.data.dateEmployed, 'YYYY-MM-DD')
					dispatch({ type: types.EDIT_STAFF_INIT, staff: res.data });
				
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};

export const editStaffDone= () => {
	return {
		type: types.EDIT_STAFF_DONE
	};
};

export const editStaff = (staffData) => {
	return (dispatch, getState) => {
		dispatch(loading());
		const staffId = getState().staff.staff.staffId;

		const config = {
			headers: {"Content-Type": "application/json"}
		};
		axios
			.put(`staff/edit/${staffId}`, staffData, config)
			.then(res => {
				return dispatch({ type: types.EDIT_STAFF_SUCCESS,staff: res.data });
			}).then(() => {
				dispatch(editStaffDone());
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
	};
};

export const deleteStaffInit = () => {
	return {
		type: types.DELETE_STAFF_INIT
	};
};

export const deleteStaff = staffId => {
	return (dispatch) => {
		dispatch(loading());
		// const token = getState().auth.token;

		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		axios
			.delete(`staff/del/${staffId}`, config)
			.then(res => {
				return dispatch({ type: types.DELETE_STAFF_SUCCESS, staff:null });
			})
			.then(() => {
				dispatch(getStaffs());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};

