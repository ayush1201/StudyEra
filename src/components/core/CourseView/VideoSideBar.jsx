import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import {IoIosArrowBack} from "react-icons/io"
import {BsChevronDown} from "react-icons/bs"

const VideoSideBar = ({setReviewModal}) => {

    const [activeStatus,setActiveStatus] = useState("");
    const navigate = useNavigate();
    const [videoBarActive,setVideoBarActive] = useState("");
    const {sectionId,subSectionId} = useParams();
    const location = useLocation();
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
      ;(() => {

        if(!courseSectionData.length){
          return;
        }

        const currSecIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const currSubSecIndex = courseSectionData[currSecIndex].subSection.findIndex((data) => data._id === subSectionId);

        // set active section and subsec here
        setActiveStatus(courseSectionData[currSecIndex]?._id);
        setVideoBarActive(courseSectionData[currSecIndex]?.subSection?.[currSubSecIndex]?._id);
      })()
    },[courseSectionData,courseEntireData,location.pathname])

    const handleReview = () => {
      setReviewModal(true);
    }

    console.log("ACTIVE STATUS......",courseSectionData);

  return (
    <>
      <div className='text-white flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800'>
        {/* buttons and headings */}

        <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25'>
          {/* buttons */}
          <div className='flex w-full items-center justify-between '>

            <div className='cursor-pointer flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90' 
             onClick={() => navigate("/dashboard/enrolled-courses")}>
              <IoIosArrowBack size={30} />
            </div>

            <div >
              <IconBtn
                text="Add Review"
                customClasses="ml-auto"
                onclick={() => handleReview()}
              />
            </div>
          </div>

          {/* heading */}
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">{completedLectures?.length} / {totalNoOfLectures}</p>
          </div>
        </div>


        {/* sections and subsections dropdown */}
        <div className='h-[calc(100vh - 5rem)] overflow-y-auto'>
          {
            courseSectionData?.map((sec,ind) => (
              <div key={ind} className="mt-2 cursor-pointer text-sm text-richblack-5" onClick={() => setActiveStatus(sec._id)}>

                {/* section */}
                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">

                  <div className='w-[70%] font-semibold'>{sec?.sectionName}</div>

                  {/* add arrow with 180 degree rotate functionality */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`${
                        activeStatus === sec?._id
                          ? "rotate-0"
                          : "rotate-180"
                      } transition-all duration-500`}
                    >
                      <BsChevronDown />
                    </span>
                  </div>
                </div>

                {/* subsection */}
                <div>
                  {
                    activeStatus === sec._id && (
                      <div className="transition-[height] duration-500 ease-in-out">
                        {
                          sec.subSection.map((subSec,ind) => (
                            <div className={`flex gap-5 p-5 ${
                              videoBarActive === subSec._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-900 text-richblack-5"
                            }`}
                            key={ind}
                            onClick={() => {
                              // navigate to that video
                              // chaange active bar video to current video

                              navigate(`/view-course/${courseEntireData._id}/section/${sec?._id}/sub-section/${subSec?._id}`);
                              setVideoBarActive(subSec?._id);
                            }}
                            >

                              {/* checkbox */}
                              <input type="checkbox" 
                                checked={completedLectures.includes(subSec?._id)}
                                onclick={() => {}}
                              />

                              <p>{subSec.title}</p>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default VideoSideBar