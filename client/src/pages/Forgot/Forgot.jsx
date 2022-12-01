import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ResetHeader from '../../components/ResetHeader/ResetHeader';

const Forgot = () => {
  return (
    <>
        <ResetHeader />

        <div class="reset-area">
            <div class="reset-wraper">
                <div class="reset-box">
                <div class="reset-box-header">
                    <span class="title">Find Your Account</span>
                </div>
                <div class="reset-body">
                    <p>
                    Please enter your email address or mobile number to search for
                    your account.
                    </p>
                    <div class="code-box">
                    <input
                        class="w-100"
                        type="text"
                        placeholder="Email address or mobile number"
                    />
                    </div>
                </div>
                <div class="reset-footer">
                    <a href="#"></a>
                    <div class="reset-btns">
                    <Link class="cancel" to="/login">Cancel</Link>
                    <a class="continue" href="/find-account">Search</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <Footer />
    </>
  )
};

export default Forgot;