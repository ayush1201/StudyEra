import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import CourseTable from "../Dashboard/InstructorCourses/CourseTable"
import IconBtn from '../../common/IconBtn';
import {VscAdd} from "react-icons/vsc"

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses,setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async() => {
            const res = await getInstructorCourses(token);
            if(res){
                setCourses(res);
            }
        }
        fetchCourses();

        // console.log("THE COURSES ARE ....",courses);
    },[])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses