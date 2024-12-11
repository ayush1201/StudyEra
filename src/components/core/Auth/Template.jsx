import React from 'react'
import Signupform from './Signupform'
import Loginform from './Loginform'
import frameImg from "../../../assets/Images/frame.png"

const Template = ({title,description1,description2,image,formType}) => {
  return (
    <div className='flex items-center justify-center'>
        <div className='w-11/12 max-w-maxContent mx-auto'>
            <div className='flex flex-row gap-10 justify-between pt-[100px]'>
                {/* left input box */}
                <div className='flex flex-col gap-5 items-start p-[32px] w-[42%]'>
                    <h2 className='text-richblack-5 text-3xl font-semibold'>
                        {title}
                    </h2>
                    <div className='text-lg leading-[26px] font-normal text-richblack-100'>{description1} <span className='text-base font-bold font-edu-sa text-blue-100'>{description2}</span> </div>
                    {formType === "login" ? <Loginform/> : <Signupform/>}

                </div>

                {/* right image */}
                <div className='relative'>
                    <img src={frameImg} alt="" width={558} height={504} loading='lazy'/>
                    <img src={image} alt="" width={558} height={504} className='absolute z-10 -top-4 right-4' loading='lazy'/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Template