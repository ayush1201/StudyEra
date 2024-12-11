import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourse = () => {

  const {
    register,
    setValue,
    getValues,
    formState:{errors},
    handleSubmit
  } = useForm();

  const goBack = () => {
    dispatch(setStep(2));
  }

  useEffect(() => {
    if(course?.status === "Published"){
      setValue("public",true);
    }
  },[]);

  const goToCourses = () => {
    dispatch(resetCourseState());
    // navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async() => {
    if(course?.status === "Published" && getValues("public") === true || 
    course?.status === "Draft" && getValues("public") === false){
      // no updation is form
      // no need to make api call
      goToCourses();
      return;
    }

    // if form updated
    const formData = new FormData();
    formData.append("courseId",course._id);
    const courseStatus = getValues("public") ? "Published" : "Draft"
    formData.append("status",courseStatus);

    setLoading(true);
    const res = await editCourseDetails(formData,token);

    if(res){
      goToCourses();
    }
    setLoading(false);
  }

  const onSubmit = () => {
    handleCoursePublish();
  }

  const dispatch = useDispatch();
  const {step,course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const [loading,setLoading] = useState(false);

  return (
    <div className='rounded-md bg-richblack-800 border p-6 border-richblack-700 '>
      <p className='font-semibold text-richblack-5 text-2xl mb-5'>
        Publish Course
      </p>

      <form className='flex flex-col gap-y-10' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center'>
          <input type="checkbox" 
              id='public'
              {...register("public")}
              className='rounded h-4 w-4 border border-richblack-400 bg-richblack-800'
            />
          <label htmlFor="public" className='label'>
          
          <span className='ml-3 text-[16px] leading-[24px] font-medium text-richblack-300'>
            Make this Course as Public
          </span>
          </label>
        </div>

        <div className='flex items-center gap-x-3 justify-end'>
          <button type='button' disabled={loading} onClick={() => goBack()}
          className='bg-richblack-600 px-5 py-2 rounded-md'>
            back
          </button>
          <IconBtn text={"save changes"} disabled={loading}/>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse