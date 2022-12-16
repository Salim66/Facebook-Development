import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ResetHeader from '../../components/ResetHeader/ResetHeader';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/auth/authAction';
import cookie from 'js-cookie';

const Password = () => {

    // local state
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handle change password
    const handleChangePassword = (e) => {
        e.preventDefault();
        dispatch(changePassword({
            id: cookie.get('cpid'),
            code: cookie.get('cpcode'),
            password
        }, navigate));
    };

  return (
    <>
        <ResetHeader />

        <div class="reset-area">
            <div class="reset-wraper">
                <div class="reset-box">
                <div class="reset-box-header">
                    <span class="title">Choose a new password</span>
                </div>
                <div class="reset-body">
                    <p>
                    Create a new password that is at least 6 characters long. A strong
                    password has a combination of letters, digits and punctuation
                    marks.
                    </p>
                    <div class="code-box">
                    <input class="w-100" name='password' value={ password } onChange={ (e) => setPassword(e.target.value) } type="text" placeholder="New password" />
                    </div>
                </div>
                <div class="reset-footer">
                    <a href="#"></a>
                    <div class="reset-btns">
                    <Link class="cancel" to="/login">Skip</Link>
                    <a onClick={ handleChangePassword } class="continue" href="#">Continue</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <Footer />
    </>
  )
};

export default Password;