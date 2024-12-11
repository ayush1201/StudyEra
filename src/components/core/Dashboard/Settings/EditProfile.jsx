import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingsAPI';
const gender = ["Male","Female","Non-Binary","Prefer not to say","Other"];

const EditProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function submitProfileForm(data){
        try{
            console.log("DATA IS>>>>>>>>>>",data);
            dispatch(updateProfile(token,data));
        }
        catch(err){
            console.log("ERROR MESSAGE - ", err.message)
        }
    }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)} className='flex flex-col gap-y-5'>
        <div className='flex flex-col bg-richblack-700 p-[30px] my-5 gap-y-6 border-[1px] border-richblack-800 rounded-lg w-full'>
            <h2 className="text-lg font-semibold text-richblack-5">
                Profile Information
            </h2>
            {/* first row */}
            <div className='flex flex-row gap-x-5 mt-2 items-center'>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor="firstName" className='text-[14px] text-richblack-5'>First Name</label>
                    <input type="text" 
                        {...register("firstName",{required:true})}
                        id='firstName'
                        name='firstName'
                        placeholder='Enter first name'
                        className='rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        defaultValue={user?.firstName}
                    />
                </div>

                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor="lastName" className='text-[14px] text-richblack-5'>Last Name</label>
                    <input type="text" 
                        {...register("lastName",{required:true})}
                        id='lastName'
                        name='lastName'
                        placeholder='Enter first name'
                        className='rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        defaultValue={user?.lastName}
                    />
                </div>
            </div>

            {/* second row */}
            <div className='flex flex-row gap-x-5 items-center'>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor="dateOfBirth" className='text-[14px] text-richblack-5'>Date of Birth</label>
                    <input type="date" 
                        {...register("dateOfBirth",{required:true})}
                        id='dateOfBirth'
                        name='dateOfBirth'
                        {...register("dateOfBirth",{
                            required:true,
                            message:"Please enter your Date of Birth",
                            max: {
                                value: new Date().toISOString().split("T")[0],
                                message: "Date of Birth cannot be in the future.",
                            },
                        })}
                        className='rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                    />
                </div>

                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor="gender" className='text-[14px] text-richblack-5'>Gender</label>
                    <select type="" 
                        {...register("gender",{required:true})}
                        id='gender'
                        name='gender'
                        // placeholder='Enter first name'
                        className='rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        defaultValue={user?.additionalDetails?.gender}
                    >
                        {
                            gender.map((ele,i) => {
                                return(
                                    <option key={i} value={ele}>{ele}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>

            {/* third row */}
            <div className='flex flex-row gap-x-5 mt-2 items-center'>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor="contactNumber" className='text-[14px] text-richblack-5'>Contact Number</label>
                    <input type="number" 
                        {...register("contactNumber",{required:true})}
                        id='contactNumber'
                        name='contactNumber'
                        placeholder='Enter contact number'
                        className='rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        defaultValue={user?.additionalDetails?.contactNumber}
                    />
                </div>

                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor="about" className='text-[14px] text-richblack-5'>About</label>
                    <input type="text" 
                        {...register("about",{required:true})}
                        id='about'
                        name='about'
                        placeholder='Enter Bio Details'
                        className='rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        defaultValue={user?.additionalDetails?.about}
                    />
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
                Save
            </button>
        </div>
        
    </form>
  )
}

export default EditProfile