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
            navigate('/activation');
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
export const activationByOTP = (code, navigate) => async (dispatch) => {
    try {
        const action = await axios.post('/api/v1/user/code-activate', { code: code })
        .then(res => {
            createToast('Account activation successful, please login', 'success');
            navigate('/login');
        })
        .catch(error => {
            createToast(error.response.data.message);
        })
    } catch (error) {
        createToast(error.response.data.message);
    }
}