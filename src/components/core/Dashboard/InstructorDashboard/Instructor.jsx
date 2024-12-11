import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import { getInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {

    const [loading,setLoading] = useState(false);
    const [instructorData,setInstructorData] = useState(null);
    const {user} = useSelector((state) => state.profile);
    const [courses,setCourses] = useState([]);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        const getInstructorStats = async() => {
            setLoading(true);
            const instructorDataApi = await getInstructorData(token);
            const res = await getInstructorCourses(token);

            if(instructorDataApi.length){
                setInstructorData(instructorDataApi);
            }
            if(res){
                setCourses(res);
            }
            setLoading(false);
        }
        getInstructorStats();
    },[]);

    const totalAmount = instructorData?.reduce((acc,curr) => curr.totalAmount + acc,0);
    const totalStudentsEnrolled = instructorData?.reduce((acc,curr) => curr.totalStudentsEnrolled + acc,0);

  return (
    <div className='pt-32 text-white'>
        <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-richblack-5'>Hi {user?.firstName} 👋</h1>
            <p className='font-medium text-richblack-200'>Let's start something new</p>
        </div>

        {
            loading ? (<div className='custom-loader'></div>) 
            : courses?.length>0
            ? (
                <div>
                    <div className='my-4 flex h-[450px] space-x-4'>
                        <InstructorChart courses={instructorData}/>
                        <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">Statistics</p>
                            <div className='mt-4 space-y-4'>
                                <div>
                                    <p className="text-lg text-richblack-200">Total Courses</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{courses?.length}</p>
                                </div>

                                <div>
                                    <p className="text-lg text-richblack-200">Total Students</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{totalStudentsEnrolled}</p>
                                </div>

                                <div>
                                    <p className="text-lg text-richblack-200">Total Income</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{totalAmount}</p>
                                </div>
                            </div>    
                        </div>
                    </div>
                    
                    <div className="rounded-md bg-richblack-800 p-6">
                        {/* render courses */}
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                            <Link to={"/dashboard/my-courses"}>
                                <p className="text-xs font-semibold text-yellow-50">View all</p>
                            </Link>
                        </div>
                        <div className="my-4 flex items-start space-x-6">
                            {
                                courses?.slice(0,3).map((course,ind) => (
                                    <div className='w-1/3'>
                                        <img src={course.thumbnail} className="h-[201px] w-full object-cover rounded-md"/>
                                        <div className="mt-3 w-full">
                                            <p className="text-sm font-medium text-richblack-50">{course.courseName}</p>
                                            <p className="text-xs font-medium text-richblack-300">{course.studentsEndrolled.length} Students | Rs {course.price}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            ) 
            : (<div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
                <p className="text-center text-2xl font-bold text-richblack-5">You have not created any courses</p>
                <Link to={"/dashboard/add-course"}>
                    <p className="mt-1 text-center text-lg font-semibold text-yellow-50">Create a Course</p>
                </Link>
            </div>)
        }
    </div>
  )
}

export default Instructor