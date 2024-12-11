import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineEye} from 'react-icons/ai'
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import Button from '../HomePage/Button';
import { login } from '../../../services/operations/authAPI';


const Loginform = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    })

    const { email, password } = formData

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]:e.target.value,
        }))
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(login(email,password,navigate));
    }

    const [hideText,setHideText] = useState(true);

  return (
    <form onSubmit={handleOnSubmit} className='mt-6 flex flex-col w-full gap-y-4'>
        <label className='w-full'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                Email Address <sup className='text-pink-200'>*</sup>
            </p>
            <input type="text" 
                required
                name='email'
                value={email}
                onChange={handleChange}
                placeholder="Enter email address"
                className='bg-richblack-800 p-[12px] rounded-lg w-full text-richblack-5'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />        
        </label>

        <label className='w-full'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                Password <sup className='text-pink-200'>*</sup>
            </p>
            <div className='flex items-center relative'>
                <input type={hideText === false ? "text" : "password"} 
                    required
                    name='password'
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className='bg-richblack-800 p-[12px] rounded-lg w-full text-richblack-5 relative'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                /> 
                <div onClick={() => {setHideText(!hideText)}} className='text-white absolute right-2 cursor-pointer'>
                    {
                        hideText === false ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                    }
                </div>
            </div>
           
        </label>

        <Link to={"/forgot-password"}>
            <p className='text-blue-100 text-xs leading-5 text-right -mt-2 cursor-pointer mb-2'>Forgot password</p>
        </Link>

        <button type='submit' className='bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:scale-95
                                    transition-all duration-200 mt-3 text-[16px] leading-[24px] text-center p-3 w-full' >
                                        Sign in
        </button>
    </form>
  )
}

export default Loginform