import React from 'react'
import { IoMdChatbubbles } from "react-icons/io";
import ContactUsForm from '../components/common/ContactUsForm';
import { FaEarthAfrica } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';

const ContactUs = () => {
  return (
    <div className='mt-32'>
        <div className='text-white w-11/12 max-w-maxContent mx-auto font-inter'>
            {/* section 1 */}
            <div className='flex gap-x-6 items-start'>
                {/* first box */}
                <div className='bg-richblack-800 rounded-xl p-[24px] flex flex-col gap-[24px] w-[450px]'>
                    <div className='flex items-start gap-2 p-[12px]'>
                        <div className='text-[24px] text-richblack-100'>
                            <IoMdChatbubbles width={24} height={24}/>
                        </div>
                        <div className='flex flex-col gap-y-[2px]'>
                            <p className='text-lg font-semibold text-richblack-5 leading-[26px]'>Chat on us</p>
                            <p className='text-sm leading-[22px] text-richblack-200 font-medium'>Our friendly team is here to help.</p>
                            <p className='text-sm leading-[22px] text-richblack-200 font-medium'>@mail address</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-2 p-[12px]'>
                        <div className='text-[24px] text-richblack-100'>
                            <FaEarthAfrica width={24} height={24}/>
                        </div>
                        <div className='flex flex-col gap-y-[2px]'>
                            <p className='text-lg font-semibold text-richblack-5 leading-[26px]'>Visit us</p>
                            <p className='text-sm leading-[22px] text-richblack-200 font-medium'>Come and say hello at our office HQ.</p>
                            <p className='text-sm leading-[22px] text-richblack-200 font-medium'>Here is the location/ address</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-2 p-[12px]'>
                        <div className='text-[24px] text-richblack-100'>
                            <IoCall width={24} height={24}/>
                        </div>
                        <div className='flex flex-col gap-y-[2px]'>
                            <p className='text-lg font-semibold text-richblack-5 leading-[26px]'>Visit us</p>
                            <p className='text-sm leading-[22px] text-richblack-200 font-medium'>Come and say hello at our office HQ.</p>
                            <p className='text-sm leading-[22px] text-richblack-200 font-medium'>Here is the location/ address</p>
                        </div>
                    </div>
                </div>
                
                <div className='flex-1 border-[1px] border-richblack-600 p-[52px] rounded-xl'>
                    <div>
                        <div className='flex flex-col gap-[12px]'>
                            <p className='text-[36px] leading-[44px] font-semibold text-richblack-5 '>Got a Idea? We’ve got the skills. Let’s team up</p>
                            <p className='text-[16px] leading-[24px] font-medium text-richblack-200'>Tall us more about yourself and what you’re got in mind.</p>
                        </div>
                        <div className=''>
                            <ContactUsForm/>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div className='mt-20'>
                <h1 className="text-center text-4xl font-semibold mt-8">
                Reviews from other learners
                </h1>
                <ReviewSlider />
            </div>
        </div>
        <div className='border-t-[1px] border-richblack-600'>
            <Footer/>
        </div>
    </div>
  )
}

export default ContactUs