import React, { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import {CiCircleCheck} from "react-icons/ci";
import {AiFillCheckCircle} from "react-icons/ai"
import { updatePassword } from '../services/operations/authAPI';

const data = [
    "one lowercase character",
    "one special character",
    "one uppercase character",
    "8 character minimum",
    "one number"
]

const UpdatePassword = () => {

    const {loading} = useSelector((state) => state.auth);
    const [resetDone,setResetDone] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    // const [emailSent,setEmailSent] = useState(false);

    const {password,confirmPassword} = formData;

    function handleChange(e){
        setFormData((prev) => (
            {
                ...prev,
                [e.target.name] : e.target.value
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(updatePassword(password,confirmPassword,token,setResetDone));
    }

  return (
    <div className='text-white w-[508px] flex items-center justify-center mx-auto p-[32px] mt-[80px] gap-6'>
        {
            loading ? (
                <div className='custom-loader'></div>
            ) : (
                <div className='flex flex-col w-[444px] font-inter gap-y-4'>
                    <p className='text-richblack-5 font-semibold text-3xl leading-[38px] '>
                        {
                            !resetDone ? "Choose new password" : "Reset complete!"
                        }
                    </p>
                    
                    <p className='text-richblack-100 text-lg leading-[26px] '>
                        {
                            !resetDone ? "Almost done. Enter your new password and you are all set." : `All done! We have sent an email`
                        }
                    </p>

                    {
                        !resetDone ? (
                            <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-5 mt-3'>
                                <label>
                                    <p className='text-richblack-5 text-sm font-inter'>New password<sup className='text-pink-200'>*</sup></p>
                                    <input type="password" 
                                        required
                                        name='password'
                                        value={password}
                                        style={
                                            {
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }
                                        }
                                        onChange={handleChange}
                                        placeholder='Enter new password'
                                        className='bg-richblack-800 rounded-lg p-3 w-full mt-2 text-richblack-100'
                                    />
                                </label>

                                <label>
                                    <p className='text-richblack-5 text-sm font-inter'>Confirm new password<sup className='text-pink-200'>*</sup></p>
                                    <input type="password" 
                                        required
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        style={
                                            {
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }
                                        }
                                        onChange={handleChange}
                                        placeholder='Enter confirm password'
                                        className='bg-richblack-800 rounded-lg p-3 w-full mt-2 text-richblack-100'
                                    />
                                </label>

                                <div className='flex flex-wrap gap-3'>
                                    {
                                        data.map((ele,i) => {
                                            return(
                                                <div className='text-[#05A77B] text-xs leading-[20px] flex items-center gap-[6px] w-[164px]'>
                                                    <i className='text-[16px]'><AiFillCheckCircle/></i>
                                                    {ele}
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <button type='submit' className='bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:scale-95
                                transition-all duration-200 mt-3 text-[16px] leading-[24px] text-center p-3' >
                                    Reset Password
                                </button>

                                <Link to={"/login"} className='text-richblack-25 flex items-center p-2 gap-x-2'>
                                    <BsArrowLeft/>
                                    <p>Back to login</p>
                                </Link>
                            </form>
                        ) : (
                            <div className='flex flex-col gap-y-4'>
                                <Link to={"/login"}>
                                    <button type='submit' className='bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:scale-95
                                    transition-all duration-200 mt-3 text-[16px] leading-[24px] text-center p-3 w-full' >
                                        Return to login
                                    </button>
                                </Link>

                                <Link to={"/login"} className='text-richblack-25 flex items-center p-2 gap-x-2'>
                                    <BsArrowLeft/>
                                    <p>Back to login</p>
                                </Link>
                            </div>
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword