import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../redux/auth/authAction';
import { createToast } from '../../utility/toast';

const Login = ({ setRegister }) => {

    const [input, setInput] = useState({
        auth: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInput = (e) => {
        setInput((preveState) => ({
            ...preveState,
            [e.target.name] : e.target.value
        }))
    }

    const handleLoginForm = (e) => {
        e.preventDefault();
        if(!input.auth || !input.password){
            createToast("All fields are required!");
        }else {
            dispatch(userLogin({ auth: input.auth, password: input.password }, navigate));
        }
    }

  return (
    <>
        <div className="auth-box">
            <form onSubmit={handleLoginForm}>
                <div className="auth-form">
                    <input
                    type="text"
                    name='auth'
                    value={input.auth}
                    onChange={handleInput}
                    placeholder="Email address or phone number"
                    />
                </div>
                <div className="auth-form">
                    <input type="password" name='password' value={input.password} onChange={handleInput} placeholder="Password" />
                </div>
                <div className="auth-form">
                    <button type="submit">Log In</button>
                </div>
            </form>

            <Link to="/forgot">Forgotten password?</Link>

            <div className="divider"></div>

            <button onClick={ () => setRegister(true) }>Create New Account</button>
        </div>
    </>
  )
};

export default Login;