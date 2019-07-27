import axios from '../../utils/axios-base';
import * as types from './types';

export const authStart = () => ({
    type: types.AUTH_START
});

export const authSuccess = (token, userId) => ({
    type: types.AUTH_SUCCESS,
    token, 
    userId
});

export const authFailed = error => ({
    type: types.AUTH_FAILED,
    error
});

// Notice: We only export action creators that would be used outside this file
// eg: in components.
// auth() is used for both login and regitration
export const auth = authData => (dispatch, getState) => {
	dispatch(authStart());
	const isLogin = getState().auth.isLogin;
	let endPoint = null;
	let formData = null;
	const config = {
		headers: {}
	};
	if (!isLogin) {
		// We set this header because we want our request to process
		// files via uploads through a form
		config.headers["Content-Type"] = "multipart/form-data";
		endPoint = "user";
		// FormData() is a js interface that helps you construct key/value
		// pairs from your form fields.
		// You use this becuase content-type of application/json can't handle
		// file fields. Remember JSON is just good old objects with plain text data.
        // This is useful when uploading files via fetch() or axios();
        console.log(authData);
		formData = new FormData();
		formData.append("username", authData.userName);
		formData.append("email", authData.email);
		formData.append("password", authData.password);
        // formData.append("imageUrl", authData.imageUrl);
        formData.append("phoneNo", authData.phoneNo);
	} else {
		// If it is login, we can set our headers back to application/json
		config.headers["Content-Type"] = "application/json";
		endPoint = "login";
		formData = authData;
	}
	axios
		.post("/" + endPoint, formData, config)
		.then(res => {
			const { token, user } = res.data;
			const userId = user.id;
			localStorage.setItem("token", token);
			localStorage.setItem("userId", userId);
			dispatch(authSuccess(token, userId, user));
			
		})
		.catch(err => dispatch(authFailed(err.response.data)));
};



export const toggleAuth = () => ({
	type: types.TOGGLE_AUTH
});

export const logout = () => ({
	type: types.LOGOUT_SUCCESS
});

//Auto login user when the token is still valid

export const authAutoLogin = () => (dispatch, getState) => {
	const { token, userId } = getState().auth;;
	if (!token) {
		dispatch(logout());
	} else {
		dispatch(authSuccess(token, userId));
	}
};