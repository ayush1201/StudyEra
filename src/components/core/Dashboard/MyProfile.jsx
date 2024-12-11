import React from 'react'
import { VscLinkExternal } from 'react-icons/vsc';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className='text-richblack-5 font-inter mt-[100px]'>

        <div className='flex flex-col gap-y-5'>
            <h1 className='text-3xl mb-5 font-semibold'>
                My Profile
            </h1>

            {/* section 1 */}
            <div className='flex justify-between items-center bg-richblack-700 p-[24px] gap-[20px] border-[1px]
            border-richblack-800 rounded-lg'>
                <div className='flex items-center gap-[24px]'>
                    <div>
                        {/* photo */}
                        <img src={user?.image} 
                            className='aspect-square w-[78px] rounded-full object-cover'
                        />
                    </div>

                    {/* name and email */}
                    <div className='flex flex-col gap-y-[2px]'>
                        <p className='text-lg leading-[26px] text-richblack-5 font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                        <p className='text-sm leading-[22px] text-richblack-300'>{user?.email}</p>
                    </div>
                </div>

                <button onClick={() => {navigate("/dashboard/settings")}} className='bg-yellow-50 text-richblack-900
                py-[8px] px-[12px] rounded-lg transition-all duration-200 hover:scale-95'>
                    <div className='flex gap-x-2 items-center leading-[26px] font-medium'>
                        <p>Edit</p>
                        <VscLinkExternal className='w-[18px]'/>
                    </div>
                </button>
            </div>

            {/* section 2 */}
            <div className='flex justify-between items-start bg-richblack-700
            p-[24px] gap-[20px] border-[1px]
            border-richblack-800 rounded-lg'>
                {/* about */}
                <div className='flex flex-col gap-y-5'>
                    <p className='text-lg leading-[26px] text-richblack-5 font-semibold'>About</p>
                    <p className='text-sm leading-[22px] text-richblack-300'>
                        {
                            user?.additionalDetails?.about ? (`${user?.additionalDetails?.about}`) : ("Write something about yourself")
                        }
                    </p>
                </div>

                {/* button */}
                <button onClick={() => {navigate("/dashboard/settings")}} className=
                'bg-yellow-50 text-richblack-900 py-[8px] px-[12px] rounded-lg transition-all duration-200 hover:scale-95'>
                    <div className='flex gap-x-2 items-center leading-[26px] font-medium'>
                        <p>Edit</p>
                        <VscLinkExternal className='w-[18px]'/>
                    </div>
                </button>
                
            </div>

            {/* section 3 */}
            <div className='bg-richblack-700 p-[24px] gap-[20px] border-[1px]
            border-richblack-800 rounded-lg flex flex-col gap-y-5'>
                <div className='flex justify-between items-center'>
                    <p className='text-lg text-richblack-5 font-semibold '>Personal Details</p>
                    <button onClick={() => {navigate("/dashboard/settings")}} className=
                    'bg-yellow-50 text-richblack-900 py-[8px] px-[12px] rounded-lg transition-all duration-200 hover:scale-95'>
                        <div className='flex gap-x-2 items-center leading-[26px] font-medium'>
                            <p>Edit</p>
                            <VscLinkExternal className='w-[18px]'/>
                        </div>
                    </button>
                </div>
                <div className='flex flex-wrap gap-5 text-sm'>
                    <div className='flex flex-col gap-y-2 w-[350px]'>
                        <p className=' text-richblack-400'>First Name</p>
                        <p className='text-richblack-5 font-medium'>{user?.firstName}</p>
                    </div>
                    <div className='flex flex-col gap-y-2 w-[350px]'>
                        <p className=' text-richblack-400'>Email</p>
                        <p className='text-richblack-5 font-medium'>{user?.email}</p>
                    </div>
                    <div className='flex flex-col gap-y-2 w-[350px]'>
                        <p className=' text-richblack-400'>Gender</p>
                        <p className='text-richblack-5 font-medium'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>
                    <div className='flex flex-col gap-y-2 w-[350px]'>
                        <p className=' text-richblack-400'>Last Name</p>
                        <p className='text-richblack-5 font-medium'>{user?.lastName}</p>
                    </div>
                    <div className='flex flex-col gap-y-2 w-[350px]'>
                        <p className=' text-richblack-400'>Phone Number</p>
                        <p className='text-richblack-5 font-medium'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                    </div>
                    <div className='flex flex-col gap-y-2 w-[350px]'>
                        <p className=' text-richblack-400'>Date of Birth</p>
                        <p className='text-richblack-5 font-medium'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MyProfile