import React from 'react'
import { useState } from 'react';
import { BiSolidTimeFive } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import ConfirmationModal from '../../../common/ConfirmationModal';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useEffect } from 'react';
import { deleteCourse, getInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

const CourseTable = ({courses,setCourses}) => {

    const dispatch = useDispatch();
    const [confirmationModal,setConfirmationModal] = useState(null);
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();


    const handleCourseDelete = async(courseId) => {
        setLoading(true);
        console.log("INSIDE DEL COURSE......",courses);
        await deleteCourse({courseId:courseId},token);
        const res = await getInstructorCourses(token);
        console.log("THE GET COURSES API .....",res);

        if(res){
            setCourses(res);
        }
        console.log("THE COURSES AFTER DELETION ARE....",courses);
        setConfirmationModal(null);
        setLoading(false);

    }

  return (
    <div className='text-white'>
        <Table className="rounded-xl border border-richblack-800 ">
            <Thead >
                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                        Courses
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Duration
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Price
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    courses?.length === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                No Courses available
                            </Td>
                        </Tr>
                    ) : (
                        courses?.map((course) => (
                            <Tr key={course._id} className="flex gap-x-12 border-b border-richblack-800 px-10 py-8">
                                <Td className="flex flex-1 gap-x-4">
                                    <img src={course?.thumbnail} alt="" className='h-[148px] w-[220px] rounded-lg object-cover'/>
                                    <div className='flex flex-col justify-between'>
                                        <p className="text-lg font-semibold text-richblack-5">{course?.courseName}</p>
                                        <p className="text-xs text-richblack-300">{course?.courseDescription}</p>
                                        <p className="text-[12px] text-white">Created:</p>
                                        {
                                            course.status === "Draft" ? (
                                                <div className='flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100'>
                                                    <BiSolidTimeFive size={14}/>
                                                    <p>Draft</p>
                                                </div>
                                            ) : (
                                                <div className='flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100'>
                                                    <FaCheckCircle size={8}/>
                                                    <p>
                                                        Published
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </Td>

                                <Td className="text-sm font-medium text-richblack-100">
                                    2hr 30min
                                </Td>

                                <Td className="text-sm font-medium text-richblack-100">
                                    ₹{course?.price}
                                </Td>

                                <Td className="text-sm font-medium text-richblack-100">
                                    <button disabled={loading}
                                    onClick={() => {
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                    }}
                                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                                        <FiEdit2/>
                                    </button>
                                    <button disabled={loading} 
                                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                    onClick={() => setConfirmationModal({
                                        text1: "Do you want to delete this course?",
                                        text2:
                                        "All the data related to this course will be deleted",
                                        btn1Text: !loading ? "Delete" : "Loading...  ",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleCourseDelete(course._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                    })}>
                                        <RiDeleteBin6Line/>
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
        {
            confirmationModal && (<ConfirmationModal modalData={confirmationModal}/>)
        }
    </div>
  )
}

export default CourseTable