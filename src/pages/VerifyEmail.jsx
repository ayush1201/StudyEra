import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../services/operations/authAPI';
import { BsArrowLeft } from 'react-icons/bs';
import {RxCountdownTimer} from "react-icons/rx";

const VerifyEmail = () => {

    const {loading,signUpData} = useSelector((state) => state.auth);
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if(!signUpData){
            navigate("/signup");
        }
    },[])

    function handleOnSubmit(e){
        e.preventDefault();

        const {
            firstName,lastName,email,password,confirmPassword,accountType
        } = signUpData;
        // console.log("DETAILS ARE...",firstName,lastName,email);

        dispatch(signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate));
    }

  return (
    <div className='text-white flex items-center justify-center mx-auto w-[508px] mt-[130px] p-[32px] font-inter'>
        {
            loading ? (
                <div className='custom-loader'></div>
            ) : (
                <div className='flex flex-col gap-4'>
                    <p className='font-semibold text-3xl leading-[38px] text-richblack-5'>Verify email</p>
                    <p className='text-lg text-richblack-100'>A verification code has been sent to you. Enter the code below</p>

                    <form onSubmit={handleOnSubmit}>
                        <OTPInput
                        value={otp}
                        numInputs={6}
                        onChange={setOtp}
                        renderInput={(props) => <input {...props} 
                            placeholder='-'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50'
                        />}
                        
                        containerStyle={{
                            gap:"0 6px",
                            justifyContent:"space-between"
                        }}
                        />

                        <button type='submit' className='w-full bg-yellow-50 text-richblack-900 rounded-lg p-[12px] 
                        font-medium text-center mt-6 hover:scale-95 transition-all duration-200'>
                            Verify email
                        </button>

                    </form>

                    <div className='flex justify-between text-[16px] leading-[24px] font-medium'>
                        <Link to={"/login"} className='text-richblack-25 flex items-center p-2 gap-x-2'>
                            <BsArrowLeft/>
                            <p>Back to login</p>
                        </Link>
                        <button onSubmit={() => dispatch(sendOtp(signUpData.email,navigate))} className='text-blue-100 flex items-center p-2 gap-x-2'>
                            <RxCountdownTimer/>
                            <p>Resend otp</p>
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail