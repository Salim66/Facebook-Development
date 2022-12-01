import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '../../_assets/icons/facebook.svg';

const ResetHeader = () => {
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
                <Link to="/forgot">Forgotten account?</Link>
                </div>
            </div>
        </div>
    </>
  )
};

export default ResetHeader;