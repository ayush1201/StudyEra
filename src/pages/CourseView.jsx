import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { getCourseDetails } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/courseViewSlice';
import CourseReviewModal from '../components/common/CourseReviewModal';
import VideoSideBar from '../components/core/CourseView/VideoSideBar';

const CourseView = () => {

    const [reviewModal,setReviewModal] = useState(null);
    const {token} = useSelector((state) => state.auth);
    const {courseId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificData = async() => {
            console.log("COURSE ID>>",courseId);
            const coursData = await getCourseDetails(courseId,token);
            console.log("COURSE DATA IN .....",coursData);
            dispatch(setCourseSectionData(coursData?.data?.courseDetails[0].courseContent));
            dispatch(setCourseEntireData(coursData?.data?.courseDetails[0]));
            dispatch(setCompletedLectures(coursData?.data?.completedVideos));
            let lectures = 0;
            coursData?.data?.courseDetails[0].courseContent?.forEach((sec) => {lectures += sec?.subSection.length || 0})
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificData();
    },[]);

  return (
    <>
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <VideoSideBar setReviewModal={setReviewModal}/>
            <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                <div className='mx-6'>
                    <Outlet/>
                </div>
            </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default CourseView