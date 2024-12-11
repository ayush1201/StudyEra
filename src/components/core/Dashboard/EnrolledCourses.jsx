import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

  const [enrolledCourses,setEnrolledCourses] = useState(null);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getEnrolledCourses = async() => {
    try{
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    }
    catch(err){
      console.log("Unable to Fetch Enrolled Courses");
    }
  }

  useEffect(() => {
    getEnrolledCourses();
  },[])

  console.log("ENROLLED-COURSES.....",enrolledCourses);

  return (
    <div className='text-white mt-[100px]'>
      <h2 className='text-3xl text-richblack-50'>Enrolled Courses</h2>
      {
        !enrolledCourses ? (<div className='custom-loader'></div>) 
        : (!enrolledCourses.length ? (<p className="grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled in any course yet</p>) 
        : (
          <div className='my-8 text-richblack-5'>
            <div className="flex rounded-t-lg bg-richblack-500 ">
              <p className="w-[45%] px-5 py-3">Course Name</p>
              <p className="w-1/4 px-2 py-3">Duration</p>
              <p className="flex-1 px-2 py-3">Progress</p>
            </div>

            {/* card shuru hotE hai */}
            {
              enrolledCourses.map((course,i,arr) => (
                <div className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`}
              key={i}>
                  {/* thumbnail */}
                  <div onClick={() => navigate(`/view-course/${course._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)}
                   className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3">
                    <img src={course.thumbnail} alt="course_img" className="h-14 w-14 rounded-lg object-cover"/>
                    {/* course title,desc */}
                    <div className="flex max-w-xs flex-col gap-2">
                      <p className="font-semibold">{course.courseName}</p>
                      <p className="text-xs text-richblack-300">
                        {
                          course.courseDescription > 50 ? `${course.courseDescription.slice(0,50)}` : course.courseDescription 
                        }
                      </p>
                    </div>
                  </div>  

                  {/* course duration */}
                  <div className='w-1/4 px-2 py-3'>
                    <p>{40}</p>
                  </div>
                  

                  {/*progress bar */}
                  <div className='flex w-1/5 flex-col gap-2 px-2 py-3'>
                    <p>Progress: {course?.progressPercentage || 0}%</p>
                    <ProgressBar completed={course?.progressPercentage || 0}
                      height='8px'
                      isLabelVisible={false}
                    />
                  </div>
                </div>

                
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default EnrolledCourses