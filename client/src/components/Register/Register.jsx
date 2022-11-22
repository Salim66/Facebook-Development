import React from 'react';
import { useState } from 'react';
import Cross from '../../_assets/icons/cross.png';

// day of the month
const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

// months name
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nav", "Dec"];

// Years 
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
console.log(years);

const Register = ({ setRegister }) => {

    // input state
    const [input, setInput] = useState({
        fname: '',
        sname: '',
        numberOrMobile: '',
        password: '',
        day: '',
        month: '',
        year: '',
        gender: ''
    });

    // validation state
    const [validate, setValidate] = useState({
        fname: false,
        sname: false,
        numberOrMobile: false,
        password: false,
        gender: false
    });

    // hanlde input
    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    }


    // handle input validation by on blur
    const handleInputValidation = (e) => {
        const fieldName = e.target.name;

        let f_name_data = document.getElementById('f__name');
        let s_name_data = document.getElementById('s__name');
        let m_name_data = document.getElementById('m__name');
        let p_name_data = document.getElementById('p__name');

        if( !input[fieldName] ) {
            setValidate((prevState) => ({
                ...prevState,
                [fieldName]: true
            }));

            
            f_name_data.style.visibility = 'hidden';
            s_name_data.style.visibility = 'hidden';
            m_name_data.style.visibility = 'hidden';
            p_name_data.style.visibility = 'hidden';

        }else {
            setValidate((prevState) => ({
                ...prevState,
                [fieldName]: false
            }));
            f_name_data.style.visibility = 'hidden';
        }
    }

    // handle input validation by on focus
    // const handleInputValidationByFocus = (e) => {
    //     const fieldName = e.target.name;

    //     setValidate((prevState) => ({
    //         ...prevState,
    //         [fieldName]: false
    //     }));
        
    //     let f_name_data = document.getElementById('f__name');

    //     if(!validate.fname){
    //         f_name_data.style.visibility = 'visible';
    //     }else {
    //         f_name_data.style.visibility = 'visible';
    //     }
    // }

    
    // handle fname validation by on focus 
    const handleFNameValidationByFocus = (e) => {

        setValidate({
            fname: false
        });

        let f_name_data = document.getElementById('f__name');

        if(!validate.fname && !input.fname){
            f_name_data.style.visibility = 'visible';
        }else if(!input.fname){
            f_name_data.style.visibility = 'visible';
        }else {
            f_name_data.style.visibility = 'hidden';
        }

    }
    
    // handle sname validation by on focus
    const handleSNameValidationByFocus = (e) => {

        setValidate({
            sname: false
        });
        
        let s_name_data = document.getElementById('s__name');

        if(!validate.sname && !input.sname){
            s_name_data.style.visibility = 'visible';
        }else if(!input.sname){
            s_name_data.style.visibility = 'visible';
        }else {
            s_name_data.style.visibility = 'hidden';
        }

    }
    
    // handle numberOrMobile validation by on focus
    const handleMobileValidationByFocus = (e) => {

        setValidate({
            numberOrMobile: false
        });
        
        let m_name_data = document.getElementById('m__name');

        if(!validate.numberOrMobile && !input.numberOrMobile){
            m_name_data.style.visibility = 'visible';
        }else if(!input.numberOrMobile){
            m_name_data.style.visibility = 'visible';
        }else {
            m_name_data.style.visibility = 'hidden';
        }

    }
    
    // handle password validation by on focus
    const handlePasswordValidationByFocus = (e) => {

        setValidate({
            password: false
        });
        
        let p_name_data = document.getElementById('p__name');

        if(!validate.password && !input.password){
            p_name_data.style.visibility = 'visible';
        }else if(!input.password){
            p_name_data.style.visibility = 'visible';
        }else {
            p_name_data.style.visibility = 'hidden';
        }
    }

    // hamdle input validation by key press
    const handleInputValidationByKeyPress = (e) => {
        let f_name_data = document.getElementById('f__name');
        let s_name_data = document.getElementById('s__name');
        let m_name_data = document.getElementById('m__name');
        let p_name_data = document.getElementById('p__name');
        f_name_data.style.visibility = 'hidden';
        s_name_data.style.visibility = 'hidden';
        m_name_data.style.visibility = 'hidden';
        p_name_data.style.visibility = 'hidden';
    }

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
                        <p className='auth__input-p'>
                            <input type="text" className={ validate.fname && "error__border-color" } placeholder="First Name" name='fname' value={input.fname} onChange={ handleInput } onBlur={ handleInputValidation } onFocus={ handleFNameValidationByFocus } onKeyPress={ handleInputValidationByKeyPress } />
                            <p className='f__name' id='f__name'>What's your first name?<span></span></p>
                        </p>
                        <p className='auth__input-p'>
                            <input type="text" className={ validate.sname && "error__border-color" } placeholder="Surname" name='sname' value={input.sname} onChange={ handleInput } onBlur={ handleInputValidation } onFocus={ handleSNameValidationByFocus }  onKeyPress={ handleInputValidationByKeyPress } />
                            <p className='s__name' id='s__name'>What's your sur name?<span></span></p>
                        </p>
                    </div>
                    <div className="reg-form">
                        <p className='auth__input--p'>
                            <input type="text" className={ validate.numberOrMobile && "error__border-color" } placeholder="Mobile number or email address" name='numberOrMobile' value={input.numberOrMobile} onChange={ handleInput } onBlur={ handleInputValidation } onFocus={ handleMobileValidationByFocus }  onKeyPress={ handleInputValidationByKeyPress } />
                            <p className='m__name' id='m__name'>You'll use this when you log in and if you ever need to reset your password.<span></span></p>
                        </p>
                    </div>
                    <div className="reg-form">
                        <p className='auth__input--p'>
                            <input type="password" className={ validate.password && "error__border-color" } placeholder="New password" name='password' value={input.password} onChange={ handleInput } onBlur={ handleInputValidation } onFocus={ handlePasswordValidationByFocus }  onKeyPress={ handleInputValidationByKeyPress } />
                            <p className='p__name' id='p__name'>Enter a conbination of at least six numbers, letters and punctuation marks (such as ! and &).<span></span></p>
                        </p>
                    </div>
                    <div className="reg-form">
                    <span>Date of birth</span>
                    <div className="reg-form-select">
                        <select name="day" id="" onChange={ handleInput } >
                            {
                                days.map( item => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </select>
                        <select name="month" id="" onChange={ handleInput } >
                            {
                                months.map( item => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </select>
                        <select name="year" id="" onChange={ handleInput } >
                            {
                                years.map( item => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    </div>

                    <div className="reg-form">
                    <span>Gender</span>
                    <div className="reg-form-select">
                        <label>
                            Female
                            <input type="radio" name="gender" value="Female" onChange={ handleInput } />
                        </label>
                        <label>
                            Male
                            <input type="radio" name="gender" value="Male" onChange={ handleInput } />
                        </label>
                        <label>
                            Custom
                            <input type="radio" name="gender" value="Custom" onChange={ handleInput } />
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
                        <button type='submit'>Sign Up</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </>
  )
};

export default Register;