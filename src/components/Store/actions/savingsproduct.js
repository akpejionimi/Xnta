import axios from "../../utils/axios-base";
import * as types from "./types";
import * as dateFns from 'date-fns';

export const loading = () => {
	return {
		type: types.LOADING
	};
};

export const getSavingsProductSuccess = savingsProducts => {
	return {
		type: types.GET_SAVINGS_PRODUCT_SUCCESS,
		savingsProducts
	};
};


export const errorOccured = error => {
	return {
		type: types.ERROR_OCCURED,
		error
	};
};

export const getSavingsProduct = () => {
	return dispatch => {
		dispatch(loading());
		axios
			.get("/savings-product")
 			.then(res => {
				dispatch(getSavingsProductSuccess(res.data));
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
	};
};


export const getSingleSavingsProduct = productId => {
	return dispatch => {
		dispatch(loading());
		axios
			.get(`/savings-product/${productId}`)
			.then(res => {	
                // console.log(res);
				res.data.createdAt = dateFns.format(res.data.createdAt, 'DD-MM-YYYY')
				res.data.updatedAt = dateFns.format(res.data.updatedAt, 'DD-MM-YYYY')
				dispatch({ type: types.GET_SINGLE_SAVINGS_SUCCESS, savingsProduct: res.data });
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};
export const editSavingsProductInit = productId => {
	return (dispatch, getState) => {
		dispatch(loading());
			const config = {
			headers: {"Content-Type": "application/json"}
		};
		axios
			.get(`/savings-product/edit/${productId}`,config)
			.then(res => {
					dispatch({ type: types.EDIT_SAVINGS_PRODUCT_INIT, savingsProduct: res.data });
				
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};

export const editSavingsProductDone= () => {
	return {
		type: types.EDIT_SAVINGS_PRODUCT_DONE
	};
};

export const editSavingsProduct = (savingsProductData) => {
	return (dispatch, getState) => {
		dispatch(loading());
		const productId = getState().savingsProduct.savingsProduct.productId;

		const config = {
			headers: {"Content-Type": "application/json"}
		};
		axios
			.put(`savings-product/edit/${productId}`, savingsProductData, config)
			.then(res => {
				return dispatch({ type: types.EDIT_SAVINGS_PRODUCT_SUCCESS, savingsProduct: res.data });
			}).then(() => {
				dispatch(editSavingsProductDone());
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
	};
};

export const addSavingsProductInit = () => {
	return {
		type: types.ADD_SAVINGS_PRODUCT_INIT
	};
};

export const addSavingsProduct =  savingsProductData => {
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
			.post("/savings-product", savingsProductData, config)
			.then(res => {
                console.log(res);
                
				return dispatch({ type: types.ADD_SAVINGS_PRODUCT_SUCCESS, savingsProduct: res.data});
			})
			.then(() => {
				dispatch(addSavingsProductInit());
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
			
			
	};
};

export const deleteCustomerInit = () => {
	return {
		type: types.DELETE_CUSTOMER_INIT
	};
};

export const deleteSavingsProduct = productId => {
	return (dispatch) => {
		dispatch(loading());
		// const token = getState().auth.token;

		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		axios
			.delete(`savings-product/del/${productId}`, config)
			.then(res => {
				return dispatch({ type: types.DELETE_SAVINGS_PRODUCT_SUCCESS, savingsProduct:null });
			})
			.then(() => {
				dispatch(getSavingsProduct());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};
