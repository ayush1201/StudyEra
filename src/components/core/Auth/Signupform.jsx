import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../HomePage/Button';
import {AiOutlineEye} from 'react-icons/ai'
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { sendOtp, signup } from '../../../services/operations/authAPI';
import { setSignUpData } from '../../../slices/authSlice';

const Signupform = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password: "",
        confirmPassword: "",
    })

    
    const Type = ["Student","Instructor"];
    const [accountType,setAccountType] = useState("Student");

    const {firstName,lastName,email,password,confirmPassword} = formData;

    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const handleCheck = (e) => {
        setFormData((prev)=> ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    function handleOnSubmit(e){
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        
        const signUpData = {
            ...formData,
            accountType
        }

        // saving all the data to store.
        dispatch(setSignUpData(signUpData));

        // otp is sent by calling backend from frontend using authApi
        dispatch(sendOtp(formData.email,navigate));

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })

     }

  return (
    <div>
        <div className='w-[230px] bg-richblack-800 p-[4px] rounded-full flex gap-x-[5px] text-richblack-200'>
            {
                Type.map((type,i) => {
                    return(
                        <p key={i} onClick={() => setAccountType(type)} className={`px-[18px] py-[6px] cursor-pointer rounded-full ${accountType === type ? "bg-richblack-900" : "bg-transparent"}`}>{type}</p>
                    )
                })
            }
        </div>
        <form onSubmit={handleOnSubmit} className='mt-6 flex flex-col w-full gap-y-4'>
        <div className='flex gap-x-4'>
            <label >
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>First Name <sup className='text-pink-200'>*</sup> </p>
                <input type="text" 
                    required
                    onChange={handleCheck}
                    placeholder='Enter first name'
                    name='firstName'
                    value={firstName}
                    className='bg-richblack-800 p-[12px] rounded-lg text-richblack-5 w-full'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
            </label>
            <label >
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Last Name <sup className='text-pink-200'>*</sup> </p>
                <input type="text" 
                    required
                    onChange={handleCheck}
                    placeholder='Enter last name'
                    name='lastName'
                    value={lastName}
                    className='bg-richblack-800 p-[12px] rounded-lg text-richblack-5 w-full'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
            </label>
        </div>
        <label className='w-full'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address <sup className='text-pink-200'>*</sup> </p>
                    <input type="text" 
                        required
                        onChange={handleCheck}
                        placeholder='Enter email address'
                        name='email'
                        value={email}
                        className='bg-richblack-800 p-[12px] rounded-lg text-richblack-5 w-full'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
        </label>
        <div className='flex gap-x-4 mb-5'>
            <label >
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Create Password <sup className='text-pink-200'>*</sup> </p>
                <div className='flex items-center relative'>
                    <input type={showPassword === true ? "text" : "password"} 
                        required
                        onChange={handleCheck}
                        placeholder='Enter password'
                        name='password'
                        value={password}
                        className='bg-richblack-800 p-[12px] rounded-lg text-richblack-5 w-full'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
                    <div onClick={() => {setShowPassword(!showPassword)}} className='text-white absolute right-2 cursor-pointer'>
                        {showPassword === true ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    </div>
                </div>       
                
            </label>
            
            <label >
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm Password <sup className='text-pink-200'>*</sup> </p>
                <div className='flex items-center relative'>
                    <input type={showConfirmPassword === true ? "text" : "password"} 
                        required
                        onChange={handleCheck}
                        placeholder='Enter password'
                        name='confirmPassword'
                        value={confirmPassword}
                        className='bg-richblack-800 p-[12px] rounded-lg text-richblack-5 w-full'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
                    <div onClick={() => {setShowConfirmPassword(!showConfirmPassword)}} className='text-white absolute right-2 cursor-pointer'>
                        {showConfirmPassword === true ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    </div>
                </div>
                
            </label>
        </div>
        <button type='submit' className='bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:scale-95
                                    transition-all duration-200 mt-3 text-[16px] leading-[24px] text-center p-3 w-full' >
                                        Create Account
        </button>
    </form>
    </div>
  )
}

export default Signupform