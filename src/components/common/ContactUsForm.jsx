import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import {submitContactForm} from "../../services/operations/authAPI"
import { useDispatch } from 'react-redux';
import { apiConnector } from '../../services/apiconnector';
import { contactUsEndpoints, contactusEndpoint } from '../../services/apis';
import countryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful},
    } = useForm();

    async function submitContactForm(data){
        console.log("Loading data",data);
        try{
            setLoading(true);
            const result = await apiConnector("POST",contactUsEndpoints.CONTACTUS_API,data);
            const res = {status:"OK"};
            console.log("Printing response...",result);

            setLoading(false);
        }
        catch(err){
            console.log("Error:",err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:""
            })
        }
    },[reset,isSubmitSuccessful])



  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='w-full p-[32px]'>
        <div className='flex flex-col gap-5 font-inter'>
            <div className='flex gap-5'>
                {/* first name */}
                <div className='flex flex-col gap-1 w-full justify-center'>
                    <label htmlFor='firstName' className='text-[14px] leading-[22px]'>First Name</label>
                    <input type="text" 
                        {...register("firstName",{required:true})}
                        name='firstName'
                        id='firstName'
                        className='bg-richblack-800 rounded-lg p-[12px]'
                        placeholder='Enter first name'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
                    {
                        errors.firstName && (
                            <span>
                                Please enter your first name
                            </span>
                        )
                    }
                </div>

                {/* last name */}
                <div className='flex flex-col gap-1 w-full justify-center'>
                    <label htmlFor='lastName' className='text-[14px] leading-[22px]'>Last Name</label>
                    <input type="text" 
                        {...register("lastName")}
                        name='lastName'
                        id='lastName'
                        className='bg-richblack-800 rounded-lg p-[12px]'
                        placeholder='Enter last name'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
                    {
                        errors.firstName && (
                            <span>
                                Please enter your last name
                            </span>
                        )
                    }
                </div>
            </div>

            {/* email */}
            <div className='flex flex-col gap-1'>
                <label htmlFor='email' className='text-[14px] leading-[22px]'>Email Address</label>
                <input type="email" 
                    {...register("email",{required:true})}
                    name='email'
                    id='email'
                    className='bg-richblack-800 rounded-lg p-[12px]'
                    placeholder='Enter email address'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
                {
                    errors.email && (
                        <span>
                            Please enter email
                        </span>
                    )
                }
            </div>

            {/* phone no. */}
            <div className='flex flex-col gap-1'>
                <label htmlFor="phoneNo" className='text-[14px] leading-[22px]'>Phone Number</label>
                <div className='flex gap-5 items-center'>
                    {/* dropdown */}

                        <select 
                        name="dropdown" 
                        id="dropdown"
                        className='w-[80px] bg-richblack-800 rounded-lg p-[12px]'
                        {...register("countryCode",{required:true})}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}


                        >
                            {
                                countryCode.map((ele,i) => {
                                    return(
                                        <option value={ele.code} key={i}>
                                            {ele.code} -{ele.country}
                                        </option>
                                    )
                                })
                            }
                        </select>

                    {/* phone number */}
                        <input type="number"
                        name='phoneNo'
                        id='phoneNo'
                        placeholder='12345 67890'
                        {...register("phoneNo",{required:true,maxLength:{value:10,message:"Invalid Phone Number"},minLength:{value:8,message:"Invalid phone number"}})}
                        className='w-full bg-richblack-800 rounded-lg p-[12px]'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                         />
                </div>
                {
                    errors.phoneNo &&  (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }
            </div>

            {/* message */}
            <div className='flex flex-col gap-1'>
                <label htmlFor='message' className='text-[14px] leading-[22px]'>Message</label>
                <textarea type="text" 
                    {...register("message",{required:true})}
                    name='message'
                    cols={30}
                    rows={7}
                    id='message'
                    className='bg-richblack-800 rounded-lg p-[12px]'
                    placeholder='Enter your message here'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
                {
                    errors.firstName && (
                        <span>
                            Please enter your message.
                        </span>
                    )
                }
            </div>

            <button type='submit' className='bg-yellow-50 text-richblack-900 font-semibold leading-[24px] text-center p-[12px] 
            rounded-lg hover:scale-95 transition-all duration-200 mt-[20px]'>
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm