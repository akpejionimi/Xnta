import axios from "../../utils/axios-base";
import * as types from "./types";
import * as dateFns from 'date-fns';

export const loading = () => {
	return {
		type: types.LOADING
	};
};

export const getCustomersSuccess = customers => {
	return {
		type: types.GET_CUSTOMERS_SUCCESS,
		customers
	};
};


export const errorOccured = error => {
	return {
		type: types.ERROR_OCCURED,
		error
	};
};

export const getCustomers = () => {
	return dispatch => {
		dispatch(loading());
		axios
			.get("/customer")
 			.then(res => {
				dispatch(getCustomersSuccess(res.data));
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
	};
};


export const getSingleCustomer = customerId => {
	return dispatch => {
		dispatch(loading());
		axios
			.get(`/customer/${customerId}`)
			.then(res => {	
				res.data.registrationDate = dateFns.format(res.data.registrationDate, 'DD-MM-YYYY')
				res.data.entryDate = dateFns.format(res.data.entryDate, 'DD-MM-YYYY')
				res.data.createdAt = dateFns.format(res.data.createdAt, 'DD-MM-YYYY')
				res.data.updatedAt = dateFns.format(res.data.updatedAt, 'DD-MM-YYYY')
				dispatch({ type: types.GET_SINGLE_CUSTOMER_SUCCESS, customer: res.data });
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};
export const editCustomerInit = customerId => {
	return (dispatch, getState) => {
		dispatch(loading());
			const config = {
			headers: {"Content-Type": "application/json"}
		};
		axios
			.get(`/customer/edit/${customerId}`,config)
			.then(res => {
					res.data.entryDate = dateFns.format(res.data.entryDate, 'YYYY-MM-DD')
					res.data.registrationDate = dateFns.format(res.data.registrationDate, 'YYYY-MM-DD')
					dispatch({ type: types.EDIT_CUSTOMER_INIT, customer: res.data });
				
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};

export const editCustomerDone= () => {
	return {
		type: types.EDIT_CUSTOMER_DONE
	};
};

export const editCustomer = (customerData) => {
	return (dispatch, getState) => {
		dispatch(loading());
		const customerId = getState().customer.customer.customerId;

		const config = {
			headers: {"Content-Type": "application/json"}
		};
		axios
			.put(`customer/edit/${customerId}`, customerData, config)
			.then(res => {
				return dispatch({ type: types.EDIT_CUSTOMER_SUCCESS,customer: res.data });
			}).then(() => {
				dispatch(editCustomerDone());
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
	};
};

export const addCustomerInit = () => {
	return {
		type: types.ADD_CUSTOMER_INIT
	};
};

export const addCustomer = customerData => {
	return (dispatch, getState) => {
		dispatch(loading());
		const token = getState().auth.token;

		// Headers
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		// If token, add to headers
		if (token) {
			config.headers["x-access-token"] = token;
		}
		axios
			.post("/customer", customerData, config)
			.then(res => {
				return dispatch({ type: types.ADD_CUSTOMER_SUCCESS });
			})
			.then(() => {
				dispatch(addCustomerInit());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
			
			
	};
};

	

// export const addCustomer = customerData => {
// 	return (dispatch, getState) => {
//         dispatch(loading());
// 		// const token = getState().auth.token;
// 		let formData = null;

// 		const config = {
// 			headers: {}
// 		};
// 			// config.headers["x-access-token"] = token;
// 			config.headers["Content-Type"] = "application/json";
// 			formData = new FormData();
//             formData.append("fullName", customerData.fullName);
//             // formData.append("registrationDate", customerData.registrationDate)
//             // formData.append("entryDate", customerData.entryDate)
// 			formData.append("email", customerData.email);
// 			formData.append("phonNo", customerData.phoneNo);
// 			// formData.append("image", customereData.image);
// 		axios
// 			.post("/customer/", formData, config)
// 			.then(res => {
// 				return dispatch({ type: types.ADD_CUSTOMER_SUCCESS });
// 			})
// 			.then(() => {
// 				dispatch(addCustomerInit());
// 			})
// 			.catch(err => dispatch(errorOccured(err.response.data)));
// 	};
// };

// export const editCustomerInit = recipeId => {
// 	return (dispatch, getState) => {
// 		const token = getState().auth.token;
// 		const userId = getState().auth.userId;

// 		const config = {
// 			headers: {}
// 		};

// 		if (token) {
// 			config.headers["x-access-token"] = token;
// 		}

// 		axios
// 			.get(`recipe/edit/${recipeId}`, config)
// 			.then(res => {
// 				// eslint-disable-next-line
// 				if (res.data.userId != userId) {
// 					console.log("recipe userId dont match");
// 				} else {
// 					// console.log(res.data)
// 					dispatch({ type: types.EDIT_RECIPE_INIT, recipe: res.data });
// 				}
// 			})
// 			.catch(err => dispatch(errorOccured(err)));
// 	};
// };

// export const editRecipeDone= () => {
// 	return {
// 		type: types.EDIT_RECIPE_DONE
// 	};
// };

// export const editRecipe = (recipeData) => {
// 	return (dispatch, getState) => {
// 		dispatch(loading());
// 		const token = getState().auth.token;
// 		const recipeId = getState().recipe.recipe.id;
// 		let formData = null;

// 		const config = {
// 			headers: {}
// 		};

// 		if (token) {
// 			config.headers["x-access-token"] = token;
// 			config.headers["Content-Type"] = "multipart/form-data";
// 			formData = new FormData();
// 			formData.append("title", recipeData.title);
// 			formData.append("description", recipeData.description);
// 			formData.append("categoryId", recipeData.categoryId);
// 			formData.append("image", recipeData.image);
// 		}
// 		axios
// 			.put(`recipe/edit/${recipeId}`, formData, config)
// 			.then(res => {
// 				return dispatch({ type: types.EDIT_RECIPE_SUCCESS });
// 			}).then(() => {
// 				dispatch(editRecipeDone());
// 			})
// 			.catch(err => dispatch(errorOccured(err.response.data)));
// 	};
// };

export const deleteCustomerInit = () => {
	return {
		type: types.DELETE_CUSTOMER_INIT
	};
};

export const deleteCustomer = customerId => {
	return (dispatch) => {
		dispatch(loading());
		// const token = getState().auth.token;

		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		axios
			.delete(`customer/del/${customerId}`, config)
			.then(res => {
				return dispatch({ type: types.DELETE_CUSTOMER_SUCCESS, customer:null });
			})
			.then(() => {
				dispatch(getCustomers());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};
