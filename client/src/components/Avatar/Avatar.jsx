import React from 'react';
import { useSelector } from 'react-redux';

const Avatar = () => {

    const { user } = useSelector((state) => state.auth);

  return (
    <>
        
        <img src={ user.profile_photo ? user.profile_photo : (user.gender == "Male" ? 'https://www.w3schools.com/bootstrap4/img_avatar1.png' : 'https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_female_user-512.png') } alt="" />
    </>
  )
};

export default Avatar;