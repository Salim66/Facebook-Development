import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Cookie from 'js-cookie';
import { createToast } from '../../utility/toast';
import { activationByOTP, resendActivationLink } from '../../redux/auth/authAction';
import { useDispatch } from 'react-redux';
import ResetHeader from '../../components/ResetHeader/ResetHeader';

const Activation = () => {

    const { type } = useParams();

    // navigator
    const navigate = useNavigate();
    // use dispatch
    const dispatch = useDispatch();

    // use state for virify code
    const [ code, setCode ] = useState();

    // get cookie 
    const auth = Cookie.get('otp');
    
    useEffect(() => {
        if(!auth){
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
            createToast("OTP code is required!", 'warn');
        }else {
            dispatch(
                activationByOTP(code, auth, navigate)
            );
        }
    }

    // handle resend code
    const handleResendCode = (e) => {
        e.preventDefault();
        dispatch(
            resendActivationLink(auth)
        )
    }

    // handle reset password
    const handleResetPassword = (e) => {
        e.preventDefault();
        alert("Reset Pass");
    }

  return (
    <>
        <ResetHeader />

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
                        <span>{ auth }</span>
                    </div>
                    </div>
                </div>
                <div className="reset-footer">
                    <a onClick={ handleResendCode } href="#">Didn't get a code?</a>
                    <div className="reset-btns">
                    <a onClick={ handleActivationCancel } className="cancel" href="#">Cancel</a>
                    <a onClick={ type == 'account' ? handleContinueCode : handleResetPassword } className="continue" href="#">Continue</a>
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