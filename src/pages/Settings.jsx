import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/core/HomePage/Button';
import { AiFillAccountBook } from 'react-icons/ai';
import {FiUpload} from "react-icons/fi"
import UpdateProfilePhoto from '../components/core/Dashboard/Settings/UpdateProfilePhoto';
import EditProfile from '../components/core/Dashboard/Settings/EditProfile';
import UpdatePassword from '../components/core/Dashboard/Settings/UpdatePassword';
import DeleteProfile from '../components/core/Dashboard/Settings/DeleteProfile';

const Settings = () => {

    
  return (
    <div className='text-richblack-5 font-inter w-full flex flex-col gap-y-5 mt-[100px]'>
        <h1 className='text-3xl mb-5 font-semibold'>
            Edit Profile
        </h1>
        <UpdateProfilePhoto/>
        <EditProfile/>
        <UpdatePassword/>
        <DeleteProfile/>
    </div>
  )
}

export default Settings