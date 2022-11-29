import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import FacebookIcon from '../../_assets/icons/facebook.svg';
import Cookie from 'js-cookie';
import { createToast } from '../../utility/toast';
import { activationByOTP } from '../../redux/auth/authAction';
import { useDispatch } from 'react-redux';

const Activation = () => {

    // navigator
    const navigate = useNavigate();
    // use dispatch
    const dispatch = useDispatch();

    // use state for virify code
    const [ code, setCode ] = useState();

    // get cookie 
    const user_activation_email = Cookie.get('otp');
    
    useEffect(() => {
        if(!user_activation_email){
            navigate('/login');
        }
    });

    // handle activation cancel
    const handleActivationCancel = (e) => {
        e.preventDefault();
        Cookie.remove('otp');
        navigate('/login');
    }

    // handle continue code
    const handleContinueCode = (e) => {
        e.preventDefault();
        if(!code) {
            createToast("Set a OTP code first", 'warn');
        }else {
            dispatch(
                activationByOTP(code, navigate)
            );
        }
    }

  return (
    <>
        <div className="reset-header">
            <div className="reset-header-wraper">
                <div className="reset-logo">
                <img src={ FacebookIcon } alt="" />
                </div>
                <div className="login-part">
                <input type="text" placeholder="Email or mobile number" />
                <input type="text" placeholder="Password" />
                <button>Log In</button>
                <a href="#">Forgotten account?</a>
                </div>
            </div>
        </div>

        <div className="reset-area">
            <div className="reset-wraper">
                <div className="reset-box">
                <div className="reset-box-header">
                    <span className="title">Enter security code</span>
                </div>
                <div className="reset-body">
                    <p>
                    Please check your emails for a message with your code. Your code
                    is 6 numbers long.
                    </p>
                    <div className="code-box">
                    <input type="text" name='code' onChange={ (e) => setCode(e.target.value) } />
                    <div className="code-text">
                        <span>We sent your code to:</span>
                        <span>{ user_activation_email }</span>
                    </div>
                    </div>
                </div>
                <div className="reset-footer">
                    <a href="#">Didn't get a code?</a>
                    <div className="reset-btns">
                    <a onClick={ handleActivationCancel } className="cancel" href="#">Cancel</a>
                    <a onClick={ handleContinueCode } className="continue" href="#">Continue</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <Footer />
        
    </>
  )
};

export default Activation;