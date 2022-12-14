import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/auth/authAction';
import { getMonthShortName } from '../../utility/shortMonthName';
import { createToast } from '../../utility/toast';
import Cross from '../../_assets/icons/cross.png';
import { useNavigate } from 'react-router-dom';

// day of the month
const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

// months name
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Years 
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
// console.log(years);

const Register = ({ setRegister }) => {

    // navigate
    const navigate = useNavigate();

     // current data 
     const d = new Date();

    // input state
    const [input, setInput] = useState({
        fname: '',
        sname: '',
        numberOrMobile: '',
        password: '',
        day: d.getDate(),
        month: months[d.getMonth()],
        year: d.getFullYear(),
        gender: ''
    });

    // validation state
    const [validate, setValidate] = useState({
        fname: false,
        sname: false,
        numberOrMobile: false,
        password: false,
        day: false,
        month: false,
        year: false,
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
    
    // handle day validation by on focus
    const handleDayValidationByFocus = (e) => {

        setValidate({
            day: false
        });
        
    }
    
    // handle day validation by on focus
    const handleMonthValidationByFocus = (e) => {

        setValidate({
            month: false
        });
        
    }
    
    // handle month validation by on focus
    const handleYearValidationByFocus = (e) => {

        setValidate({
            year: false
        });
        
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

    // handle custom gender input box
    const handleCustomGender = (e) => {
        let custom_g = document.getElementById('gender_custom_input');

        if(e.target.value == 'Custom'){
            custom_g.style.visibility = 'visible';
        }else if(e.target.value == 'Male') {
            custom_g.style.visibility = 'hidden';
        }else if(e.target.value == 'Female') {
            custom_g.style.visibility = 'hidden';
        }
    }

    const dispatch = useDispatch();

    // Handle register form 
    const handleRegisterForm = (e) => {
        e.preventDefault();
        
        // validate input field is empty
        if( !input.fname || !input.sname || !input.numberOrMobile || !input.day || !input.month || !input.year || !input.gender ){
            createToast("All fields are required!");
        }else {
            dispatch(userRegister({
                first_name: input.fname,
                sur_name: input.sname,
                auth: input.numberOrMobile,
                password: input.password,
                birth_date: input.day,
                birth_month: input.month,
                birth_year: input.year,
                gender: input.gender
            }, setInput, e, setRegister, navigate));
        }

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
                <form onSubmit={ handleRegisterForm }>
                    <div className="reg-form reg-form-inline">
                        <p className='auth__input-p'>
                            <input type="text" className={ validate.fname && "error__border-color" } placeholder="First Name" name='fname' value={input.fname} onChange={ handleInput } onBlur={ handleInputValidation } onFocus={ handleFNameValidationByFocus } onKeyPress={ handleInputValidationByKeyPress } />
                            <p className='f__name' id='f__name'>What's your first name?<span></span></p>
                            <i className={ validate.fname && "fa fa-exclamation-circle" } aria-hidden="true"></i>
                        </p>
                        <p className='auth__input-p'>
                            <input type="text" className={ validate.sname && "error__border-color" } placeholder="Surname" name='sname' value={input.sname} onChange={ handleInput } onBlur={ handleInputValidation } onFocus={ handleSNameValidationByFocus }  onKeyPress={ handleInputValidationByKeyPress } />
                            <p className='s__name' id='s__name'>What's your sur name?<span></span></p>
                            <i className={ validate.sname && "fa fa-exclamation-circle" } aria-hidden="true"></i>
                        </p>
                    </div>
                    <div className="reg-form">
                        <p className='auth__input--p'>
                            <input type="text" className={ validate.numberOrMobile && "error__border-color" } placeholder="Mobile number or email address" name='numberOrMobile' value={input.numberOrMobile} onChange={ handleInput } onBlur={ handleInputValidation } onFocus={ handleMobileValidationByFocus }  onKeyPress={ handleInputValidationByKeyPress } />
                            <p className='m__name' id='m__name'>You'll use this when you log in and if you ever need to reset your password.<span></span></p>
                            <i className={ validate.numberOrMobile && "fa fa-exclamation-circle" } aria-hidden="true"></i>
                        </p>
                    </div>
                    <div className="reg-form">
                        <p className='auth__input--p'>
                            <input type="password" className={ validate.password && "error__border-color" } placeholder="New password" name='password' value={input.password} onChange={ handleInput } onBlur={ handleInputValidation } onFocus={ handlePasswordValidationByFocus }  onKeyPress={ handleInputValidationByKeyPress } />
                            <p className='p__name' id='p__name'>Enter a conbination of at least six numbers, letters and punctuation marks (such as ! and &).<span></span></p>
                            <i className={ validate.password && "fa fa-exclamation-circle" } aria-hidden="true"></i>
                        </p>
                    </div>
                    <div className="reg-form">
                    <span>Date of birth <i class="fa fa-question-circle" aria-hidden="true"></i></span> 
                    <div className="reg-form-select">
                        <select name="day" className={ validate.day && "error__border-color" } onBlur={ handleInputValidation } onChange={ handleInput } onFocus={ handleDayValidationByFocus } >
                            {
                                days.map( (item, index) => {
                                    return <option key={index} value={item} selected={d.getDate() == item ? true : false }  >{item}</option>
                                })
                            }
                        </select>
                        <select name="month" className={ validate.month && "error__border-color" } onChange={ handleInput } onBlur={ handleInputValidation } onChange={ handleInput } onFocus={ handleMonthValidationByFocus } >
                            {
                                months.map( (item, index) => (
                                    <option key={index} value={item} selected={getMonthShortName(d.getMonth() + 1) == item ? true : false }>{item}</option>
                                ))
                            }
                        </select>
                        <select name="year" className={ validate.year && "error__border-color" } onChange={ handleInput } onBlur={ handleInputValidation } onChange={ handleInput } onFocus={ handleYearValidationByFocus } >
                            {
                                years.map( (item, index) => (
                                    <option key={index} value={item} selected={item === input.year ? true : false }>{item}</option>
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
                            <input type="radio" name="gender" value="Female" onChange={ handleInput } onClick={ handleCustomGender } />
                        </label>
                        <label>
                            Male
                            <input type="radio" name="gender" value="Male" onChange={ handleInput } onClick={ handleCustomGender } />
                        </label>
                        <label>
                            Custom
                            <input type="radio" name="gender" value="Custom" onClick={ handleCustomGender } />
                        </label>
                    </div>
                    <div className="reg-form gender_custom">
                        <p className='auth__input--p'>
                            <input type="text" id='gender_custom_input' className='gender_custom_input' placeholder="Gender (optional)" name="gender" value={input.gender} onChange={ handleInput } />
                        </p>
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