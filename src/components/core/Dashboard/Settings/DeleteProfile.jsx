import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {RiDeleteBinLine} from "react-icons/ri"
import { deleteAccount } from '../../../../services/operations/settingsAPI';

const DeleteProfile = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClick(){
        try{
            dispatch(deleteAccount(token,navigate));
        }
        catch(err){
            console.log("CANNOT DELETE PROFILE...",err);
        }
    }

  return (
    <div className='w-full flex font-inter bg-pink-900 rounded-lg border-[1px] border-pink-700 p-[24px] gap-x-[19px]'>
        {/* delete icon */}
        <div className='flex items-center justify-center w-[52px] h-[52px] rounded-full bg-pink-700'>
            <RiDeleteBinLine className='text-pink-200 w-[24px] h-[24px]'/>
        </div>

        {/* text */}
        <div className='flex flex-col gap-y-3 items-start'>
            <p className='font-bold text-lg text-pink-5'>Delete Account</p>
            <div className='flex flex-col gap-y-[2px] text-pink-25 font-medium leading-[22px]'>
                <span className='block'>Would you like to delete account?</span>
                <span className='block w-[600px]'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</span>
            </div>
            <button className='cursor-pointer transition-all duration-200
            italic text-pink-300 font-medium text-[16px] leading-[24px]' onClick={handleClick}>I want to delete my account.</button>
        </div>

    </div>
  )
}

export default DeleteProfile