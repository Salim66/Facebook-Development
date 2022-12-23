import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
    const { loginState } = useSelector(state => state.auth);

    return loginState ? children : <Navigate to="/login" /> 

};

export default RedirectIfAuthenticated;