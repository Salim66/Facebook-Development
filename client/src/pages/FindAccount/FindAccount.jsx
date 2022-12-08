import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ResetHeader from '../../components/ResetHeader/ResetHeader';
import User from '../../_assets/images/user.png';
import Cookie from 'js-cookie';
import { hideMobileOrEmail } from '../../utility/helper';
import { createToast } from '../../utility/toast';

const FindAccount = () => {

    // local state
    const [findUser, setFindUser] = useState({
        name: "",
        email: "",
        mobile: "",
        photo: ""
    });
    const navigate = useNavigate();

    // handle not you
    const handleNotYou = (e) => {
        e.preventDefault();
        Cookie.remove('findUser');
        navigate('/forgot');
    }

    useEffect(() => {
      const userData = JSON.parse(Cookie.get('findUser')) || null;
      setFindUser((prevData) => ({
        ...userData
      }))
    }, [])

    // send password reset link
    const handlePasswordResetLink = async (e) => {
        e.preventDefault();
        await axios.post('/api/v1/user/send-password-reset-link', {
            auth: findUser.email ?? findUser.mobile 
        })
        .then(res => {
            createToast(res.data.message, 'success');
            navigate('/activation');
        })
        .catch(error => {
            createToast(error.response.data.message);
        })
    }

  return ( 
    <>
        <ResetHeader />

        <div className="reset-area">
            <div className="reset-wraper">
                <div className="reset-box">
                <div className="reset-box-header">
                    <span className="title">Reset your password</span>
                </div>
                <div className="reset-body">
                    <div className="find-user-account">
                    <img src={ findUser.photo ? findUser.photo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png' } alt="" />
                    <span>{ findUser.name }</span>
                    { findUser.email && (
                        <p>Email : { hideMobileOrEmail(findUser.email) }</p>
                    )}
                    { findUser.mobile && (
                        <p>Mobile : { hideMobileOrEmail(findUser.mobile) }</p>
                    )}
                    <p>To reset your account password, please continue</p>
                    </div>
                </div>
                <div className="reset-footer">
                    <a href="#"></a>
                    <div className="reset-btns">
                    <a onClick={handleNotYou} className="cancel" href='#'>Not you ?</a>
                    <a onClick={handlePasswordResetLink} className="continue" href="#">Continue</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <Footer />
    </>
  )
};

export default FindAccount;