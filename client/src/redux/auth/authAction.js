import axios from 'axios';
import { createToast } from '../../utility/toast';
import { REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from './authActionType';

// create register action
export const userRegister = (data, setInput, e, setRegister, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_REQUEST
        })
        await axios.post('/api/v1/user/register', data)
        .then(res => {
            createToast(res.data.message, 'success');
            setInput({
                fname: '',
                sname: '',
                numberOrMobile: '',
                password: '',
                day: '',
                month: '',
                year: '',
                gender: ''
            });
            e.target.reset();
            setRegister(false);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.message
            })
            navigate('/activation/account');
        })
        .catch(error => {
            createToast(error.response.data.message, 'error');
            dispatch({
                type: REGISTER_FAILED,
                payload: error.response.data
            })
        })


    } catch (error) {
        createToast(error.response.data.message, 'error');
        dispatch({
            type: REGISTER_FAILED,
            payload: error.response.data
        })
    }
}

// create activation account by OTP
export const activationByOTP = (code, auth, navigate) => async (dispatch) => {
    try {
        const action = await axios.post('/api/v1/user/code-activate', { code: code, auth: auth })
        .then(res => {
            createToast('Account activation successful, please login', 'success');
            navigate('/login');
        })
        .catch(error => {
            createToast(error.response.data.message, 'warn');
        })
    } catch (error) {
        createToast(error.response.data.message);
    }
}

// create resend activation link
export const resendActivationLink = ( auth ) => async (dispatch) => {
    try {
        const action = await axios.post('/api/v1/user/resend-code-activate', { auth: auth })
        .then(res => {
            createToast(res.data.message, 'success');
        })
        .catch(error => {
            createToast(error.response.data.message);
        })
    } catch (error) {
        createToast(error.response.data.message);
    }
}

// create check reset password otp
export const checkPasswordResetOTP = (code, auth, navigate) => async (dispatch) => {
    try {
        const action = await axios.post('/api/v1/user/check-password-reset-link', { code: code, auth: auth })
        .then(res => {
            createToast(res.data.message, 'success');
            navigate('/change-password');
        })
        .catch(error => {
            createToast(error.response.data.message, 'warn');
        })
    } catch (error) {
        createToast(error.response.data.message);
    }
}

// create change password with requst to forget password
export const changePassword = (data, navigate) => async (dispatch) => {
    try {
        await axios.post('/api/v1/user/user-password-reset', { id: data.id, code: data.code, password: data.password })
        .then(res => {
            createToast(res.data.message, 'success');
            navigate('/login');
        })
        .catch(error => {
            createToast(error.response.data.message, 'warn');
        })
    } catch (error) {
        createToast(error.response.data.message);
    }
}

// create user login 
export const userLogin = (data, navigate) => async (dispatch) => {
    try {
        await axios.post('/api/v1/user/login', { auth: data.auth, password: data.password })
        .then(res => {
            createToast(res.data.message, 'success');
            navigate('/');
        })
        .catch(error => {
            createToast(error.response.data.message, 'warn');
        })
    } catch (error) {
        createToast(error.response.data.message);
    }
}