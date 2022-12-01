import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ResetHeader from '../../components/ResetHeader/ResetHeader';
import User from '../../_assets/images/user.png';

const FindAccount = () => {
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
                    <img src={ User } alt="" />
                    <span>Asraful Haque</span>
                    <p>To reset your account password, please continue</p>
                    </div>
                </div>
                <div class="reset-footer">
                    <a href="#"></a>
                    <div class="reset-btns">
                    <Link class="cancel" to="/login">Not you ?</Link>
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