import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ResetHeader from '../../components/ResetHeader/ResetHeader';
import User from '../../_assets/images/user.png';
import Cookie from 'js-cookie';
import { hideMobileOrEmail } from '../../utility/helper';

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


  return ( 
    <>
        <ResetHeader />

        <div class="reset-area">
            <div class="reset-wraper">
                <div class="reset-box">
                <div class="reset-box-header">
                    <span class="title">Reset your password</span>
                </div>
                <div class="reset-body">
                    <div class="find-user-account">
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
                <div class="reset-footer">
                    <a href="#"></a>
                    <div class="reset-btns">
                    <a onClick={handleNotYou} class="cancel" href='#'>Not you ?</a>
                    <a class="continue" href="/password">Continue</a>
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