import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import Button from './Button'
import { AiOutlineArrowRight } from 'react-icons/ai'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex gap-20 items-center'>

            {/* left box */}
            <div className='w-[50%]'>
                <img src={Instructor} alt="" />
            </div>

            {/* right box */}
            <div className='w-[50%] flex flex-col items-start gap-8'>
                <div className='text-4xl font-semibold '>
                    Become an <HighlightText text={"instructor"}/>
                </div>

                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on studyera. We provide the tools and skills to teach what you love.</p>

                <Button active={true} linkto={"/signup"}>
                    <div className='flex items-center gap-2'>
                        Start Teaching Today
                        <AiOutlineArrowRight/>
                    </div>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection