import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import RenderSteps from '../AddCourse/RenderSteps';
import { getCourseDetails } from '../../../../services/operations/courseDetailsAPI';

const EditCourse = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        const populateCourseDetails = async() => {
            setLoading(true);
            console.log("THE COURSE ID IS....",courseId);
            const res = await getCourseDetails(courseId,token);
            console.log("THE COURSES IN EDIT COURSE...",res);

            if(res){
                // setedit course true
                dispatch(setEditCourse(true));
                dispatch(setCourse(res?.data?.courseDetails[0]));
            }
            setLoading(false);
        }
        populateCourseDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  return (
    <div className='mt-10'>
        
      <div className="mx-auto max-w-[600px]">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}

export default EditCourse