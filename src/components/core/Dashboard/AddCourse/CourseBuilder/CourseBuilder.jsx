import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {BsBoxArrowRight} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import NestedView from './NestedView';
import toast from 'react-hot-toast';
import { setLoading } from '../../../../../slices/authSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilder = () => {

    const dispatch = useDispatch();
    const {step,course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    const cancelEdit = () => {
        setEditSection(null);
        setValue("sectionName","");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goNext = () => {
        if(course?.updatedCourse?.courseContent?.length === 0){
            toast.error("Add atleast one section");
            return;
        }
        // if(course?.updatedCourse?.courseContent.some((section) => section.subSection.length === 0)){
        //     toast.error("Add atleast one sub section");
        //     return;
        // }
        dispatch(setStep(3));
    }

    const onSubmitForm = async(data) => {
        setLoading(true);
        let result;
        if(editSection){
            result = await updateSection({
                sectionName:data.sectionName,
                sectionId:editSection,
                courseId:course._id
            },token);
        }
        else{
            result = await createSection({
                courseId:course._id,
                sectionName:data.sectionName
            },token);
        }

        if(result){
            dispatch(setCourse(result));
            setEditSection(null);
            setValue("sectionName","");
        }

        setLoading(false);
    }

    const handleChangeEditName = (sectionId,sectionName) => {
        console.log("EDIT SECTION ....",editSection);

        if(editSection === sectionId){
            cancelEdit();
            return;
        }
        setEditSection(sectionId);
        setValue("sectionName",sectionName);
    }

    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue,
        getValues,
    } = useForm();

    const [editSection,setEditSection] = useState(null);

  return (
    <div className='text-white rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8'>
        <p>Course Builder</p>
        <form className='flex flex-col gap-y-5' onSubmit={handleSubmit(onSubmitForm)}>
            <div className='flex flex-col gap-y-[6px]'>
                <label  htmlFor='sectionName' className='label'>Section Name<sup className='sup'>*</sup></label>
                <input
                    id='sectionName'
                    placeholder='Enter Section Name'
                    {...register("sectionName", {required:true})}
                    className='w-full text-richblack-400 bg-richblack-700 rounded-lg p-3'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
                {
                    errors.sectionName && (
                        <span>Course Section is Required**</span>
                    )
                }
            </div>
            <div className='flex items-end gap-x-4'>
                <button type='submit' className='text-left flex gap-x-2 items-center px-[24px] py-[12px] rounded-lg border border-yellow-50 text-yellow-50 
                font-medium text-[16px] leading-[24px]'>
                    <p>{!editSection ? "Create Section" : "Edit Section Name"}</p>
                    <AiOutlinePlusCircle className='text-[20px]'/>
                    
                </button>
                {
                    editSection && (
                        <button onClick={cancelEdit} className='underline text-richblack-300'>
                            Cancel edit
                        </button>
                    )
                }
            </div> 
        </form>

        {/* nested view */}
        {
            course?.courseContent?.length > 0 && (
                <NestedView handleChangeEditName={handleChangeEditName} editSection={editSection} setEditSection={setEditSection}/>
            )
        }
        
        <div className='flex items-center gap-x-2 text-richblack-900 font-inter font-bold justify-end'>
            <button onClick={goBack} className='rounded-md px-[16px] py-[8px] bg-richblack-400 hover:scale-95 transition-all duration-200'>
                <p className='text-[16px]'>Back</p>
            </button>
            <button onClick={goNext} className='flex items-center gap-x-2 rounded-md px-[24px] py-[8px] bg-yellow-50 hover:scale-95 transition-all duration-200'>
                <p>Next</p>
                <BsBoxArrowRight className='text-lg'/>
            </button>
        </div>

    </div>
  )
}

export default CourseBuilder