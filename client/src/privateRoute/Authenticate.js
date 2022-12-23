import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Authenticate = ({ children }) => {
    const { loginState } = useSelector(state => state.auth);

    return loginState ? <Navigate to="/" /> : children 

};

export default Authenticate;