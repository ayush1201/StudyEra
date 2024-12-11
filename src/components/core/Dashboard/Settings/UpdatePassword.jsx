import React, { useState } from 'react'
import { settingsEndpoints } from '../../../../services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import { changePassword, updatePassword } from '../../../../services/operations/settingsAPI';

const UpdatePassword = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showOldPass,setShowOldPass] = useState(false);
    const [showNewPass,setShowNewPass] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    async function submitPassForm(data){
        try{
            dispatch(changePassword(token,data));
        }
        catch(err){
            console.log("ERROR MESSAGE - ", err.message)
        }
    }

  return (
    <form onSubmit={handleSubmit(submitPassForm)} className='flex flex-col gap-y-5'>
        <div className='flex flex-col bg-richblack-700 p-[30px] my-5 gap-y-6 border-[1px] border-richblack-800 rounded-lg w-full'>
            <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
            {/* first section */}
            <div className='flex flex-row gap-x-5 mt-2 items-center'>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor="oldPassword" className='text-[14px] text-richblack-5'>Current Password</label>
                    <div className='relative'>
                        <input type={showOldPass ? "text" : "password"} 
                            {...register("oldPassword",{required:true})}
                            id='oldPassword'
                            name='oldPassword'
                            placeholder='Enter current password'
                            className='w-full rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        <div onClick={() => setShowOldPass(!showOldPass)} className='absolute right-3 text-lg top-4'>
                            {
                                showOldPass ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)
                            }
                        </div>
                    </div>
                    
                </div>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor="newPassword" className='text-[14px] text-richblack-5'>New Password</label>
                    <div className='relative'>
                        <input type={showNewPass ? "text" : "password"} 
                            {...register("newPassword",{required:true})}
                            id='newPassword'
                            name='newPassword'
                            placeholder='Enter new password'
                            className='rounded-lg w-full bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        <div onClick={() => setShowNewPass(!showNewPass)} className='absolute right-3 text-lg top-4'>
                            {
                                showNewPass ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <div className='flex gap-x-2 items-center justify-end font-inter'>
            <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold 
            bg-richblack-800 text-white hover:scale-95 transition-all duration-200'
            onClick={() => {navigate("/dashboard/my-profile")}}>
                Cancel
            </button>
            <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold 
            bg-yellow-50 text-black hover:scale-95 transition-all duration-200'
            type='submit'>
                Update
            </button>
        </div>
    </form>
  )
}

export default UpdatePassword