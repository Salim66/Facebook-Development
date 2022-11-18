import React from 'react';
import Cross from '../../_assets/icons/cross.png';

const Register = ({ setRegister }) => {
  return (
    <>
        <div className="blur-box">
            <div className="sign-up-card">
                <div className="sign-up-header">
                <div className="sign-up-content">
                    <span>Sign Up</span>
                    <span>It's quick and easy.</span>
                </div>
                <button><img src={ Cross } alt="" onClick={ () => setRegister(false) } /></button>
                </div>
                <div className="sign-up-body">
                <form action="">
                    <div className="reg-form reg-form-inline">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Surname" />
                    </div>
                    <div className="reg-form">
                    <input type="text" placeholder="Mobile number or email address" />
                    </div>
                    <div className="reg-form">
                    <input type="text" placeholder="New password" />
                    </div>
                    <div className="reg-form">
                    <span>Date of birth</span>
                    <div className="reg-form-select">
                        <select name="" id="">
                        <option value="">Day</option>
                        </select>
                        <select name="" id="">
                        <option value="">Month</option>
                        </select>
                        <select name="" id="">
                        <option value="">Year</option>
                        </select>
                    </div>
                    </div>

                    <div className="reg-form">
                    <span>Gender</span>
                    <div className="reg-form-select">
                        <label>
                        Female
                        <input type="radio" name="gender" />
                        </label>
                        <label>
                        Male
                        <input type="radio" name="gender" />
                        </label>
                        <label>
                        Custom
                        <input type="radio" name="gender" />
                        </label>
                    </div>
                    </div>

                    <div className="reg-form">
                    <p>
                        People who use our service may have uploaded your contact
                        information to Facebook. <a href="#">Learn more.</a>
                    </p>
                    </div>
                    <div className="reg-form">
                    <p>
                        By clicking Sign Up, you agree to our <a href="#">Terms</a>,
                        <a href="#">Privacy Policy</a> and
                        <a href="#">Cookies Policy</a>. You may receive SMS
                        notifications from us and can opt out at any time.
                    </p>
                    </div>

                    <div className="reg-form">
                    <button>Sign Up</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </>
  )
};

export default Register;