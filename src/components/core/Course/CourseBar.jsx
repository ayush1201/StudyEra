import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react'
import {AiOutlineDown} from "react-icons/ai"
import CourseBarSubSecion from './CourseBarSubSecion';

const CourseBar = ({secName,isActive,handleActive}) => {

    const contentEl = useRef(null);
    const [active,setActive] = useState(false);
    useEffect(() => {
        setActive(isActive?.includes(secName._id));
    },[isActive])

    const [sectionHeight, setSectionHeight] = useState(0);
    // check if the current section is opened by checking active variable,  then set it's height.
    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0);
    },[active])

  return (
    <div className='border border-solid border-richblack-600 bg-richblack-700 overflow-hidden text-richblack-5 last:mb-0'>
        <div>

            <div className='flex items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s] cursor-pointer'
            onClick={() => handleActive(secName._id)}>
                <div className='flex items-center gap-2'>
                    {/* icon div */}
                    <i
                    className={
                        isActive.includes(secName._id) ? "rotate-180" : "rotate-0"
                    }
                    >
                        <AiOutlineDown />
                    </i>
                    <p>{secName?.sectionName}</p>
                </div>
                <div className="space-x-4">
                    {/* section length */}
                    <span className="text-yellow-25">{`${secName?.subSection.length || 0} lectures(s)`}</span>
                </div>
            </div>
        </div>

        <div ref={contentEl}
         className='relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]'
         style={{
            height:sectionHeight
         }}>
            <div className='flex flex-col gap-2 px-7 py-6 font-semibold'>
                {
                    secName?.subSection.map((subSec,ind) => {
                        return <CourseBarSubSecion key={ind} subSec={subSec}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default CourseBar